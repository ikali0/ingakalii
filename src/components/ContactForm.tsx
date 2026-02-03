import { useState, useCallback, useEffect } from "react";
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

/**
 * Validation schema for contact form
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

/**
 * EMAILJS CONFIGURATION
 * Uses environment variables with fallbacks to hardcoded values.
 * Set these in your environment: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
 */
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Helper to verify EmailJS configuration.
 */
export function verifyEmailJSEnv() {
  const missing: string[] = [];
  if (!EMAILJS_PUBLIC_KEY) missing.push("EMAILJS_PUBLIC_KEY");
  if (!EMAILJS_SERVICE_ID) missing.push("EMAILJS_SERVICE_ID");
  if (!EMAILJS_TEMPLATE_ID) missing.push("EMAILJS_TEMPLATE_ID");

  const ok = missing.length === 0;

  // eslint-disable-next-line no-console
  console.debug("[ContactForm] Config check", {
    ok,
    missing,
    SERVICE_ID: EMAILJS_SERVICE_ID,
    TEMPLATE_ID: EMAILJS_TEMPLATE_ID,
    // Don't log the full public key for security best practices, even if client-side
    PUBLIC_KEY_SET: !!EMAILJS_PUBLIC_KEY,
  });

  return { ok, missing };
}

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_KEY = "contact_form_submissions";
const MAX_SUBMISSIONS = 3; 
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const formatRemainingTime = (ms: number) => {
  const s = Math.ceil(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.ceil(s / 60);
  return `${m}m`;
};

const checkRateLimit = (): { isLimited: boolean; remainingTime: number } => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (!stored) return { isLimited: false, remainingTime: 0 };

    const submissions: number[] = JSON.parse(stored);
    const now = Date.now();

    const validSubmissions = submissions.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );

    if (validSubmissions.length >= MAX_SUBMISSIONS) {
      const earliest = Math.min(...validSubmissions);
      const remaining = RATE_LIMIT_WINDOW_MS - (now - earliest);
      return { isLimited: true, remainingTime: remaining };
    }

    return { isLimited: false, remainingTime: 0 };
  } catch (err) {
    localStorage.removeItem(RATE_LIMIT_KEY);
    return { isLimited: false, remainingTime: 0 };
  }
};

const recordSubmission = () => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const submissions: number[] = stored ? JSON.parse(stored) : [];
    
    const now = Date.now();
    submissions.push(now);
    
    const cleaned = submissions.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(cleaned));
  } catch {
    // ignore localStorage errors
  }
};

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className }: ContactFormProps) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "rate_limited"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rateLimitTime, setRateLimitTime] = useState<number>(0);

  const isSending = status === "sending" || isSubmitting;

  useEffect(() => {
    // Initialize EmailJS with the hardcoded key
    if (EMAILJS_PUBLIC_KEY) {
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      } catch (err) {
        console.warn("[ContactForm] Failed to init EmailJS:", err);
      }
    } else {
      console.warn("[ContactForm] Public Key missing.");
    }
  }, []);

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      // 1. Check Rate Limit
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
      setErrorMessage(null);

      try {
        // 2. Validate Config
        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
          throw new Error("Email service configuration is missing.");
        }

        const templateParams = {
          from_name: data.name,
          reply_to: data.email,
          subject: data.subject,
          message: data.message,
        };

        // 3. Send Email
        await emailjs.send(
          EMAILJS_SERVICE_ID, 
          EMAILJS_TEMPLATE_ID, 
          templateParams, 
          EMAILJS_PUBLIC_KEY
        );

        // 4. Handle Success
        setStatus("success");
        recordSubmission();
        reset();
        
        toast({
          title: "Message sent",
          description: "Thanks — I'll reply as soon as I can.",
          variant: "default",
        });

      } catch (err: any) {
        // 5. Handle Error
        setStatus("error");
        const message = err?.text || err?.message || "An unexpected error occurred.";
        setErrorMessage(message);

        toast({
          title: "Failed to send message",
          description: message,
          variant: "destructive",
        });
        console.error("[ContactForm] Error:", err);
      }
    },
    [reset, toast]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          disabled={isSending}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2 mt-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          disabled={isSending}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Subject Field */}
      <div className="space-y-2 mt-3">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="What's this about?"
          disabled={isSending}
          {...register("subject")}
        />
        {errors.subject && (
          <p className="text-xs text-destructive">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2 mt-3">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell me about your project or inquiry..."
          className="min-h-[120px] resize-none"
          disabled={isSending}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Buttons & Status */}
      <div className="flex items-center gap-3 mt-4">
        <Button type="submit" disabled={isSending}>
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send message
            </>
          )}
        </Button>

        {status === "success" && (
          <div className="flex items-center text-primary text-sm">
            <CheckCircle className="mr-1 h-4 w-4" /> Sent
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center text-destructive text-sm">
            <AlertCircle className="mr-1 h-4 w-4" />
            {errorMessage ?? "Failed to send."}
          </div>
        )}

        {status === "rate_limited" && (
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="mr-1 h-4 w-4" />
            Wait {formatRemainingTime(rateLimitTime)}
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
