/**
 * Timeline Animation Component
 * 
 * Provides scroll-triggered animations with customizable variants.
 */
import { motion, useInView, Variants } from "framer-motion";
import { ElementType, forwardRef, RefObject, useMemo, ReactNode } from "react";

interface TimelineContentProps {
  as?: ElementType;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  [key: string]: unknown;
}

export const TimelineContent = forwardRef<HTMLElement, TimelineContentProps>(
  (
    {
      as: Component = "div",
      animationNum,
      timelineRef,
      customVariants,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const isInView = useInView(timelineRef as RefObject<Element>, { once: true, amount: 0.2 });

    const defaultVariants: Variants = useMemo(
      () => ({
        hidden: {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
        },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        }),
      }),
      []
    );

    const variants = customVariants || defaultVariants;

    const MotionComponent = motion.create(Component as ElementType);

    return (
      <MotionComponent
        ref={ref}
        custom={animationNum}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

TimelineContent.displayName = "TimelineContent";
