/**
 * Hero Section Component (3D + Mobile First)
 *
 * - Mobile-first layout
 * - Subtle 3D depth layers
 * - Parallax tilt on desktop
 * - GPU-safe animations (transform + opacity only)
 * - Updated email route
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import EntropyBackground from "./ui/entropy-background";
import { useEffect } from "react";

const Hero = () => {
  /* ---------------- 3D Tilt (Desktop Only) ---------------- */

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientY / innerHeight - 0.5) * -6;
      const y = (e.clientX / innerWidth - 0.5) * 6;

      rotateX.set(x);
      rotateY.set(y);
    };

    if (window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handleMove);
      return () => window.removeEventListener("mousemove", handleMove);
    }
  }, [rotateX, rotateY]);

  /* ---------------- Component ---------------- */

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center px-4 pt-24 pb-16">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <EntropyBackground />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 via-transparent to-background/80 pointer-events-none"
        aria-hidden="true"
      />

      {/* 3D Content Wrapper */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center md:items-start md:text-left"
      >
        {/* Glass Surface for Depth */}
        <div className="w-full backdrop-blur-xl bg-background/60 border border-border/40 rounded-2xl shadow-2xl p-8 sm:p-12 transform-gpu will-change-transform">

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-wider font-medium px-4 py-2 rounded-full bg-secondary/15 border border-secondary/30 text-secondary-foreground mb-6"
          >
            AI Engineer & Independent Consultant
          </motion.span>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display tracking-tight mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-foreground via-accent to-secondary bg-clip-text text-transparent">
              Inga K.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed mb-10"
          >
            I translate{" "}
            <span className="font-semibold text-foreground italic">
              policy into deployable controls
            </span>{" "}
            and build AI systems that hold up under compliance,
            security, and real-world pressure.
          </motion.p>

          {/* Social Buttons */}
          <TooltipProvider>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              {/* LinkedIn */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.a
                    href="https://www.linkedin.com/in/ik11/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl border border-[#0A66C2]/30 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 transition-colors shadow-md"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 text-[#0A66C2]" />
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent>
                  Connect professionally
                </TooltipContent>
              </Tooltip>

              {/* Email (Updated) */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.a
                    href="mailto:ingakali95@gmail.com"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl border border-accent/30 bg-accent/10 hover:bg-accent/20 transition-colors shadow-md"
                    aria-label="Email"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-accent" />
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent>
                  Email directly
                </TooltipContent>
              </Tooltip>
            </motion.div>
          </TooltipProvider>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <a
            href="#about"
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-widest mb-2">
              Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FontAwesomeIcon icon={faArrowDown} className="w-5 h-5 text-accent" />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
