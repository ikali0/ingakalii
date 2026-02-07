/**
 * Hero Section – Elevated & Responsive
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import EntropyBackground from "./ui/entropy-background";
const Hero = () => {
  return <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-28 pb-20">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <EntropyBackground />
      </div>

      {/* Soft Gradient Glow Layers */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/20 blur-3xl rounded-full opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 blur-3xl rounded-full opacity-40 animate-pulse" />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-transparent to-background/90 pointer-events-none" aria-hidden="true" />

      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center">

        {/* Badge */}
        <motion.span initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="inline-block text-xs uppercase tracking-widest py-1.5 rounded-full backdrop-blur-md border border-border/50 mb-8 bg-secondary-foreground text-primary-foreground px-[6px] text-center">
          AI Engineer & Independent Consultant
        </motion.span>

        {/* Name with Depth */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.1
      }} className="relative mb-6">
          <h1 className="text-5xl sm:text-6xl font-display tracking-tight bg-gradient-to-r from-foreground via-accent to-secondary bg-clip-text relative z-10 md:text-6xl py-px px-px text-secondary">
            Inga K.
          </h1>

          {/* Soft Shadow Layer */}
          <h1 className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl font-display tracking-tight text-foreground/10 translate-y-3 blur-sm -z-10">
            Inga K.
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="text-base sm:text-lg max-w-lg leading-relaxed mb-12 bg-primary-foreground text-primary">
          I translate{" "}
          <span className="font-semibold text-foreground italic">
            policy into deployable controls
          </span>{" "}
          and build AI systems that hold up under compliance,
          security, and real-world pressure.
        </motion.p>

        {/* Social Buttons */}
        <TooltipProvider>
        <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="flex gap-4 mb-16">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" whileHover={{
                scale: 1.08
              }} whileTap={{
                scale: 0.95
              }} className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/70 backdrop-blur-md border border-border hover:border-accent transition-all shadow-sm" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 text-[#0A66C2]" />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                Connect professionally
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a href="mailto:ingakali95@gmail.com" whileHover={{
                scale: 1.08
              }} whileTap={{
                scale: 0.95
              }} className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/70 backdrop-blur-md border border-border hover:border-secondary transition-all shadow-sm" aria-label="Email">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-fuchsia-500" />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                Send email
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a href="https://ingakali.substack.com/" target="_blank" rel="noopener noreferrer" whileHover={{
                scale: 1.08
              }} whileTap={{
                scale: 0.95
              }} className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/70 backdrop-blur-md border border-border hover:border-orange-500 transition-all shadow-sm" aria-label="Substack">
                  <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                  </svg>
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                Subscribe for new writing
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a href="https://ko-fi.com/H2H01QIUGL" target="_blank" rel="noopener noreferrer" whileHover={{
                scale: 1.08
              }} whileTap={{
                scale: 0.95
              }} className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/70 backdrop-blur-md border border-border hover:border-[#FF5E5B] transition-all shadow-sm" aria-label="Ko-fi">
                  <svg className="w-4 h-4 text-[#FF5E5B]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/>
                  </svg>
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                Buy me a coffee
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </TooltipProvider>

        {/* Scroll Indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.7
      }}>
          <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs uppercase tracking-widest mb-3">
              Explore
            </span>
            <motion.div animate={{
            y: [0, 8, 0]
          }} transition={{
            duration: 1.6,
            repeat: Infinity
          }}>
              <FontAwesomeIcon icon={faArrowDown} className="w-4 h-4 text-accent" />
            </motion.div>
          </a>
        </motion.div>

      </div>
    </section>;
};
export default Hero;