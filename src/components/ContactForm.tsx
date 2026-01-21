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

/**
 * EmailJS environment-aware constants.
 * These read from Vite's import.meta.env at module load time.
 */
export const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
export const EMAILJS_TEMPLATE_ID =
  (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || "portfolio_form11";
export const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

/**
 * Small runtime helper to verify EmailJS configuration.
 * - Returns { ok, missing } where missing is an array of env var names that are not set.
 * - Logs a structured debug entry to console.debug (useful during development).
 *
 * Usage:
 *   import { verifyEmailJSEnv } from "@/components/ContactForm";
 *   const { ok, missing } = verifyEmailJSEnv();
 */
export function verifyEmailJSEnv() {
  const missing: string[] = [];
  if (!EMAILJS_PUBLIC_KEY) missing.push("VITE_EMAILJS_PUBLIC_KEY");
  if (!EMAILJS_SERVICE_ID) missing.push("VITE_EMAILJS_SERVICE_ID");
  if (!EMAILJS_TEMPLATE_ID) missing.push("VITE_EMAILJS_TEMPLATE_ID");

  const ok = missing.length === 0;

  // Do not print secret values; just indicate presence/absence.
  // This output is safe to read in browser console during development.
  // eslint-disable-next-line no-console
  console.debug("[ContactForm] EmailJS env check", {
    ok,
    missing,
    SERVICE_ID_PRESENT: !!EMAILJS_SERVICE_ID,
    TEMPLATE_ID_PRESENT: !!EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY_PRESENT: !!EMAILJS_PUBLIC_KEY,
  });

  return { ok, missing };
}

/**
 * Rate limiting configuration (client-side friendly)
 */
const RATE_LIMIT_KEY = "contact_form_submissions";
const MAX_SUBMISSIONS = 3; // Max submissions allowed in window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

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

    // Filter out expired submissions
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
    // If localStorage is malformed, reset it
    localStorage.removeItem(RATE_LIMIT_KEY);
    return { isLimited: false, remainingTime: 0 };
  }
};

const recordSubmission = () => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const submissions: number[] = stored ? JSON.parse(stored) : [];
    submissions.push(Date.now());
    // keep only recent submissions within the window to prevent unbounded growth
    const now = Date.now();
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

  // Initialize EmailJS SDK with public key (client-side)
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        // eslint-disable-next-line no-console
        console.debug("[ContactForm] Initialized EmailJS with public key.");
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("[ContactForm] Failed to init EmailJS:", err);
      }
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        "[ContactForm] VITE_EMAILJS_PUBLIC_KEY not set. EmailJS not initialized."
      );
    }

    // Also perform a quick env check to help debugging
    verifyEmailJSEnv();
  }, []);

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      // Client-side rate limiting
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
        // Use module-level constants so they are stable across renders
        const publicKey = EMAILJS_PUBLIC_KEY;
        const serviceId = EMAILJS_SERVICE_ID;
        const templateId = EMAILJS_TEMPLATE_ID;

        // Robust config validation with informative error for devs
        if (!serviceId || !templateId) {
          throw new Error(
            `Email service is not configured. Missing: ${
              !serviceId ? "VITE_EMAILJS_SERVICE_ID " : ""
            }${!templateId ? "VITE_EMAILJS_TEMPLATE_ID" : ""}`.trim()
          );
        }

        const templateParams = {
          from_name: data.name,
          reply_to: data.email, // matches README/template examples
          subject: data.subject,
          message: data.message,
        };

        // Send email via EmailJS browser SDK.
        // Passing publicKey as the 4th param is harmless and works even if init wasn't called.
        // If publicKey is undefined, emailjs will use previously-initialized key (if any).
        // Option chosen here: pass publicKey explicitly when available for clarity.
        const sendArgs: Parameters<typeof emailjs.send> = [
          serviceId,
          templateId,
          templateParams,
        ];

        // Add public key param explicitly if present
        const sendResult = publicKey
          ? await emailjs.send(
              sendArgs[0],
              sendArgs[1],
              sendArgs[2],
              publicKey
            )
          : await emailjs.send(sendArgs[0], sendArgs[1], sendArgs[2]);

        // success path
        setStatus("success");
        recordSubmission();
        reset();
        toast({
          title: "Message sent",
          description: "Thanks — I'll reply as soon as I can.",
          variant: "default",
        });

        // eslint-disable-next-line no-console
        console.debug("[ContactForm] EmailJS send result:", sendResult);
      } catch (err: any) {
        setStatus("error");
        const message =
          err?.text || err?.message || "An unexpected error occurred.";
        setErrorMessage(message);

        toast({
          title: "Failed to send message",
          description: message,
          variant: "destructive",
        });

        // eslint-disable-next-line no-console
        console.error("[ContactForm] Email send error:", err);
      }
    },
    [reset, toast]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
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
      <div className="space-y-2 mt-3">
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
      <div className="space-y-2 mt-3">
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
      <div className="space-y-2 mt-3">
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

      {/* Status & Actions */}
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
          <div className="flex items-center text-success text-sm">
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
            Please wait {formatRemainingTime(rateLimitTime)} before trying again.
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
