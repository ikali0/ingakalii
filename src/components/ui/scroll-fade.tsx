"use client";

/**
 * Scroll Fade Animation Utilities
 * --------------------------------
 * - Scroll-triggered fade with direction
 * - Proper stagger support
 * - Reduced motion compliant
 * - Safe for Next.js App Router
 */

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                Configuration                               */
/* -------------------------------------------------------------------------- */

const EASE_OUT_QUART: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

const DIRECTION_OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

/* -------------------------------------------------------------------------- */
/*                                Scroll Fade                                 */
/* -------------------------------------------------------------------------- */

export function ScrollFade({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: ScrollFadeProps) {
  const reduceMotion = useReducedMotion();
  const offset = DIRECTION_OFFSET[direction];

  const variants: Variants = {
    hidden: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
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
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Stagger Container                             */
/* -------------------------------------------------------------------------- */

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Stagger Item                                */
/* -------------------------------------------------------------------------- */

export function StaggerItem({
  children,
  className = "",
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
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
