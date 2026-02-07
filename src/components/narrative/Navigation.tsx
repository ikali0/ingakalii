/**
 * Navigation Component
 * Fixed navigation bar with glassmorphism effect
 */
import { motion } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-6 backdrop-blur-md bg-background/60 border-b border-border/20"
    >
      <a href="#hero" className="text-xl font-display font-bold text-foreground tracking-tight">
        INGA<span className="text-primary">.</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
