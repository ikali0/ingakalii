/**
 * About Section Component
 * 
 * Modern split-panel editorial layout with animated text reveals,
 * professional statistics, and a call-to-action.
 */
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail, Coffee } from "lucide-react";
import { SiSubstack } from "react-icons/si";
import { TimelineContent, TimelineScale } from "./ui/timeline-animation";
import { VerticalCutReveal } from "./ui/vertical-cut-reveal";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const About = () => {
  const heroRef = useRef(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  return (
    <section
      id="about"
      className="relative py-section bg-muted/30 overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div
          ref={heroRef}
          className="glass rounded-xl p-6 md:p-10 lg:p-12 border border-border/50 shadow-soft"
        >
          {/* Header with social icons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <span className="text-accent text-lg">✱</span>
              <span className="text-overline uppercase tracking-widest text-accent font-semibold">
                WHO I AM
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://linkedin.com/in/ingakaltak"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-[#0A66C2] hover:bg-muted transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:ingakalii@outlook.com"
                className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-muted transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://substack.com/@ingakali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                aria-label="Read on Substack"
              >
                <SiSubstack className="w-4 h-4" />
              </a>
              <a
                href="https://ko-fi.com/ingakali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-muted transition-colors"
                aria-label="Support on Ko-fi"
              >
                <Coffee className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <TimelineContent animateIn="fadeIn" custom={0}>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-border" />
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </TimelineContent>

          {/* Stats */}
          <div className="mb-8 md:mb-10">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-body-sm md:text-body">
              <TimelineScale custom={0}>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-foreground">5+</span>
                  <span className="text-muted-foreground">years experience</span>
                </div>
              </TimelineScale>
              <span className="text-border hidden sm:inline">|</span>
              <TimelineScale custom={1}>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-foreground">20+</span>
                  <span className="text-muted-foreground">articles</span>
                </div>
              </TimelineScale>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-body-sm md:text-body mt-2">
              <TimelineScale custom={2}>
                <span className="text-muted-foreground">AI Ethics</span>
              </TimelineScale>
              <span className="text-border hidden sm:inline">|</span>
              <TimelineScale custom={3}>
                <span className="text-muted-foreground">Policy & Governance</span>
              </TimelineScale>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Left Column - Title and Body */}
            <div className="lg:col-span-2 space-y-6">
              {/* Animated Title */}
              <h2 className="font-display text-h2 md:text-display-sm lg:text-display font-bold text-foreground leading-tight">
                <VerticalCutReveal
                  splitBy="characters"
                  staggerDuration={0.03}
                  staggerFrom="first"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                >
                  Examining AI's Real-World Impact.
                </VerticalCutReveal>
              </h2>

              {/* Two-column body text */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-body-sm md:text-body text-muted-foreground leading-relaxed">
                <TimelineContent animateIn="blurIn" custom={1}>
                  <p>
                    I work at the intersection of{" "}
                    <strong className="text-foreground font-medium">
                      artificial intelligence, ethics, and human impact
                    </strong>
                    —focused not on hype, but on real-world consequences. I examine 
                    how AI systems shape behavior, power, access, and trust once deployed.
                  </p>
                </TimelineContent>
                <TimelineContent animateIn="blurIn" custom={2}>
                  <p>
                    Through long-form writing on AI ethics, alignment, and accountability, 
                    I explore where technology delivers value, where it causes subtle harm, 
                    and what responsible governance truly requires. I believe technology should be{" "}
                    <strong className="text-foreground font-medium">
                      transparent, humane, and grounded in lived reality
                    </strong>.
                  </p>
                </TimelineContent>
              </div>
            </div>

            {/* Right Column - CTA Panel */}
            <div className="lg:col-span-1">
              <TimelineContent animateIn="slideUp" custom={3}>
                <div className="bg-card/60 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-border/40 h-full flex flex-col justify-center">
                  <div className="space-y-0.5 mb-4">
                    <p className="font-display text-h4 font-bold tracking-wide text-foreground uppercase">
                      INGA KALII
                    </p>
                    <p className="text-body-sm text-muted-foreground">
                      AI Ethics Researcher
                    </p>
                  </div>

                  <p className="text-body-sm text-muted-foreground mb-5">
                    Ready to connect?
                  </p>

                  <Button
                    asChild
                    className="w-full group"
                    size="lg"
                  >
                    <a href="#contact">
                      LET'S COLLABORATE
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
