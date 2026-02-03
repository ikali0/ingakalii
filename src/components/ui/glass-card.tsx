/**
 * Glassmorphism Card Component
 * 
 * A card with subtle glass effect and hover animations.
 */
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: boolean;
  onClick?: () => void;
}

export function GlassCard({ 
  children, 
  className = "",
  hoverScale = true,
  onClick
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-card/70 backdrop-blur-md",
        "border border-border/50",
        "shadow-soft",
        className
      )}
      style={{
        background: "linear-gradient(135deg, hsl(var(--card) / 0.8) 0%, hsl(var(--card) / 0.6) 100%)"
      }}
      whileHover={hoverScale ? { 
        scale: 1.02,
        boxShadow: "0 8px 32px -8px hsl(var(--primary) / 0.2)"
      } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
    >
      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "linear-gradient(135deg, hsl(var(--accent) / 0.1) 0%, transparent 50%)"
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Bento-style grid item with glass effect
 */
interface BentoItemProps {
  children: ReactNode;
  className?: string;
  span?: "1" | "2" | "full";
}

export function BentoItem({ children, className = "", span = "1" }: BentoItemProps) {
  const spanClasses = {
    "1": "",
    "2": "sm:col-span-2",
    "full": "col-span-full"
  };

  return (
    <GlassCard className={cn(spanClasses[span], className)}>
      {children}
    </GlassCard>
  );
}
