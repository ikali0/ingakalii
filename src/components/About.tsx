/**
 * About Section Component
 * 
 * Personal introduction with timeline animations, vertical cut reveal, and editorial styling.
 * Adapted for AI ethics focus with clean, research-lab aesthetic.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faMedium } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { TimelineContent } from "./ui/timeline-animation";
import { VerticalCutReveal } from "./ui/vertical-cut-reveal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.12,
        duration: 0.5
      }
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0
    }
  };
  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6
      }
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
      scale: 0.95
    }
  };
  return <section id="about" className="py-16 md:py-24 px-4 bg-muted/30" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        {/* Header with badge and social icons */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <span className="text-accent text-xl animate-spin" style={{
            animationDuration: '3s'
          }}>✱</span>
            <TimelineContent as="span" animationNum={0} timelineRef={sectionRef} customVariants={revealVariants} className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Who I Am
            </TimelineContent>
          </div>
          
          <TooltipProvider>
            <div className="flex gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <TimelineContent as="a" animationNum={1} timelineRef={sectionRef} customVariants={revealVariants} href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-border/50 bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors">
                    <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 text-primary" />
                  </TimelineContent>
                </TooltipTrigger>
                <TooltipContent>Connect professionally</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <TimelineContent as="a" animationNum={2} timelineRef={sectionRef} customVariants={revealVariants} href="mailto:ingakali95@gmail.com" className="w-9 h-9 border border-border/50 bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:border-secondary/50 hover:bg-secondary/5 transition-colors">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-secondary" />
                  </TimelineContent>
                </TooltipTrigger>
                <TooltipContent>Get in touch directly</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {/* Left column - Main content */}
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-8 leading-tight">
              <VerticalCutReveal splitBy="words" staggerDuration={0.08} staggerFrom="first" reverse={true} transition={{
              type: "spring",
              stiffness: 250,
              damping: 30,
              delay: 0.3
            }}>
                Building AI Systems That Serve People
              </VerticalCutReveal>
            </h2>

            <TimelineContent as="div" animationNum={3} timelineRef={sectionRef} customVariants={revealVariants} className="grid md:grid-cols-2 gap-6 text-foreground/80">
              <TimelineContent as="div" animationNum={4} timelineRef={sectionRef} customVariants={revealVariants} className="text-sm md:text-base">
                <p className="leading-relaxed">
                  I work at the intersection of{" "}
                  <strong className="text-foreground font-semibold">
                    artificial intelligence, ethics, and human impact
                  </strong>
                  —focused not on hype, but on real-world consequences. I examine how AI systems shape behavior, power, access, and trust once deployed.
                </p>
              </TimelineContent>

              <TimelineContent as="div" animationNum={5} timelineRef={sectionRef} customVariants={revealVariants} className="text-sm md:text-base">
                <p className="leading-relaxed">
                  Through long-form writing on AI ethics, alignment, and accountability, I explore where technology delivers value, where it causes subtle harm, and what responsible governance truly requires.
                </p>
              </TimelineContent>
            </TimelineContent>

            <TimelineContent as="p" animationNum={6} timelineRef={sectionRef} customVariants={revealVariants} className="mt-6 text-sm md:text-base text-foreground/80 leading-relaxed max-w-xl">
              I believe technology should be{" "}
              <strong className="text-foreground font-semibold">
                transparent, humane, and grounded in lived reality
              </strong>
              . This site brings together my work and serves as a point of connection for readers, researchers, collaborators, and thoughtful technologists worldwide.
            </TimelineContent>
          </div>

          {/* Right column - Stats and CTA */}
          <div className="md:col-span-1">
            <div className="md:text-right">
              <TimelineContent as="div" animationNum={7} timelineRef={sectionRef} customVariants={revealVariants} className="text-accent text-2xl md:text-3xl font-bold mb-2">
                INGA K.
              </TimelineContent>

              <TimelineContent as="div" animationNum={8} timelineRef={sectionRef} customVariants={revealVariants} className="text-muted-foreground text-sm mb-8">
                AI Engineer | Ethics Researcher
              </TimelineContent>

              {/* Writing platforms */}
              <TimelineContent as="div" animationNum={9} timelineRef={sectionRef} customVariants={revealVariants} className="mb-6 flex md:flex-col gap-3 md:items-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://medium.com/@altruisticxai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border/50 hover:border-foreground/20 transition-colors text-sm">
                        <FontAwesomeIcon icon={faMedium} className="w-4 h-4" />
                        <span className="font-medium">Medium</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>Read in-depth work on Medium</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://ingakali.substack.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border/50 hover:border-[#FF6719]/30 transition-colors text-sm">
                        <svg className="w-4 h-4 text-[#FF6719]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                        </svg>
                        <span className="font-medium">Substack</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>Subscribe for new writing</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TimelineContent>

              <TimelineContent as="div" animationNum={10} timelineRef={sectionRef} customVariants={revealVariants} className="mb-6">
                <p className="text-foreground font-medium text-sm mb-4">
                  Ready to discuss AI ethics and governance?
                </p>
              </TimelineContent>

              <TimelineContent as="a" animationNum={11} timelineRef={sectionRef} customVariants={scaleVariants} href="#contact" className="inline-flex md:ml-auto gap-2 hover:gap-3 items-center bg-foreground hover:bg-foreground/90 text-background px-5 py-3 rounded-lg cursor-pointer font-semibold text-sm transition-all duration-300 shadow-lg">
                LET'S CONNECT
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
              </TimelineContent>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <TimelineContent as="div" animationNum={12} timelineRef={sectionRef} customVariants={revealVariants} className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold text-lg">5+</span>
              <span className="text-muted-foreground">years in tech</span>
            </div>
            <span className="text-border hidden md:block">|</span>
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold text-lg">AI Ethics</span>
              <span className="text-muted-foreground">focus area</span>
            </div>
            <span className="text-border hidden md:block">|</span>
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold text-lg">20+</span>
              <span className="text-muted-foreground">articles published</span>
            </div>
          </div>
        </TimelineContent>
      </div>
    </section>;
};
export default About;