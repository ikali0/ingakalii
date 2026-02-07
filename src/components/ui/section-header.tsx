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
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {overline && (
        <div className={cn(
          "flex items-center gap-3 mb-4",
          align === "center" ? "justify-center" : "justify-start"
        )}>
          <span className="text-accent text-xl animate-spin" style={{ animationDuration: '3s' }}>✱</span>
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            {overline}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
export default SectionHeader;