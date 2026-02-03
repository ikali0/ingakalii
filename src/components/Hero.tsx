/**
 * Hero Section Component
 *
 * Main landing section featuring:
 * - Animated entropy background
 * - Name and title with scroll-safe animations
 * - Social links with accessible tooltips
 * - Scroll indicator
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { motion, type Variants } from "framer-motion";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import EntropyBackground from "./ui/entropy-background";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  }),
};

const bounceDown: Variants = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Hero = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden px-4 pt-20 pb-section-sm sm:pb-section"
      aria-label="Hero section"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <EntropyBackground />
      </div>

      {/* Readability overlay */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-background/20 via-transparent to-background/90 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-20 mx-auto max-w-5xl flex flex-col items-center md:items-start text-center md:text-left">
        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
          <span className="inline-block mb-card rounded-full border border-secondary/25 bg-secondary/15 px-3 py-1.5 text-xs font-light uppercase font-serif text-secondary-foreground shadow-sm backdrop-blur-sm">
            Applied AI Engineer & Independent Consultant
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="mb-card text-display-lg sm:text-display-xl font-display tracking-tight text-foreground"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          Inga K.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mb-container max-w-2xl text-body-lg md:text-heading font-light leading-relaxed text-foreground/80 text-balance"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
        >
          I translate{" "}
          <span className="relative inline-block">
            <span className="relative z-10 font-semibold italic text-foreground">policy into deployable controls</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-secondary/20" aria-hidden="true" />
          </span>{" "}
          and build AI systems that hold up under compliance, security, and real-world pressure.
        </motion.p>

        {/* Social actions */}
        <TooltipProvider delayDuration={150}>
          <motion.div
            className="mb-container-lg flex items-center justify-center gap-3 md:justify-start"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
          >
            {/* LinkedIn */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href="https://www.linkedin.com/in/ik11/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#0A66C2]/20 bg-[#0A66C2]/10 shadow-sm transition-colors hover:bg-[#0A66C2]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4 text-[#0A66C2]" />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>Connect professionally</TooltipContent>
            </Tooltip>

            {/* Email */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href="mailto:altruisticxai@gmail.com"
                  aria-label="Send email"
                  className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-pink-300/30 bg-pink-400/10 shadow-sm transition-colors hover:bg-pink-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-pink-400" />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>Get in touch directly</TooltipContent>
            </Tooltip>
          </motion.div>
        </TooltipProvider>

        {/* Scroll indicator */}
        <motion.div
          className="mt-section-sm flex w-full justify-center md:mt-container md:justify-start"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <a
            href="#about"
            className="group flex flex-col items-center gap-element-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <span className="text-overline uppercase text-secondary-foreground">Explore</span>
            <motion.div variants={bounceDown} animate="animate">
              <FontAwesomeIcon icon={faArrowDown} className="h-5 w-5 text-accent" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
