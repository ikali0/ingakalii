/**
 * Hero Section – Vibrant 3D animated hero with orbiting icons
 * Features a swipeable category carousel for project filtering
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faMedium } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import HeroFloatingIcons from "./ui/hero-floating-icons";
import HeroCategoryCarousel from "./ui/hero-category-carousel";
import { Entropy } from "./ui/entropy";

/* ---------------- Animation Variants ---------------- */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});

/* ---------------- Reusable Styles ---------------- */

const primaryButton =
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 w-full sm:w-auto min-w-[160px]";

const socialBase =
  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 hover:translate-y-[2px] active:translate-y-[3px] active:shadow-none";

/* ---------------- Component ---------------- */

const Hero = () => {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 px-4 pt-28 pb-20">
      {/* Floating 3D icons */}
      <HeroFloatingIcons />

      <div className="relative z-20 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Accent label */}
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold tracking-wide rounded-full border border-primary/20 bg-primary/10 text-primary"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI Engineer & Consultant
          </motion.span>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-6"
          >
            Building AI systems
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-neural bg-clip-text text-transparent">
              that hold up
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.2)} className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
            From policy to production-grade control. AI systems engineered for compliance, audit, and real-world
            pressure.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
            <a
              href="#portfolio"
              className={`${primaryButton} bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 group`}
            >
              View Projects
              <FontAwesomeIcon
                icon={faArrowRight}
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#contact"
              className={`${primaryButton} bg-secondary text-secondary-foreground border border-border hover:bg-accent hover:text-accent-foreground`}
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div {...fadeIn(0.6)} className="flex items-center gap-3 pt-6 border-t border-border/30">
            <TooltipProvider>
              <SocialIcon
                href="https://www.linkedin.com/in/ik11/"
                label="Connect on LinkedIn"
                className="bg-primary/10 border border-primary/30 text-primary shadow-[0_3px_0_0_hsl(var(--primary)/0.4)] hover:bg-primary/20"
                icon={faLinkedin}
              />
              <SocialIcon
                href="https://medium.com/@altruisticxai"
                label="Read on Medium"
                className="bg-accent/10 border border-accent/30 text-accent shadow-[0_3px_0_0_hsl(var(--accent)/0.4)] hover:bg-accent/20"
                icon={faMedium}
              />
              <SocialIcon
                href="mailto:hello@ingakali.com"
                label="Send an email"
                className="bg-neural/10 border border-neural/30 text-neural shadow-[0_3px_0_0_hsl(var(--neural)/0.4)] hover:bg-neural/20"
                icon={faEnvelope}
              />
            </TooltipProvider>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col items-center gap-6">
          {/* Entropy Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-lg blur-xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
            <Entropy size={280} className="relative z-10 bg-background/80 backdrop-blur-sm border border-border/50" />
          </motion.div>

          {/* Category Carousel */}
          <motion.div {...fadeUp(0.5)} className="w-full max-w-sm">
            <HeroCategoryCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Social Icon Component ---------------- */

const SocialIcon = ({ href, label, icon, className }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={label}
        className={`${socialBase} ${className}`}
      >
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      </a>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
);

export default Hero;
