/**
 * Abstract SVG Background Shapes
 * 
 * Decorative shapes to break up boxy layouts and add visual interest.
 * Includes ParallaxShape wrapper for scroll-based parallax effects.
 */
import { ReactNode, useEffect, useState, forwardRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxShapeProps {
  children: ReactNode;
  /** Speed multiplier: 0.1 = subtle, 0.5 = dramatic */
  speed?: number;
  /** Degrees to rotate as user scrolls */
  rotateAmount?: number;
  /** Additional positioning classes */
  className?: string;
}

/**
 * Parallax wrapper that moves children based on scroll position.
 * Creates depth by moving elements at different speeds.
 */
export const ParallaxShape = forwardRef<HTMLDivElement, ParallaxShapeProps>(function ParallaxShape({
  children,
  speed = 0.15,
  rotateAmount = 0,
  className,
}, ref) {
  const [windowHeight, setWindowHeight] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : speed * windowHeight]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : rotateAmount]
  );

  return (
    <motion.div
      ref={ref}
      className={cn("absolute pointer-events-none", className)}
      style={{ y, rotate }}
    >
      {children}
    </motion.div>
  );
});

interface ShapeProps {
  className?: string;
}

/**
 * Floating blob shape with gradient fill
 */
export function BlobShape({ className }: ShapeProps) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={cn("absolute pointer-events-none", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(213 94% 35%)" stopOpacity="0.15" />
          <stop offset="50%" stopColor="hsl(265 50% 55%)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="hsl(158 55% 45%)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <motion.path
        d="M45.7,-58.2C59.1,-47.9,70.1,-33.7,74.8,-17.3C79.5,-0.9,77.9,17.7,69.8,32.4C61.7,47.1,47.1,58,31.1,64.5C15.1,71,-2.3,73.1,-19.3,69.4C-36.3,65.7,-52.9,56.2,-63.9,42.1C-74.9,28,-80.3,9.3,-77.4,-7.8C-74.5,-24.9,-63.3,-40.4,-49.4,-50.8C-35.5,-61.2,-17.8,-66.5,-0.5,-65.9C16.8,-65.3,33.3,-58.9,45.7,-58.2Z"
        transform="translate(100 100)"
        fill="url(#blob-gradient)"
        animate={{
          d: [
            "M45.7,-58.2C59.1,-47.9,70.1,-33.7,74.8,-17.3C79.5,-0.9,77.9,17.7,69.8,32.4C61.7,47.1,47.1,58,31.1,64.5C15.1,71,-2.3,73.1,-19.3,69.4C-36.3,65.7,-52.9,56.2,-63.9,42.1C-74.9,28,-80.3,9.3,-77.4,-7.8C-74.5,-24.9,-63.3,-40.4,-49.4,-50.8C-35.5,-61.2,-17.8,-66.5,-0.5,-65.9C16.8,-65.3,33.3,-58.9,45.7,-58.2Z",
            "M42.1,-51.5C54.5,-42.4,64.5,-29.2,68.9,-13.9C73.3,1.4,72.1,18.8,64.3,32.5C56.5,46.2,42.1,56.2,26.4,62.1C10.7,68,-6.3,69.8,-22.2,65.5C-38.1,61.2,-52.9,50.8,-62.1,36.6C-71.3,22.4,-74.9,4.4,-71.8,-12.3C-68.7,-29,-58.9,-44.4,-45.5,-53.3C-32.1,-62.2,-15.1,-64.6,0.1,-64.7C15.2,-64.9,29.7,-60.6,42.1,-51.5Z",
            "M45.7,-58.2C59.1,-47.9,70.1,-33.7,74.8,-17.3C79.5,-0.9,77.9,17.7,69.8,32.4C61.7,47.1,47.1,58,31.1,64.5C15.1,71,-2.3,73.1,-19.3,69.4C-36.3,65.7,-52.9,56.2,-63.9,42.1C-74.9,28,-80.3,9.3,-77.4,-7.8C-74.5,-24.9,-63.3,-40.4,-49.4,-50.8C-35.5,-61.2,-17.8,-66.5,-0.5,-65.9C16.8,-65.3,33.3,-58.9,45.7,-58.2Z",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}

/**
 * Floating circle with pulse animation
 */
export function CircleShape({ className }: ShapeProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={cn("absolute pointer-events-none", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <radialGradient id="circle-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(158 55% 45%)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(158 55% 45%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="url(#circle-gradient)"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}

/**
 * Decorative dots grid pattern
 */
export function DotsPattern({ className }: ShapeProps) {
  return (
    <svg
      className={cn("absolute pointer-events-none opacity-30", className)}
      width="100"
      height="100"
      viewBox="0 0 100 100"
    >
      <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="hsl(213 94% 35%)" opacity="0.35" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dots-pattern)" />
    </svg>
  );
}

/**
 * Wavy line decoration
 */
export function WavyLine({ className }: ShapeProps) {
  return (
    <motion.svg
      viewBox="0 0 400 100"
      className={cn("absolute pointer-events-none", className)}
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(158 55% 45%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(158 55% 45%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(158 55% 45%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 50 Q50 20 100 50 T200 50 T300 50 T400 50"
        fill="none"
        stroke="url(#wave-gradient)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

/**
 * Abstract triangle shapes
 */
export function TriangleShape({ className }: ShapeProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={cn("absolute pointer-events-none", className)}
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="triangle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(158 55% 45%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(213 94% 35%)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <motion.polygon
        points="50,10 90,90 10,90"
        fill="url(#triangle-gradient)"
        animate={{
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "center" }}
      />
    </motion.svg>
  );
}

/**
 * Floating ring shape
 */
export const RingShape = forwardRef<SVGSVGElement, ShapeProps>(function RingShape({ className }, ref) {
  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 100 100"
      className={cn("absolute pointer-events-none", className)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(158 55% 45%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(265 50% 55%)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="50" cy="50" r="35" fill="none"
        stroke="url(#ring-gradient)" strokeWidth="3"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      />
      <motion.circle
        cx="50" cy="50" r="25" fill="none"
        stroke="hsl(213 94% 35%)" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="5 5"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      />
    </motion.svg>
  );
});

/**
 * Sparkle/star decoration
 */
export function SparkleShape({ className }: ShapeProps) {
  return (
    <motion.svg
      viewBox="0 0 50 50"
      className={cn("absolute pointer-events-none", className)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "backOut" }}
    >
      <motion.path
        d="M25 0 L28 20 L50 25 L28 30 L25 50 L22 30 L0 25 L22 20 Z"
        fill="hsl(158 55% 45%)"
        fillOpacity="0.35"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "center" }}
      />
    </motion.svg>
  );
}

/**
 * Gradient mesh background
 */
export function GradientMesh({ className }: ShapeProps) {
  return (
    <div className={cn("absolute pointer-events-none overflow-hidden", className)}>
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(213 94% 35% / 0.08) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(158 55% 45% / 0.06) 0%, transparent 70%)",
          right: "-100px",
          top: "100px",
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
