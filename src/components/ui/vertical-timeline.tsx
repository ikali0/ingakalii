/**
 * Vertical Career Timeline Component
 * 
 * A flexbox-based vertical timeline for displaying career history
 * with milestone markers, dates, and detailed descriptions.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faRocket, faAward, faGraduationCap, faLightbulb, faShieldHalved, faChartLine, faBuilding } from "@fortawesome/free-solid-svg-icons";
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
  education: faGraduationCap
};
const typeStyles = {
  career: {
    node: "bg-primary border-primary",
    glow: "shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
  },
  milestone: {
    node: "bg-accent border-accent",
    glow: "shadow-[0_0_12px_hsl(var(--accent)/0.4)]"
  },
  achievement: {
    node: "bg-secondary border-secondary",
    glow: "shadow-[0_0_12px_hsl(var(--secondary)/0.4)]"
  },
  education: {
    node: "bg-muted-foreground border-muted-foreground",
    glow: "shadow-[0_0_12px_hsl(var(--muted-foreground)/0.3)]"
  }
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
  if (entries.length === 0) return null;
  return <ScrollFade className="mt-12">
      
      

      <div className="relative pl-6 border-l-2 border-primary/30 space-y-8">
        {entries.map((entry, idx) => {
        const Icon = entry.icon ?? defaultIcons[entry.type];
        const styles = typeStyles[entry.type];
        const yearLabel = entry.endYear ? `${entry.year} – ${entry.endYear}` : entry.isCurrent ? `${entry.year} – Present` : entry.year;
        return <motion.div key={idx} initial={{
          opacity: 0,
          x: -12
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.4,
          delay: idx * 0.1
        }} className="relative">
              {/* Node marker */}
              <div className={`absolute -left-[calc(0.75rem+1px)] top-1 w-6 h-6 rounded-full flex items-center justify-center ${styles.node} ${styles.glow}`}>
                <FontAwesomeIcon icon={Icon} className="text-xs bg-fuchsia-500 rounded-sm shadow-sm opacity-85 border-lime-100 text-lime-100 border border-dotted" />
              </div>

              {/* Content */}
              <div className="ml-4">
                <span className="text-caption text-secondary">{yearLabel}</span>
                <h4 className="font-semibold text-foreground">{entry.title}</h4>
                <p className="text-caption text-accent font-extralight">
                  {entry.organization} · {entry.location}
                </p>
                <p className="text-body-sm mt-1">{entry.description}</p>

                {entry.highlights && entry.highlights.length > 0 && <ul className="mt-2 space-y-1">
                    {entry.highlights.map((h, i) => <li key={i} className="text-caption text-secondary-foreground">• {h}</li>)}
                  </ul>}

                {entry.tags && entry.tags.length > 0 && <div className="flex flex-wrap gap-1.5 mt-2">
                    {entry.tags.map(tag => <Tag key={tag} size="sm" variant="muted">{tag}</Tag>)}
                  </div>}
              </div>
            </motion.div>;
      })}
      </div>
    </ScrollFade>;
}
export default VerticalTimeline;