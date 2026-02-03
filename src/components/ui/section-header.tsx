import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  id?: string; // <-- Added id here
  overline?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({ id, overline, title, description, align = "center", className }: SectionHeaderProps) {
  return (
    <header
      id={id}
      className={cn("mb-10 md:mb-14", align === "center" && "text-center", align === "left" && "text-left", className)}
    >
      {overline && <p className="text-overline uppercase text-accent font-semibold mb-2">{overline}</p>}
      <h2 className="text-display-sm md:text-display-md font-display text-foreground mb-3">{title}</h2>
      {description && <p className="text-body-sm md:text-body text-muted-foreground max-w-lg mx-auto">{description}</p>}
    </header>
  );
}

export default SectionHeader;
