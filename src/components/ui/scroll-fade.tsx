/**
 * Scroll Fade Animation Wrapper
 *
 * Wraps content with Framer Motion scroll-triggered fade-in animation.
 * Optional animated flow-field background support.
 * Respects reduced motion preferences.
 */

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import NeuralBackground from "@/components/ui/flow-field-background";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

interface ScrollFadeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;

  // 🔥 NEW BACKGROUND OPTIONS
  withBackground?: boolean;
  backgroundColor?: string;
  backgroundTrailOpacity?: number;
  backgroundParticleCount?: number;
  backgroundSpeed?: number;
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

export function ScrollFade({
  children,
  delay = 0,
  className = "",
  direction = "up",

  // background defaults
  withBackground = false,
  backgroundColor = "#6366f1",
  backgroundTrailOpacity = 0.12,
  backgroundParticleCount = 600,
  backgroundSpeed = 0.8,
}: ScrollFadeProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = DIRECTION_OFFSETS[direction];

  return (
    <div className={cn("relative w-full", className)}>
      {/* 🔥 Background Layer */}
      {withBackground && !shouldReduceMotion && (
        <div className="absolute inset-0 -z-10">
          <NeuralBackground
            color={backgroundColor}
            trailOpacity={backgroundTrailOpacity}
            particleCount={backgroundParticleCount}
            speed={backgroundSpeed}
          />
        </div>
      )}

      {/* Animated Content */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0, ...offset }
        }
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.6,
          delay,
          ease: EASE_OUT_QUART,
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
