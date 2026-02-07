import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface ScrollFadeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
}

const EASE_OUT_QUART: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

const DIRECTION_OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

/* ------------------------------------------------------------------ */
/* ScrollFade */
/* ------------------------------------------------------------------ */

export function ScrollFade({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: ScrollFadeProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = DIRECTION_OFFSETS[direction];

  const variants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        delay,
        ease: EASE_OUT_QUART,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* StaggerContainer */
/* ------------------------------------------------------------------ */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? {}
        : {
            staggerChildren: staggerDelay,
          },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* StaggerItem */
/* ------------------------------------------------------------------ */

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({
  children,
  className = "",
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: EASE_OUT_QUART,
      },
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
