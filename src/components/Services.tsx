/**
 * Services Split-Screen Component
 * 
 * Swipable dual-track service offering:
 * - Left: Startups (speed, shipping, lightweight governance)
 * - Right: Regulated/Institutional (compliance, security, audit-ready)
 * 
 * Features:
 * - Desktop: Draggable divider to reveal each pane
 * - Mobile: Touch swipe gestures between panels
 */
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faLandmark, faArrowRight, faCheck, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { ScrollFade } from "./ui/scroll-fade";
import { useIsMobile } from "@/hooks/use-mobile";
const services = [{
  id: "startup",
  icon: faRocket,
  title: "AI Systems for Startups",
  tagline: "Ship fast. Ship safe.",
  description: "Production-ready LLM systems designed for speed, security, and scale.",
  bullets: ["Ship production-ready LLM features", "Prevent prompt injection & model abuse", "Design scalable RAG architectures", "Add lightweight governance early", "Prepare for SOC 2 / investor diligence"],
  cta: "Build With Me",
  ctaHref: "#contact"
}, {
  id: "regulated",
  icon: faLandmark,
  title: "AI Governance & Security",
  tagline: "Deploy with confidence.",
  description: "Operational AI governance and adversarial security for high-stakes environments.",
  bullets: ["Operationalize NIST AI RMF", "Translate policy into deployable controls", "Build audit-ready AI workflows", "Conduct adversarial testing", "Reduce institutional risk exposure"],
  cta: "Schedule Consultation",
  ctaHref: "#contact"
}];
export default function Services() {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Desktop draggable divider position (0.5 = center)
  const dividerPosition = useMotionValue(0.5);
  const leftWidth = useTransform(dividerPosition, [0.15, 0.85], ["15%", "85%"]);
  const rightWidth = useTransform(dividerPosition, [0.15, 0.85], ["85%", "15%"]);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Handle divider drag
  const handleDividerDrag = (_: any, info: PanInfo) => {
    if (!containerWidth) return;
    const newPosition = dividerPosition.get() + info.delta.x / containerWidth;
    dividerPosition.set(Math.max(0.15, Math.min(0.85, newPosition)));
  };

  // Handle mobile swipe
  const handleSwipeEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && active === 0) {
      setActive(1);
    } else if (info.offset.x > threshold && active === 1) {
      setActive(0);
    }
  };
  return <section id="services" className="py-16 px-4 bg-background gradient-teal-violet md:py-[11px]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <ScrollFade>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-xl animate-spin" style={{
              animationDuration: '3s'
            }}>✱</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Services
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4 leading-tight">
              Built for Speed. Built for Scrutiny.
            </h2>
            <p className="text-foreground/80 max-w-xl text-sm md:text-base leading-relaxed">
              I help startups ship responsibly — and regulated teams deploy safely.
            </p>
          </div>
        </ScrollFade>

        {/* Desktop: Draggable Split Screen */}
        {!isMobile && <ScrollFade>
            <div ref={containerRef} className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-lg h-[480px]">
              <div className="flex h-full">
                {/* Left Panel - Startups */}
                <motion.div className="h-full overflow-hidden" style={{
              width: leftWidth
            }}>
                  <div className="h-full p-6 sm:p-8 md:p-10 overflow-y-auto px-[11px] py-[11px]">
                    <ServicePanel service={services[0]} index={0} />
                  </div>
                </motion.div>

                {/* Draggable Divider */}
                <motion.div className="relative z-10 flex items-center justify-center cursor-col-resize group" drag="x" dragConstraints={{
              left: 0,
              right: 0
            }} dragElastic={0} dragMomentum={false} onDrag={handleDividerDrag} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                  <div className="w-1 h-full bg-border/60 group-hover:bg-primary/40 transition-colors duration-200" />
                  <div className="absolute w-8 h-16 bg-muted/80 border border-border/60 rounded-lg flex items-center justify-center shadow-md group-hover:bg-muted group-hover:border-primary/30 transition-all duration-200">
                    <FontAwesomeIcon icon={faGripVertical} className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </motion.div>

                {/* Right Panel - Regulated */}
                <motion.div className="h-full overflow-hidden" style={{
              width: rightWidth
            }}>
                  <div className="h-full p-6 sm:p-8 md:p-10 overflow-y-auto px-[11px] py-[11px]">
                    <ServicePanel service={services[1]} index={1} />
                  </div>
                </motion.div>
              </div>

              {/* Drag hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 pointer-events-none">
                ← Drag divider to explore →
              </div>
            </div>
          </ScrollFade>}

        {/* Mobile: Swipeable Panels */}
        {isMobile && <>
            {/* Toggle Tabs */}
            <ScrollFade>
              <div className="flex gap-2 mb-6">
                {services.map((service, index) => <button key={service.id} onClick={() => setActive(index)} className={cn("flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200", active === index ? "bg-foreground text-background shadow-md" : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground")}>
                    <FontAwesomeIcon icon={service.icon} className="w-3.5 h-3.5" />
                    <span>{index === 0 ? "Startups" : "Regulated"}</span>
                  </button>)}
              </div>
            </ScrollFade>

            {/* Swipeable Container */}
            <ScrollFade>
              <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-lg">
                <motion.div className="flex" drag="x" dragConstraints={{
              left: 0,
              right: 0
            }} dragElastic={0.1} onDragEnd={handleSwipeEnd} animate={{
              x: `-${active * 100}%`
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}>
                  {services.map((service, index) => <div key={service.id} className="min-w-full p-6 sm:p-8">
                      <ServicePanel service={service} index={index} />
                    </div>)}
                </motion.div>

                {/* Progress Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {services.map((_, index) => <button key={index} onClick={() => setActive(index)} className={cn("w-2 h-2 rounded-full transition-all duration-300", active === index ? "bg-foreground w-6" : "bg-foreground/20 hover:bg-foreground/40")} aria-label={`Go to slide ${index + 1}`} />)}
                </div>
              </div>
            </ScrollFade>

            {/* Swipe Hint */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              Swipe or tap tabs to switch tracks
            </p>
          </>}
      </div>
    </section>;
}

// Extracted panel component for reusability
function ServicePanel({
  service,
  index
}: {
  service: typeof services[0];
  index: number;
}) {
  return <>
      {/* Service Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", index === 0 ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary")}>
          <FontAwesomeIcon icon={service.icon} className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
            {service.title}
          </h3>
          <p className="text-sm text-muted-foreground">{service.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed max-w-lg">
        {service.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-3 mb-8">
        {service.bullets.map((item, bulletIndex) => <motion.li key={item} initial={{
        opacity: 0,
        x: -10
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: bulletIndex * 0.05
      }} className="flex items-start gap-3 text-sm text-foreground/80">
            <FontAwesomeIcon icon={faCheck} className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", index === 0 ? "text-accent" : "text-primary")} />
            <span>{item}</span>
          </motion.li>)}
      </ul>

      {/* CTA */}
      <motion.a href={service.ctaHref} whileHover={{
      scale: 1.02
    }} whileTap={{
      scale: 0.98
    }} className={cn("inline-flex items-center gap-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md px-[8px] py-[8px] bg-secondary-foreground text-secondary", index === 0 ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90")}>
        {service.cta}
        <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
      </motion.a>
    </>;
}