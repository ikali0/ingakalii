/**
 * Hero Section – Elevated 3D & Responsive
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import EntropyBackground from "./ui/entropy-background";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-6, 6]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-28 pb-20"
      style={{ perspective: "1200px" }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <EntropyBackground />
      </div>

      {/* 3D Floating Orbs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-accent/15 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", left: "15%" }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full bg-secondary/15 blur-3xl"
        animate={{ x: [0, -30, 25, 0], y: [0, 25, -35, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "15%", right: "10%" }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-primary/10 blur-2xl"
        animate={{ x: [0, 20, -15, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "40%", right: "25%" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-transparent to-background/90 pointer-events-none" aria-hidden="true" />

      {/* 3D Tilting Card */}
      <motion.div
        className="relative z-20 w-full max-w-3xl mx-auto flex-col text-center flex items-center justify-center"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs uppercase tracking-widest py-1.5 rounded-full backdrop-blur-md border border-border/50 mb-8 bg-secondary-foreground text-primary-foreground px-[6px] text-center"
          style={{ transform: "translateZ(30px)" }}
        >
          AI Engineer & Independent Consultant
        </motion.span>

        {/* Name with 3D Depth */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-6"
          style={{ transform: "translateZ(60px)" }}
        >
          <h1 className="text-5xl sm:text-6xl font-display tracking-tight bg-gradient-to-r from-foreground via-accent to-secondary bg-clip-text text-transparent relative z-10 md:text-6xl py-px px-px text-center">
            Inga K.
          </h1>

          {/* Layered 3D Shadows */}
          <h1 className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl font-display tracking-tight text-foreground/8 translate-y-2 blur-[2px] -z-10" aria-hidden="true">
            Inga K.
          </h1>
          <h1 className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl font-display tracking-tight text-foreground/5 translate-y-4 blur-md -z-20" aria-hidden="true">
            Inga K.
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-foreground/80 max-w-lg leading-relaxed mb-12"
          style={{ transform: "translateZ(40px)" }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-3 mb-12"
            style={{ transform: "translateZ(50px)" }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-border/50 bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors shadow-lg">
                  <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 text-primary" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Connect on LinkedIn</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="mailto:ingakali95@gmail.com" className="w-10 h-10 border border-border/50 bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:border-secondary/50 hover:bg-secondary/5 transition-colors shadow-lg">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-secondary" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Email me</TooltipContent>
            </Tooltip>
          </motion.div>
        </TooltipProvider>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ transform: "translateZ(20px)" }}
        >
          <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs uppercase tracking-widest mb-3">Explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <FontAwesomeIcon icon={faArrowDown} className="w-4 h-4 text-accent" />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
export default Hero;