"use client";

/**
 * File: components/Hero.tsx
 * Enhanced Hero with Entropy particle background (mobile-first + responsive)
 */
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Linkedin, Mail, ArrowDown, BookOpen, Coffee } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

const SOCIAL_LINKS: SocialLink[] = [{
  href: "https://www.linkedin.com/in/ik11/",
  label: "LinkedIn",
  icon: Linkedin,
  borderClass: "border-purple-300 dark:border-purple-700",
  iconClass: "text-purple-500 dark:text-purple-400",
  tooltip: "Connect professionally"
}, {
  href: "mailto:ingakali95@gmail.com",
  label: "Email",
  icon: Mail,
  borderClass: "border-teal-300 dark:border-teal-700",
  iconClass: "text-teal-500 dark:text-teal-400",
  tooltip: "Send email"
}, {
  href: "https://substack.com/@ingakali",
  label: "Substack",
  icon: BookOpen,
  borderClass: "border-lime-300 dark:border-lime-700",
  iconClass: "text-lime-500 dark:text-lime-400",
  tooltip: "Read my newsletter"
}, {
  href: "https://ko-fi.com/ingakali",
  label: "Ko-fi",
  icon: Coffee,
  borderClass: "border-pink-300 dark:border-pink-700",
  iconClass: "text-pink-500 dark:text-pink-400",
  tooltip: "Support my work"
}];

/* ---------------- Hero ---------------- */

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? {} : {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5,
      delay
    }
  });
  const hoverMotion = reduceMotion ? {} : {
    whileHover: {
      scale: 1.06,
      y: -2
    },
    whileTap: {
      scale: 0.96
    }
  };
  return <section id="hero" role="region" aria-label="Hero" className="relative min-h-[100svh] flex items-center justify-center overflow-x-hidden px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 py-[44px]">
      {/* Entropy particle background (self-measuring & responsive) */}
      <div className="absolute inset-0 z-0 bg-background pointer-events-none" aria-hidden>
        <Entropy className="w-full h-full opacity-80" />
      </div>

      {/* Subtle gradient overlay for improved legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/72 via-background/36 to-transparent pointer-events-none" aria-hidden />

      {/* Page content */}
      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center min-w-0">
        <motion.span {...fadeUp(0)} className="inline-block text-[9px] sm:text-[10px] uppercase tracking-widest py-1 px-3 rounded-full backdrop-blur-md border border-purple-300/60 dark:border-purple-700/40 mb-4 sm:mb-6 bg-purple-100/70 dark:bg-purple-900/70 text-purple-800 dark:text-purple-200 shadow-sm">
          AI Engineer & Independent Consultant
        </motion.span>

        <motion.div {...fadeUp(0.08)} className="relative mb-3 sm:mb-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-snug bg-gradient-to-r from-purple-600 via-teal-500 to-lime-500 bg-clip-text text-transparent">
            Inga K.
          </h1>

          {/* subtle layered shadow for depth (non-interfering) */}
          <h1 aria-hidden className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-600/20 via-teal-500/20 to-lime-500/20 bg-clip-text text-transparent blur-md -z-10" style={{
          transform: "translateY(4px)"
        }}>
            Inga K.
          </h1>
        </motion.div>

        <motion.p {...fadeUp(0.18)} className="text-sm sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-[min(90vw,640px)] leading-relaxed mb-6 sm:mb-10 px-1">
          I translate{" "}
          <span className="font-semibold text-foreground italic">
            policy into deployable controls
          </span>{" "}
          and build AI systems that hold up under compliance, security, and
          real-world pressure.
        </motion.p>

        <TooltipProvider>
          <motion.div {...fadeUp(0.26)} className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-14 justify-center">
            {SOCIAL_LINKS.map(({
            href,
            label,
            icon: Icon,
            borderClass,
            iconClass,
            tooltip
          }) => <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <motion.a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} {...hoverMotion} className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-background/80 backdrop-blur-md border-2 ${borderClass} transition-all shadow-sm hover:shadow-md`}>
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${iconClass}`} />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>{tooltip}</TooltipContent>
                </Tooltip>)}
          </motion.div>
        </TooltipProvider>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.7
      }}>
          <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors group">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest mb-2 sm:mb-3 text-secondary-foreground">
              Explore
            </span>
            {!reduceMotion && <motion.div animate={{
            y: [0, 7, 0]
          }} transition={{
            duration: 1.6,
            repeat: Infinity
          }} className="p-2 rounded-full bg-lime-500/10 group-hover:bg-lime-500/20 transition-colors">
                <ArrowDown className="w-4 h-4 text-lime-500" />
              </motion.div>}
          </a>
        </motion.div>
      </div>
    </section>;
};
export default Hero;