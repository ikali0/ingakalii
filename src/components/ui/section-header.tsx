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
        "header",
        align === "center" && "text-center",
        className
      )}
    >
      {overline && (
        <p className="header__overline">{overline}</p>
      )}
      <h2 className="header__title">{title}</h2>
      {description && (
        <p className={cn(
          "header__description mt-element",
          align === "center" && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
export default SectionHeader;