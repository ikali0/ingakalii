/**
 * Vertical Career Timeline Component
 * 
 * A flexbox-based vertical timeline for displaying career history
 * with milestone markers, dates, and detailed descriptions.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBriefcase, faRocket, faAward, faGraduationCap, faLightbulb,
  faShieldHalved, faChartLine, faBuilding
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { ScrollFade } from "./scroll-fade";
import { Tag } from "./tag";

export interface TimelineEntry {
  year: string;
  endYear?: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  highlights?: string[];
  tags?: string[];
  type: "career" | "milestone" | "achievement" | "education";
  icon?: typeof faBriefcase;
  isCurrent?: boolean;
}

const defaultIcons = {
  career: faBriefcase,
  milestone: faRocket,
  achievement: faAward,
  education: faGraduationCap,
};

const typeStyles = {
  career: {
    node: "bg-primary border-primary",
    glow: "shadow-[0_0_12px_hsl(var(--primary)/0.4)]",
  },
  milestone: {
    node: "bg-accent border-accent",
    glow: "shadow-[0_0_12px_hsl(var(--accent)/0.4)]",
  },
  achievement: {
    node: "bg-secondary border-secondary",
    glow: "shadow-[0_0_12px_hsl(var(--secondary)/0.4)]",
  },
  education: {
    node: "bg-muted-foreground border-muted-foreground",
    glow: "shadow-[0_0_12px_hsl(var(--muted-foreground)/0.3)]",
  },
};

interface VerticalTimelineProps {
  entries: TimelineEntry[];
  title?: string;
  overline?: string;
}

export function VerticalTimeline({ 
  entries, 
  title = "Career Journey",
  overline = "Timeline" 
}: VerticalTimelineProps) {
  return (
    <ScrollFade>
      <div className="relative">
        {/* Section Header */}
        <div className="mb-container">
          <p className="text-overline uppercase text-accent font-semibold mb-element-sm">
            {overline}
          </p>
          <h3 className="text-heading font-display text-foreground">
            {title}
          </h3>
        </div>

        {/* Timeline Container - Flexbox vertical layout */}
        <div className="relative flex flex-col">
          {/* Vertical Line */}
          <div 
            className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 rounded-full"
            style={{
              background: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Timeline Entries */}
          <div className="flex flex-col gap-card">
            {entries.map((entry, index) => {
              const Icon = entry.icon || defaultIcons[entry.type];
              const styles = typeStyles[entry.type];
              
              return (
                <motion.div
                  key={`${entry.year}-${entry.title}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="relative flex gap-card pl-10 md:pl-14"
                >
                  {/* Timeline Node */}
                  <motion.div
                    className={`absolute left-2 md:left-4 top-1 w-5 h-5 rounded-full border-2 ${styles.node} ${entry.isCurrent ? 'animate-pulse' : ''} ${styles.glow} flex items-center justify-center`}
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="absolute inset-0.5 rounded-full bg-background/20" />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className="flex-1 p-card rounded-xl glass shadow-soft touch-manipulation"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center gap-element-sm mb-element-sm">
                      {/* Year Badge */}
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary">
                        <span className="text-caption font-bold">
                          {entry.year}{entry.endYear ? ` - ${entry.endYear}` : ''}
                        </span>
                        {entry.isCurrent && (
                          <span className="text-[0.625rem] uppercase tracking-wide font-semibold text-accent">
                            Current
                          </span>
                        )}
                      </div>
                      
                      {/* Icon */}
                      <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center">
                        <FontAwesomeIcon icon={Icon} className="w-3 h-3 text-foreground" />
                      </div>
                      
                      {/* Location */}
                      <span className="text-caption text-muted-foreground ml-auto">
                        {entry.location}
                      </span>
                    </div>

                    {/* Title & Organization */}
                    <h4 className="text-body font-semibold text-foreground leading-tight">
                      {entry.title}
                    </h4>
                    <p className="text-body-sm text-muted-foreground mb-element">
                      {entry.organization}
                    </p>

                    {/* Description */}
                    <p className="text-caption text-foreground/80 leading-relaxed mb-element">
                      {entry.description}
                    </p>

                    {/* Highlights */}
                    {entry.highlights && entry.highlights.length > 0 && (
                      <ul className="space-y-element-sm mb-element">
                        {entry.highlights.map((highlight, i) => (
                          <li 
                            key={i}
                            className="flex items-start gap-element-sm text-caption text-muted-foreground"
                          >
                            <span className="text-primary mt-0.5">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tags */}
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-element-sm">
                        {entry.tags.map((tag) => (
                          <Tag key={tag} variant="muted" size="sm">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollFade>
  );
}

export default VerticalTimeline;
