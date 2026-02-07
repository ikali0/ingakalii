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
  return <header className={cn("mb-10 md:mb-14", align === "center" && "text-center", align === "left" && "text-left", className)}>
      {overline && <p className="text-overline uppercase text-accent font-semibold mb-2">
          {overline}
        </p>}
      <h2 className="text-display-sm md:text-display-md font-display text-foreground mb-3">
        {title}
      </h2>
      {description}
    </header>;
}
export default SectionHeader;