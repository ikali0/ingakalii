/**
 * Contact Form Component with EmailJS Integration
 * 
 * Features:
 * - Form validation using Zod
 * - EmailJS browser SDK for email sending
 * - Loading states and error handling
 * - Toast notifications for feedback
 * 
 * Environment Variables Required:
 * - VITE_EMAILJS_PUBLIC_KEY: Your EmailJS public key (safe for client-side)
 * - VITE_EMAILJS_SERVICE_ID: Your EmailJS service ID (safe for client-side)
 */
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Send, Loader2, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// EmailJS template ID (falls back to env var if available)
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "portfolio_form11";

// Rate limiting configuration
const RATE_LIMIT_KEY = "contact_form_submissions";
const MAX_SUBMISSIONS = 3; // Max submissions allowed
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

/**
 * Checks if the user has exceeded the rate limit
 * @returns Object with isLimited flag and remainingTime in seconds
 */
const checkRateLimit = (): { isLimited: boolean; remainingTime: number } => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (!stored) return { isLimited: false, remainingTime: 0 };

    const submissions: number[] = JSON.parse(stored);
    const now = Date.now();
    
    // Filter out expired submissions
    const validSubmissions = submissions.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );

    if (validSubmissions.length >= MAX_SUBMISSIONS) {
      const oldestSubmission = Math.min(...validSubmissions);
      const resetTime = oldestSubmission + RATE_LIMIT_WINDOW_MS;
      const remainingMs = resetTime - now;
      return { 
        isLimited: true, 
        remainingTime: Math.ceil(remainingMs / 1000) 
      };
    }

    return { isLimited: false, remainingTime: 0 };
  } catch {
    return { isLimited: false, remainingTime: 0 };
  }
};

/**
 * Records a new submission timestamp
 */
const recordSubmission = (): void => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const submissions: number[] = stored ? JSON.parse(stored) : [];
    const now = Date.now();
    
    // Filter expired and add new
    const validSubmissions = submissions.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );
    validSubmissions.push(now);
    
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(validSubmissions));
  } catch {
    // Silently fail if localStorage is unavailable
  }
};

/**
 * Validation schema for contact form
 * Ensures all fields are properly validated before submission
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

type FormStatus = "idle" | "sending" | "success" | "error" | "rate_limited";

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className }: ContactFormProps) => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [rateLimitTime, setRateLimitTime] = useState<number>(0);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  /**
   * Formats remaining time for display
   */
  const formatRemainingTime = useCallback((seconds: number): string => {
    if (seconds < 60) return `${seconds} seconds`;
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }, []);

  /**
   * Handles form submission and sends email via EmailJS browser SDK
   */
  const onSubmit = async (data: ContactFormData) => {
    // Check rate limit before proceeding
    const { isLimited, remainingTime } = checkRateLimit();
    if (isLimited) {
      setStatus("rate_limited");
      setRateLimitTime(remainingTime);
      toast({
        title: "Too Many Requests",
        description: `Please wait ${formatRemainingTime(remainingTime)} before sending another message.`,
        variant: "destructive",
      });
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;

      if (!publicKey || !serviceId) {
        throw new Error("Email service is not configured properly.");
      }

      // Send email using EmailJS browser SDK
      await emailjs.send(
        serviceId,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          reply_to: data.email,
          subject: data.subject,
          message: data.message,
        },
        { publicKey }
      );

      // Record successful submission for rate limiting
      recordSubmission();

      setStatus("success");
      reset();
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      // Reset success state after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later."
      );
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isSending = status === "sending";
  const isRateLimited = status === "rate_limited";

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            className="retro-input"
            disabled={isSending}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            className="retro-input"
            disabled={isSending}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium text-foreground">
            Subject
          </Label>
          <Input
            id="subject"
            type="text"
            placeholder="What's this about?"
            className="retro-input"
            disabled={isSending}
            {...register("subject")}
          />
          {errors.subject && (
            <p className="text-xs text-destructive">{errors.subject.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-foreground">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Tell me about your project or inquiry..."
            className="retro-input min-h-[120px] resize-none"
            disabled={isSending}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="flex items-center gap-2 p-3 rounded-md bg-secondary/20 text-secondary-foreground border border-secondary">
            <CheckCircle className="w-5 h-5 text-secondary" />
            <span className="text-sm">Message sent successfully!</span>
          </div>
        )}

        {status === "error" && errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive border border-destructive/30">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{errorMessage}</span>
          </div>
        )}

        {status === "rate_limited" && (
          <div className="flex items-center gap-2 p-3 rounded-md bg-accent/20 text-accent-foreground border border-accent/50">
            <Clock className="w-5 h-5" />
            <span className="text-sm">
              Too many requests. Please wait {formatRemainingTime(rateLimitTime)} before trying again.
            </span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSending || isRateLimited || !isValid}
          className="retro-button w-full"
        >
          {isSending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
