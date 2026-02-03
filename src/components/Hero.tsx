/**
 * Hero Section Component
 * 
 * The main landing section featuring:
 * - Animated entropy background
 * - Name and title with scroll animations
 * - Social links with hover effects
 * - Scroll indicator
 */
import { ArrowDown, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import EntropyBackground from "./ui/entropy-background";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden px-4 py-section-sm sm:py-section">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <EntropyBackground />
      </div>

      {/* Readability Overlay */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-background/20 via-transparent to-background/90 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-20 mx-auto max-w-5xl flex flex-col items-center md:items-start text-center md:text-left">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-block px-3 py-1.5 mb-card text-overline uppercase bg-secondary/15 text-secondary-foreground rounded-full shadow-sm border border-secondary/25 backdrop-blur-sm">
            Applied AI Engineer & Independent Consultant
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 
          className="text-display-lg sm:text-display-xl font-display text-foreground mb-card tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Inga K.
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          className="text-body-lg md:text-heading font-light mb-container max-w-2xl leading-relaxed text-balance text-foreground/80"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          I translate{" "}
          <span className="relative inline-block">
            <span className="relative z-10 font-semibold text-foreground italic">
              policy into deployable controls
            </span>
            <span
              className="absolute bottom-1 left-0 w-full h-3 bg-secondary/20 -z-10"
              aria-hidden="true"
            />
          </span>{" "}
          and build AI systems that hold up under compliance, security, and
          real-world pressure.
        </motion.p>

        {/* Social Actions */}
        <motion.div 
          className="md:justify-start mb-container-lg flex items-start justify-center gap-element"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href="https://www.linkedin.com/in/ik11/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md rounded-md"
            aria-label="LinkedIn Profile"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="mailto:altruisticxai@gmail.com"
            className="flex items-center justify-center w-12 h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md rounded-md"
            aria-label="Send Email"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="mt-section-sm md:mt-container flex justify-center md:justify-start w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-element-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-overline uppercase">Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 text-accent" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
