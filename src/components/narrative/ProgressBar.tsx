/**
 * ProgressBar Component
 * A fixed scroll progress indicator at the top of the page
 */
import { motion, MotionValue } from "framer-motion";

interface ProgressBarProps {
  scaleX: MotionValue<number>;
}

export const ProgressBar = ({ scaleX }: ProgressBarProps) => (
  <motion.div
    className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
    style={{ scaleX }}
  />
);

export default ProgressBar;
