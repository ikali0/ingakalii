/**
 * Project Timeline Component
 * 
 * A horizontal scrollable timeline showing project milestones and career highlights.
 * Designed for visual storytelling with an AI/ethics theme.
 */
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faRocket, faAward, faGraduationCap, faBriefcase, 
  faLightbulb, faChevronLeft, faChevronRight 
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { ScrollFade } from "./scroll-fade";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: typeof faRocket;
  type: "milestone" | "achievement" | "education" | "career";
}

const timelineItems: TimelineItem[] = [
  {
    year: "2019",
    title: "SAP SuccessFactors",
    description: "Started as Business Analyst, building ROI reports and optimizing data workflows.",
    icon: faBriefcase,
    type: "career"
  },
  {
    year: "2021",
    title: "Accenture Federal Services",
    description: "Joined as Consulting Analyst for DoD and federal agency projects.",
    icon: faBriefcase,
    type: "career"
  },
  {
    year: "2023",
    title: "Independent Consultant",
    description: "Launched AI policy consulting practice, focusing on NIST AI RMF compliance.",
    icon: faRocket,
    type: "milestone"
  },
  {
    year: "2024",
    title: "Penetration Testing",
    description: "Security role with DIA & Lockheed Martin, executing federal network assessments.",
    icon: faAward,
    type: "achievement"
  },
  {
    year: "2025",
    title: "AI Ethics Focus",
    description: "Deepening work in responsible AI, bias detection, and governance frameworks.",
    icon: faLightbulb,
    type: "milestone"
  }
];

const typeStyles = {
  milestone: "bg-primary/15 border-primary/30 text-primary",
  achievement: "bg-secondary/15 border-secondary/30 text-secondary",
  education: "bg-accent/15 border-accent/30 text-accent",
  career: "bg-muted border-border text-foreground"
};

export function ProjectTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <ScrollFade>
      <div className="relative mt-container-lg">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-card">
          <div>
            <p className="text-overline uppercase text-accent font-semibold mb-element-sm">
              Journey
            </p>
            <h3 className="text-heading font-display text-foreground">
              Career Timeline
            </h3>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-element-sm">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground transition-colors"
              aria-label="Scroll left"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground transition-colors"
              aria-label="Scroll right"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timeline Container */}
        <div 
          ref={scrollRef}
          className="flex gap-card overflow-x-auto pb-card scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex-shrink-0 w-[260px] sm:w-[280px]"
            >
              <div className="relative">
                {/* Timeline Connector */}
                {index < timelineItems.length - 1 && (
                  <div 
                    className="absolute top-5 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-0.5 bg-gradient-to-r from-border to-border/30"
                    style={{ width: "calc(2rem)" }}
                  />
                )}
                
                {/* Card */}
                <motion.div
                  className={`relative p-card rounded-xl border ${typeStyles[item.type]} backdrop-blur-sm`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Year Badge */}
                  <div className="flex items-center justify-between mb-element">
                    <span className="text-body font-display font-bold">
                      {item.year}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center">
                      <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-body-sm font-semibold text-foreground mb-element-sm leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-caption text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator for Mobile */}
        <div className="flex sm:hidden justify-center mt-element">
          <p className="text-caption text-muted-foreground">
            ← Swipe to explore →
          </p>
        </div>
      </div>
    </ScrollFade>
  );
}
