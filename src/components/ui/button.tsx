import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 shadow-[0_4px_0_0_hsl(var(--primary)/0.3)] hover:shadow-[0_2px_0_0_hsl(var(--primary)/0.3)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_4px_0_0_hsl(var(--primary)/0.4)]",
        destructive: "bg-destructive text-destructive-foreground shadow-[0_4px_0_0_hsl(var(--destructive)/0.4)] hover:shadow-[0_2px_0_0_hsl(var(--destructive)/0.4)]",
        outline: "border border-input bg-background shadow-[0_4px_0_0_hsl(var(--border))] hover:shadow-[0_2px_0_0_hsl(var(--border))] hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-[0_4px_0_0_hsl(var(--secondary)/0.4)] hover:shadow-[0_2px_0_0_hsl(var(--secondary)/0.4)]",
        ghost: "shadow-none hover:shadow-none hover:translate-y-0 active:translate-y-0 hover:bg-accent hover:text-accent-foreground",
        link: "shadow-none hover:shadow-none hover:translate-y-0 active:translate-y-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-3 py-1.5",
        sm: "h-7 rounded-md px-2.5",
        lg: "h-9 rounded-md px-5",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
