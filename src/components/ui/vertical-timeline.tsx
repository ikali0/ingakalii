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
  return <ScrollFade>
      
    </ScrollFade>;
}
export default VerticalTimeline;