/**
 * Scroll Fade Animation Wrapper
 *
 * Wraps content with Framer Motion scroll-triggered fade-in animation.
 * Respects reduced motion preferences.
 */
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface ScrollFadeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
}

const EASE_OUT_QUART: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const DIRECTION_OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export function ScrollFade({ children, delay = 0, className = "", direction = "up" }: ScrollFadeProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = DIRECTION_OFFSETS[direction];

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay,
        ease: EASE_OUT_QUART,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container for animating multiple children
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger item for use inside StaggerContainer
 * Also works standalone.
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: EASE_OUT_QUART,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
