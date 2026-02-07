/**
 * File: components/Hero.tsx
 * Enhanced Hero with Entropy particle background
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Linkedin, Mail, ArrowDown, BookOpen, Coffee } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Entropy } from "@/components/ui/entropy";

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
    borderClass: "border-purple-300 dark:border-purple-700",
    iconClass: "text-purple-500 dark:text-purple-400",
    tooltip: "Connect professionally",
  },
  {
    href: "mailto:ingakali95@gmail.com",
    label: "Email",
    icon: Mail,
    borderClass: "border-teal-300 dark:border-teal-700",
    iconClass: "text-teal-500 dark:text-teal-400",
    tooltip: "Send email",
  },
  {
    href: "https://substack.com/@ingakali",
    label: "Substack",
    icon: BookOpen,
    borderClass: "border-lime-300 dark:border-lime-700",
    iconClass: "text-lime-500 dark:text-lime-400",
    tooltip: "Read my newsletter",
  },
  {
    href: "https://ko-fi.com/ingakali",
    label: "Ko-fi",
    icon: Coffee,
    borderClass: "border-pink-300 dark:border-pink-700",
    iconClass: "text-pink-500 dark:text-pink-400",
    tooltip: "Support my work",
  },
];

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
    : { whileHover: { scale: 1.1, y: -3 }, whileTap: { scale: 0.92 } };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20">
      {/* Vibrant 3D Entropy particle background */}
      <div className="absolute inset-0 z-0 bg-background">
        <Entropy className="opacity-80" />
      </div>
      
      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-background/70 via-background/30 to-transparent" />

      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        <motion.span
          {...fadeUp(0)}
          className="inline-block text-[10px] sm:text-xs uppercase tracking-widest py-1 px-3 sm:py-1.5 sm:px-4 rounded-full backdrop-blur-md border border-purple-300/60 dark:border-purple-700/60 mb-6 sm:mb-8 bg-purple-100/80 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200 shadow-lg shadow-purple-500/10"
        >
          AI Engineer & Independent Consultant
        </motion.span>

        <motion.div {...fadeUp(0.1)} className="relative mb-4 sm:mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-teal-500 to-lime-500 dark:from-purple-400 dark:via-teal-400 dark:to-lime-400 bg-clip-text text-transparent drop-shadow-sm">
            Inga K.
          </h1>
          {/* 3D shadow effect */}
          <h1 
            className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-purple-600/20 via-teal-500/20 to-lime-500/20 bg-clip-text text-transparent blur-lg -z-10"
            style={{ transform: "translateY(4px) translateZ(-10px)" }}
            aria-hidden
          >
            Inga K.
          </h1>
        </motion.div>

        <motion.p
          {...fadeUp(0.2)}
          className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md sm:max-w-lg leading-relaxed mb-8 sm:mb-12 px-2"
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
            className="flex flex-wrap gap-2 sm:gap-3 mb-12 sm:mb-16 justify-center"
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
                      className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-background/80 backdrop-blur-md border-2 ${borderClass} transition-all shadow-md hover:shadow-xl`}
                    >
                      <Icon className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${iconClass}`} />
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
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3">
              Explore
            </span>
            {!reduceMotion && (
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="p-2 rounded-full bg-lime-500/10 group-hover:bg-lime-500/20 transition-colors"
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
