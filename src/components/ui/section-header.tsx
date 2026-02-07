/**
 * SectionHeader Component
 * 
 * A consistent header for page sections with:
 * - Overline label (optional)
 * - Title
 * - Description (optional)
 * - Centered or left-aligned variants
 */
import { cn } from "@/lib/utils";
interface SectionHeaderProps {
  /** Small uppercase label above the title */
  overline?: string;
  /** Main section title */
  title: string;
  /** Optional description below title */
  description?: string;
  /** Alignment: 'center' (default) or 'left' */
  align?: "center" | "left";
  /** Additional className for the container */
  className?: string;
}
export function SectionHeader({
  overline,
  title,
  description,
  align = "center",
  className
}: SectionHeaderProps) {
  return <div className={cn("mb-12", align === "center" && "text-center", className)}>
      {overline && <div className={cn("flex items-center gap-2 mb-4", align === "center" && "justify-center")}>
          <span className="text-primary animate-spin" style={{
        animationDuration: "3s"
      }}>✱</span>
          <span className="text-overline uppercase text-primary tracking-widest">
            {overline}
          </span>
        </div>}
      
      {description}
    </div>;
}
export default SectionHeader;