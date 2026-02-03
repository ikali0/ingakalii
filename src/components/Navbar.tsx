/**
 * Navbar Component
 * 
 * Sticky navigation with smooth scroll, active section highlighting,
 * and mobile-responsive hamburger menu.
 */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
interface NavLink {
  label: string;
  href: string;
  id: string;
}
const navLinks: NavLink[] = [{
  label: "About",
  href: "#about",
  id: "about"
}, {
  label: "Skills",
  href: "#skills",
  id: "skills"
}, {
  label: "Portfolio",
  href: "#portfolio",
  id: "portfolio"
}, {
  label: "Experience",
  href: "#experience",
  id: "experience"
}, {
  label: "Contact",
  href: "#contact",
  id: "contact"
}];
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      // Smooth scroll with offset for fixed header
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };
  return <header className={cn("navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300", scrolled ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50" : "bg-transparent")}>
      
    </header>;
};
export default Navbar;