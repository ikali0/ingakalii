/**
 * Hero Section – Clean centered layout with floating decorative elements
 * Inspired by GitHub Discussions aesthetic
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faMedium } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowRight, faShieldHalved, faBrain, faBalanceScale, faLightbulb, faGraduationCap, faComments } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

// Floating element component
const FloatingElement = ({
  children,
  className = "",
  delay = 0,
  duration = 20,
  x = 0,
  y = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}) => <motion.div initial={{
  opacity: 0,
  scale: 0.8
}} animate={{
  opacity: 1,
  scale: 1
}} transition={{
  delay: delay * 0.1,
  duration: 0.5
}} className={`absolute ${className}`} style={{
  x,
  y
}}>
    <motion.div animate={{
    y: [0, -8, 0],
    rotate: [0, 2, -2, 0]
  }} transition={{
    duration,
    repeat: Infinity,
    ease: "easeInOut"
  }}>
      {children}
    </motion.div>
  </motion.div>;

// Icon bubble component
const IconBubble = ({
  icon,
  size = "md",
  variant = "default"
}: {
  icon: typeof faShieldHalved;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "accent" | "muted";
}) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14"
  };
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };
  const variantClasses = {
    default: "bg-card border-border/50 text-foreground/70",
    accent: "bg-primary/10 border-primary/20 text-primary",
    muted: "bg-muted border-border/30 text-muted-foreground"
  };
  return <div className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full border shadow-sm flex items-center justify-center backdrop-blur-sm`}>
      <FontAwesomeIcon icon={icon} className={iconSizes[size]} />
    </div>;
};

// Badge component for floating labels
const FloatingBadge = ({
  children,
  variant = "default"
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "accent";
}) => {
  const variantClasses = {
    default: "bg-card border-border/50 text-foreground/80",
    success: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400",
    accent: "bg-primary/10 border-primary/30 text-primary"
  };
  return <span className={`${variantClasses[variant]} text-[10px] font-medium px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-sm whitespace-nowrap`}>
      {children}
    </span>;
};
const Hero = () => {
  return <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-28 pb-20 bg-background">
      {/* Subtle curved line decorations */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08] dark:opacity-[0.04]" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
        <circle cx="600" cy="400" r="280" stroke="currentColor" strokeWidth="1" className="text-border" />
        <circle cx="600" cy="400" r="380" stroke="currentColor" strokeWidth="0.5" className="text-border" />
        <path d="M150 200 Q 300 350 200 550" stroke="currentColor" strokeWidth="1" className="text-border" />
        <path d="M1050 200 Q 900 350 1000 550" stroke="currentColor" strokeWidth="1" className="text-border" />
      </svg>

      {/* Floating decorative elements - Left side */}
      <FloatingElement className="left-[8%] top-[20%] hidden lg:block" delay={1} duration={18}>
        <IconBubble icon={faGraduationCap} size="md" variant="muted" />
      </FloatingElement>

      <FloatingElement className="left-[12%] top-[45%] hidden md:block" delay={3} duration={22}>
        <IconBubble icon={faShieldHalved} size="lg" variant="accent" />
      </FloatingElement>

      <FloatingElement className="left-[5%] bottom-[30%] hidden lg:block" delay={5} duration={19}>
        <FloatingBadge variant="success">✓ Verified</FloatingBadge>
      </FloatingElement>

      <FloatingElement className="left-[18%] bottom-[20%] hidden md:block" delay={7} duration={24}>
        <IconBubble icon={faComments} size="sm" variant="muted" />
      </FloatingElement>

      {/* Floating decorative elements - Right side */}
      <FloatingElement className="right-[10%] top-[18%] hidden lg:block" delay={2} duration={20}>
        <IconBubble icon={faLightbulb} size="md" variant="accent" />
      </FloatingElement>

      <FloatingElement className="right-[5%] top-[40%] hidden md:block" delay={4} duration={17}>
        <FloatingBadge variant="accent">AI Ethics</FloatingBadge>
      </FloatingElement>

      <FloatingElement className="right-[15%] bottom-[35%] hidden lg:block" delay={6} duration={21}>
        <IconBubble icon={faBrain} size="lg" variant="muted" />
      </FloatingElement>

      <FloatingElement className="right-[8%] bottom-[18%] hidden md:block" delay={8} duration={23}>
        <IconBubble icon={faBalanceScale} size="sm" variant="default" />
      </FloatingElement>

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
      }} className="text-primary font-semibold text-sm tracking-wide mb-6">
          ​AI Engineer & Consultant          
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
          <span className="text-foreground/80">that hold up</span>
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
      }} className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-10">
          I translate policy into deployable controls and build AI systems 
          that hold up under compliance, security, and real-world pressure.
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
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors shadow-sm">
            Get in touch
            <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Secondary link */}
        <motion.a href="#about" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.5
      }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          Learn more
          <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </motion.a>

        {/* Social icons - subtle at bottom */}
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
                <a href="https://linkedin.com/in/ingakali" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Connect on LinkedIn</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://medium.com/@altruisticxai" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <FontAwesomeIcon icon={faMedium} className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Read on Medium</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="mailto:hello@ingakali.com" className="w-9 h-9 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
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