/**
 * Hero Section – Vibrant 3D animated hero with orbiting icons
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faMedium } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import HeroFloatingIcons from "./ui/hero-floating-icons";
const Hero = () => {
  return <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-28 pb-20 bg-gradient-to-b from-background via-background to-muted/20">
      {/* 3D Animated floating icons */}
      <HeroFloatingIcons />

      {/* Main content - Centered */}
      <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Accent label */}
        <motion.span initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="inline-flex items-center gap-2 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold tracking-wide mb-6 px-[10px] text-xs">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          AI Engineer & Consultant
        </motion.span>

        {/* Main heading */}
        <motion.h1 initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.1
      }} className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground leading-[1.1] tracking-tight mb-6">
          Building AI systems
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-neural bg-clip-text text-transparent">
            that hold up
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-10 text-center">
          I bridge governance and engineering — translating policy into enforceable architecture and building AI that
          performs under institutional pressure.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }} className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <a href="#contact" className="group inline-flex items-center gap-1.5 py-2 text-xs font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-md shadow-[0_4px_0_0_hsl(var(--primary)/0.4)] hover:shadow-[0_2px_0_0_hsl(var(--primary)/0.4)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all duration-150 px-[10px]">
            Contact Me
            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* Secondary link */}
        

        {/* Social icons */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.6
      }} className="flex items-center gap-3 mt-12 pt-8 border-t border-border/30">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center shadow-[0_3px_0_0_hsl(var(--primary)/0.4)] hover:shadow-[0_1px_0_0_hsl(var(--primary)/0.4)] hover:translate-y-[2px] active:shadow-none active:translate-y-[3px] transition-all duration-150 hover:bg-primary/20">
                  <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Connect on LinkedIn</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://medium.com/@altruisticxai" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center shadow-[0_3px_0_0_hsl(var(--accent)/0.4)] hover:shadow-[0_1px_0_0_hsl(var(--accent)/0.4)] hover:translate-y-[2px] active:shadow-none active:translate-y-[3px] transition-all duration-150 hover:bg-accent/20">
                  <FontAwesomeIcon icon={faMedium} className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Read on Medium</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="mailto:hello@ingakali.com" className="w-11 h-11 rounded-full bg-neural/10 border border-neural/30 text-neural flex items-center justify-center shadow-[0_3px_0_0_hsl(var(--neural)/0.4)] hover:shadow-[0_1px_0_0_hsl(var(--neural)/0.4)] hover:translate-y-[2px] active:shadow-none active:translate-y-[3px] transition-all duration-150 hover:bg-neural/20">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Send an email</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>
    </section>;
};
export default Hero;