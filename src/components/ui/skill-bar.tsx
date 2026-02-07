/**
 * SkillBar Component
 * 
 * An animated progress bar for displaying skill proficiency levels.
 * Features:
 * - Animated fill on viewport entry
 * - Expandable examples section
 * - Consistent styling
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "./tag";
interface SkillBarProps {
  /** Skill name */
  name: string;
  /** Proficiency level (0-100) */
  level: number;
  /** Example technologies or applications */
  examples?: string[];
  /** Whether examples are expandable on click */
  expandable?: boolean;
}
export function SkillBar({
  name,
  level,
  examples = [],
  expandable = true
}: SkillBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => {
    if (expandable && examples.length > 0) {
      setIsExpanded(!isExpanded);
    }
  };
  return <div className={expandable && examples.length > 0 ? "cursor-pointer" : ""} onClick={handleClick}>
      {/* Header row */}
      <div className="flex justify-between items-end mb-1">
        <span className="text-[11px] sm:text-xs text-muted-foreground leading-snug mb-1.5 line-clamp-2\n">{name}</span>
        <span className="text-[10px] font-mono text-muted-foreground">
          {level}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full rounded-full overflow-hidden bg-muted/50">
        <motion.div initial={{
        width: 0
      }} whileInView={{
        width: `${level}%`
      }} viewport={{
        once: true
      }} transition={{
        duration: 1,
        ease: "easeOut"
      }} className="h-full bg-gradient-to-r from-secondary to-primary" />
      </div>

      {/* Expandable examples */}
      <AnimatePresence>
        {isExpanded && examples.length > 0 && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: "auto",
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} className="overflow-hidden">
            <div className="flex flex-wrap gap-1.5 mt-3">
              {examples.map(ex => <Tag key={ex} variant="muted" size="sm">
                  {ex}
                </Tag>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}
export default SkillBar;