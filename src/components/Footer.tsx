/**
 * Footer Component
 * 
 * Simple footer with glassmorphism styling.
 */
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      className="py-card px-4 text-center text-sm text-muted-foreground border-t border-border/30 glass-subtle"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p>© {new Date().getFullYear()} Inga Kaltak. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
