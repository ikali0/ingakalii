/**
 * Services Split-Screen Component
 * 
 * Swipable dual-track service offering:
 * - Left: Startups (speed, shipping, lightweight governance)
 * - Right: Regulated/Institutional (compliance, security, audit-ready)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faLandmark, faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { ScrollFade } from "./ui/scroll-fade";
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
  return <section id="services" className="py-16 px-4 bg-background md:py-[88px]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <ScrollFade>
          <div className="mb-10 md:mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Services
            </p>
            
            <p className="text-muted-foreground max-w-xl text-sm md:text-base leading-relaxed">
              I help startups ship responsibly — and regulated teams deploy safely.
            </p>
          </div>
        </ScrollFade>

        {/* Toggle Tabs */}
        <ScrollFade>
          <div className="flex gap-2 mb-6">
            {services.map((service, index) => <button key={service.id} onClick={() => setActive(index)} className={cn("flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200", active === index ? "bg-foreground text-background shadow-md" : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground")}>
                <FontAwesomeIcon icon={service.icon} className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {index === 0 ? "Startups" : "Regulated"}
                </span>
              </button>)}
          </div>
        </ScrollFade>

        {/* Split Screen Container */}
        <ScrollFade>
          <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-lg">
            {/* Slide Container */}
            <motion.div className="flex" animate={{
            x: `-${active * 100}%`
          }} transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}>
              {services.map((service, index) => <div key={service.id} className="min-w-full p-6 sm:p-8 md:p-10">
                  {/* Service Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", index === 0 ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary")}>
                      <FontAwesomeIcon icon={service.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed max-w-lg">
                    {service.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-3 mb-8">
                    <AnimatePresence mode="wait">
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
                    </AnimatePresence>
                  </ul>

                  {/* CTA */}
                  <motion.a href={service.ctaHref} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md", index === 0 ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90")}>
                    {service.cta}
                    <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                  </motion.a>
                </div>)}
            </motion.div>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {services.map((_, index) => <button key={index} onClick={() => setActive(index)} className={cn("w-2 h-2 rounded-full transition-all duration-300", active === index ? "bg-foreground w-6" : "bg-foreground/20 hover:bg-foreground/40")} aria-label={`Go to slide ${index + 1}`} />)}
            </div>
          </div>
        </ScrollFade>

        {/* Swipe Hint (mobile) */}
        <p className="text-center text-xs text-muted-foreground mt-4 sm:hidden">
          Tap tabs to switch tracks
        </p>
      </div>
    </section>;
}