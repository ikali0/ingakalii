/**
 * Hero Section – Elevated & Responsive
 * File: components/Hero.tsx
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { motion, useReducedMotion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import EntropyBackground from "./ui/entropy-background";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-28 pb-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <EntropyBackground />
      </div>

      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/20 blur-3xl rounded-full opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 blur-3xl rounded-full opacity-40 animate-pulse" />

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-transparent to-background/90 pointer-events-none"
        aria-hidden
      />

      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <motion.span
          {...fadeUp(0)}
          className="inline-block text-xs uppercase tracking-widest py-1.5 px-3 rounded-full backdrop-blur-md border border-border/50 mb-8 bg-secondary-foreground text-primary-foreground"
        >
          AI Engineer & Independent Consultant
        </motion.span>

        {/* Name */}
        <motion.div {...fadeUp(0.1)} className="relative mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display tracking-tight bg-gradient-to-r from-foreground via-accent to-secondary bg-clip-text text-transparent relative z-10">
            Inga K.
          </h1>
          <h1 className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl font-display tracking-tight text-foreground/10 translate-y-3 blur-sm -z-10">
            Inga K.
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-base sm:text-lg text-foreground/80 max-w-lg leading-relaxed mb-12"
        >
          I translate{" "}
          <span className="font-semibold text-foreground italic">
            policy into deployable controls
          </span>{" "}
          and build AI systems that hold up under compliance, security, and
          real-world pressure.
        </motion.p>

        {/* Social */}
        <TooltipProvider>
          <motion.div {...fadeUp(0.3)} className="flex gap-4 mb-16">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href="https://www.linkedin.com/in/ik11/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.08 }}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/70 backdrop-blur-md border border-border hover:border-accent transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="w-4 h-4 text-[#0A66C2]"
                  />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>Connect professionally</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href="mailto:ingakali95@gmail.com"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.08 }}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/70 backdrop-blur-md border border-border hover:border-secondary transition-all shadow-sm"
                  aria-label="Email"
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="w-4 h-4 text-fuchsia-500"
                  />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>Send email</TooltipContent>
            </Tooltip>
          </motion.div>
        </TooltipProvider>

        {/* Scroll */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <a
            href="#about"
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-widest mb-3">
              Explore
            </span>
            {!prefersReducedMotion && (
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="w-4 h-4 text-accent"
                />
              </motion.div>
            )}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
