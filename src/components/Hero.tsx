/**
 * File: components/Hero.tsx
 */

import React, { memo, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Linkedin, Mail, ArrowDown, BookOpen, Coffee } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ---------------- Types ---------------- */

type SocialLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  borderClass: string;
  iconClass: string;
  tooltip: string;
};

/* ---------------- Config ---------------- */

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/ik11/",
    label: "LinkedIn",
    icon: Linkedin,
    borderClass: "border-purple-200 dark:border-purple-800",
    iconClass: "text-purple-600 dark:text-purple-400",
    tooltip: "Connect professionally",
  },
  {
    href: "mailto:ingakali95@gmail.com",
    label: "Email",
    icon: Mail,
    borderClass: "border-teal-200 dark:border-teal-800",
    iconClass: "text-teal-600 dark:text-teal-400",
    tooltip: "Send email",
  },
  {
    href: "https://substack.com/@ingakali",
    label: "Substack",
    icon: BookOpen,
    borderClass: "border-lime-200 dark:border-lime-800",
    iconClass: "text-lime-600 dark:text-lime-400",
    tooltip: "Read my newsletter",
  },
  {
    href: "https://ko-fi.com/yourusername",
    label: "Ko-fi",
    icon: Coffee,
    borderClass: "border-pink-200 dark:border-pink-800",
    iconClass: "text-pink-600 dark:text-pink-400",
    tooltip: "Support my work",
  },
];

/* ---------------- Background ---------------- */

const EntropyBackground = memo(() => {
  const patternId = useId();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="25" cy="25" r="1" fill="hsl(var(--primary))" opacity="0.1" />
            <circle cx="75" cy="75" r="1" fill="hsl(var(--accent))" opacity="0.1" />
            <circle cx="50" cy="10" r="1" fill="hsl(var(--secondary))" opacity="0.1" />
            <circle cx="10" cy="90" r="1" fill="hsl(var(--primary))" opacity="0.1" />
            <circle cx="90" cy="40" r="1" fill="hsl(var(--accent))" opacity="0.1" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-teal-50/20 to-lime-50/30 dark:from-purple-950/20 dark:via-teal-950/10 dark:to-lime-950/20" />
    </div>
  );
});

EntropyBackground.displayName = "EntropyBackground";

/* ---------------- Hero ---------------- */

const Hero = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? {} : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  const hoverMotion = reduceMotion
    ? {}
    : { whileHover: { scale: 1.08, y: -2 }, whileTap: { scale: 0.95 } };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-28 pb-20">
      <div className="absolute inset-0 z-0">
        <EntropyBackground />
      </div>

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/20 blur-3xl rounded-full opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/30 dark:bg-teal-800/20 blur-3xl rounded-full opacity-40 animate-pulse" />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-transparent to-background/90 pointer-events-none" />

      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        <motion.span
          {...fadeUp(0)}
          className="inline-block text-xs uppercase tracking-widest py-1.5 px-4 rounded-full backdrop-blur-md border border-purple-200/50 dark:border-purple-800/50 mb-8 bg-purple-50/80 dark:bg-purple-950/80 text-purple-900 dark:text-purple-100"
        >
          AI Engineer & Independent Consultant
        </motion.span>

        <motion.div {...fadeUp(0.1)} className="relative mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-teal-500 to-lime-500 bg-clip-text text-transparent">
            Inga K.
          </h1>
          <h1 className="absolute inset-0 text-foreground/10 translate-y-3 blur-sm -z-10 text-5xl sm:text-6xl md:text-7xl font-bold">
            Inga K.
          </h1>
        </motion.div>

        <motion.p
          {...fadeUp(0.2)}
          className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed mb-12"
        >
          I translate{" "}
          <span className="font-semibold text-foreground italic">
            policy into deployable controls
          </span>{" "}
          and build AI systems that hold up under compliance, security, and
          real-world pressure.
        </motion.p>

        <TooltipProvider>
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-wrap gap-3 sm:gap-4 mb-16 justify-center"
          >
            {SOCIAL_LINKS.map(
              ({ href, label, icon: Icon, borderClass, iconClass, tooltip }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <motion.a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      {...hoverMotion}
                      className={`flex items-center justify-center w-12 h-12 rounded-xl bg-background/70 backdrop-blur-md border ${borderClass} transition-all shadow-sm hover:shadow-lg`}
                    >
                      <Icon className={`w-5 h-5 ${iconClass}`} />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>{tooltip}</TooltipContent>
                </Tooltip>
              )
            )}
          </motion.div>
        </TooltipProvider>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <a
            href="#about"
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-widest mb-3">
              Explore
            </span>
            {!reduceMotion && (
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <ArrowDown className="w-4 h-4 text-lime-500" />
              </motion.div>
            )}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
