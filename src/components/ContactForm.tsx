import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  const isSending = status === "sending" || isSubmitting;

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      setStatus("sending");
      setErrorMessage(null);

      try {
        // Call edge function with server-side rate limiting
        const { data: response, error } = await supabase.functions.invoke(
          "send-contact-email",
          {
            body: {
              name: data.name,
              email: data.email,
              subject: data.subject,
              message: data.message,
            },
          }
        );

        if (error) {
          throw error;
        }

        // Check for rate limit response
        if (response?.error === "Rate limit exceeded") {
          setStatus("rate_limited");
          toast({
            title: "Too Many Requests",
            description: response.message || "Please try again later.",
            variant: "destructive",
          });
          return;
        }

        // Handle success
        setStatus("success");
        reset();

        toast({
          title: "Message sent",
          description: "Thanks — I'll reply as soon as I can.",
          variant: "default",
        });
      } catch (err: any) {
        setStatus("error");
        const message =
          err?.message || err?.text || "An unexpected error occurred.";
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
            Rate limit exceeded
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
