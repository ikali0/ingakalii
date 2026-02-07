import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { forwardRef, useMemo, type ReactNode } from "react";
type Direction = "up" | "down" | "left" | "right";
interface ScrollFadeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
}
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const DIRECTION_OFFSETS: Record<Direction, {
  x: number;
  y: number;
}> = {
  up: {
    x: 0,
    y: 24
  },
  down: {
    x: 0,
    y: -24
  },
  left: {
    x: 24,
    y: 0
  },
  right: {
    x: -24,
    y: 0
  }
};

/* ------------------------------------------------------------------ */
/* ScrollFade */
/* ------------------------------------------------------------------ */

export const ScrollFade = forwardRef<HTMLDivElement, ScrollFadeProps>(({
  children,
  delay = 0,
  className = "",
  direction = "up"
}, ref) => {
  const shouldReduceMotion = useReducedMotion();
  const offset = DIRECTION_OFFSETS[direction];
  const variants = useMemo<Variants>(() => {
    return {
      hidden: shouldReduceMotion ? {
        opacity: 1,
        x: 0,
        y: 0
      } : {
        opacity: 0,
        x: offset.x,
        y: offset.y
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: shouldReduceMotion ? {
          duration: 0
        } : {
          duration: 0.6,
          delay,
          ease: EASE_OUT_QUART
        }
      }
    };
  }, [shouldReduceMotion, offset.x, offset.y, delay]);
  return <motion.div ref={ref} variants={variants} initial="hidden" whileInView="visible" viewport={{
    once: true,
    amount: 0.2
  }} className={className}>
        {children}
      </motion.div>;
});
ScrollFade.displayName = "ScrollFade";

/* ------------------------------------------------------------------ */
/* StaggerContainer */
/* ------------------------------------------------------------------ */

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(({
  children,
  className = "",
  staggerDelay = 0.1
}, ref) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = useMemo<Variants>(() => {
    return {
      hidden: {},
      visible: {
        transition: shouldReduceMotion ? undefined : {
          staggerChildren: staggerDelay
        }
      }
    };
  }, [shouldReduceMotion, staggerDelay]);
  return;
});
StaggerContainer.displayName = "StaggerContainer";

/* ------------------------------------------------------------------ */
/* StaggerItem */
/* ------------------------------------------------------------------ */

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(({
  children,
  className = ""
}, ref) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = useMemo<Variants>(() => {
    return {
      hidden: shouldReduceMotion ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 16
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: shouldReduceMotion ? {
          duration: 0
        } : {
          duration: 0.5,
          ease: EASE_OUT_QUART
        }
      }
    };
  }, [shouldReduceMotion]);
  return <motion.div ref={ref} variants={variants} className={className}>
      {children}
    </motion.div>;
});
StaggerItem.displayName = "StaggerItem";