/**
 * Hero Section Component
 * 
 * The main landing section featuring:
 * - Animated entropy background
 * - Name and title
 * - Social links
 * - Scroll indicator
 */
import { ArrowDown, Linkedin, Mail } from "lucide-react";
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
        <div className="animate-fade-up opacity-0">
          <span className="inline-block px-3 py-1.5 mb-card text-overline uppercase bg-secondary/20 text-secondary-foreground rounded-full shadow-sm border border-secondary/30">
            Applied AI Engineer & Independent Consultant
          </span>
        </div>

        {/* Name */}
        <h1 className="animate-fade-up opacity-0 [animation-delay:200ms] text-display-lg sm:text-display-xl font-display text-foreground mb-card tracking-tight">
          Inga K.
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up opacity-0 [animation-delay:400ms] text-body-lg md:text-heading font-light mb-container max-w-2xl leading-relaxed text-balance text-foreground/80">
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
        </p>

        {/* Social Actions */}
        <div className="animate-fade-up opacity-0 [animation-delay:600ms] md:justify-start mb-container-lg flex items-start justify-center gap-element">
          <a
            href="https://www.linkedin.com/in/ik11/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-md rounded-md"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:altruisticxai@gmail.com"
            className="flex items-center justify-center w-12 h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all hover:scale-105 active:scale-95 shadow-md rounded-md"
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-up opacity-0 [animation-delay:1000ms] mt-section-sm md:mt-container flex justify-center md:justify-start w-full">
          <a
            href="#about"
            className="flex flex-col items-center gap-element-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-overline uppercase">Explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce text-accent" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
