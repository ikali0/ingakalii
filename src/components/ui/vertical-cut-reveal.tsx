/**
 * Vertical Cut Reveal Component
 * 
 * Animates text with a vertical reveal effect, splitting by words or characters.
 */
import { motion, useInView, Transition, Variants } from "framer-motion";
import { useRef, useMemo } from "react";

interface VerticalCutRevealProps {
  children: string;
  splitBy?: "words" | "characters";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  reverse?: boolean;
  transition?: Transition;
  className?: string;
}

export const VerticalCutReveal = ({
  children,
  splitBy = "words",
  staggerDuration = 0.1,
  staggerFrom = "first",
  reverse = false,
  transition = {
    type: "spring",
    stiffness: 250,
    damping: 30,
  },
  className = "",
}: VerticalCutRevealProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const elements = useMemo(() => {
    if (splitBy === "words") {
      return children.split(" ");
    }
    return children.split("");
  }, [children, splitBy]);

  const getStaggerDelay = (index: number, total: number): number => {
    switch (staggerFrom) {
      case "last":
        return (total - 1 - index) * staggerDuration;
      case "center":
        return Math.abs(index - Math.floor(total / 2)) * staggerDuration;
      case "first":
      default:
        return index * staggerDuration;
    }
  };

  const variants: Variants = useMemo(
    () => ({
      hidden: {
        y: reverse ? -20 : 20,
        opacity: 0,
        filter: "blur(8px)",
      },
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          ...transition,
          delay: getStaggerDelay(i, elements.length),
        },
      }),
    }),
    [reverse, transition, elements.length, staggerDuration, staggerFrom]
  );

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {elements.map((element, index) => (
        <motion.span
          key={`${element}-${index}`}
          custom={index}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {element}
          {splitBy === "words" && index < elements.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
};

VerticalCutReveal.displayName = "VerticalCutReveal";
