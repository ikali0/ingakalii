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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// EmailJS template ID
const EMAILJS_TEMPLATE_ID = "portfolio_form11";

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

type FormStatus = "idle" | "sending" | "success" | "error";

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className }: ContactFormProps) => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
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
   * Handles form submission and sends email via EmailJS browser SDK
   */
  const onSubmit = async (data: ContactFormData) => {
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

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSending || !isValid}
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
