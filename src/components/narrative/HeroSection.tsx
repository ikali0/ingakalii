/**
 * HeroSection Component
 * Full-screen hero with parallax effects and scroll indicator
 */
import { motion, MotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
}

export const HeroSection = ({ opacity, scale, y }: HeroSectionProps) => {
  return (
    <motion.section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-container overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Background gradient orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10"
      >
        <motion.h1
          className="text-display-xl md:text-[8rem] lg:text-[10rem] font-display font-bold tracking-tighter"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="bg-gradient-to-r from-foreground via-primary to-accent-foreground bg-clip-text text-transparent">
            INGA
          </span>
          <span className="text-primary">.</span>
        </motion.h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 mt-6 text-body-lg md:text-display-sm text-muted-foreground font-light tracking-wide"
      >
        Remixing Logic + Art + Purpose
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-caption tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
