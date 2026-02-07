/**
 * Tag Component
 * 
 * A reusable pill/badge component for:
 * - Technology tags
 * - Status labels
 * - Category badges
 */
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const tagVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-secondary/15 text-secondary-foreground border border-secondary/30",
        muted:
          "bg-muted text-muted-foreground border border-border/40",
        primary:
          "bg-primary/10 text-primary border border-primary/20",
        outline:
          "bg-transparent text-foreground border border-border",
      },
      size: {
        sm: "text-caption px-2 py-0.5 rounded",
        md: "text-body-sm px-2.5 py-1 rounded-md",
        lg: "text-body px-3 py-1.5 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  children: ReactNode;
}

export function Tag({ className, variant, size, children, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, size, className }))} {...props}>
      {children}
    </span>
  );
}

export default Tag;
