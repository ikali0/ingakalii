/**
 * Section Component
 * A wrapper for narrative sections with consistent styling
 */
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className = "", id }: SectionProps) => (
  <section
    id={id}
    className={cn(
      "relative min-h-screen flex items-center justify-center py-section px-container overflow-hidden",
      className
    )}
  >
    {children}
  </section>
);

export default Section;
