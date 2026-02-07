/**
 * Modern Windows-style Taskbar Component
 * 
 * A fixed bottom taskbar with tactile Start button, structured menu,
 * dark mode toggle, and clock. Prioritizes mobile-first design.
 */
import { useState, useEffect, useRef } from "react";
import { User, Briefcase, FileText, Folder, X, Moon, Sun, ExternalLink, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
interface StartMenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  isExternal?: boolean;
  hoverText?: string;
}
const menuItems: StartMenuItem[] = [{
  label: "About",
  href: "#about",
  icon: <User className="w-4 h-4" />,
  hoverText: "Learn more about me"
}, {
  label: "Resume",
  href: "/Inga_Kaltak_Resume.docx",
  icon: <FileText className="w-4 h-4" />,
  isExternal: true,
  hoverText: "Download résumé"
}, {
  label: "Portfolio",
  href: "#portfolio",
  icon: <Folder className="w-4 h-4" />,
  hoverText: "View my work"
}, {
  label: "Experience",
  href: "#experience",
  icon: <Briefcase className="w-4 h-4" />,
  hoverText: "Career history"
}, {
  label: "Publications",
  href: "https://ingakali.substack.com/",
  icon: <BookOpen className="w-4 h-4" />,
  isExternal: true,
  hoverText: "Essays and research writing"
}];
export const RetroTaskbar = () => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const {
    theme,
    setTheme
  } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Wait for mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isStartOpen && menuRef.current && buttonRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
        setIsStartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isStartOpen]);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handleMenuClick = (item: StartMenuItem) => {
    if (item.isExternal) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
    setIsStartOpen(false);
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return <TooltipProvider>
      {/* Start Menu Overlay - prevents interaction with page when menu is open */}
      <AnimatePresence>
        {isStartOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.15
      }} className="fixed inset-0 z-40" onClick={() => setIsStartOpen(false)} />}
      </AnimatePresence>

      {/* Start Menu - modern Windows 11 inspired */}
      <AnimatePresence>
        {isStartOpen && <motion.div ref={menuRef} initial={{
        opacity: 0,
        y: 8,
        scale: 0.98
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 8,
        scale: 0.98
      }} transition={{
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }} className="fixed left-2 right-2 sm:left-3 sm:right-auto bottom-14 z-50 sm:w-72 
                       bg-card/95 backdrop-blur-xl rounded-xl border border-border/50
                       shadow-lg max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <span className="font-medium text-sm text-foreground">Menu</span>
              <button onClick={() => setIsStartOpen(false)} className="p-1.5 rounded-md hover:bg-muted/80 transition-colors" aria-label="Close menu">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Menu items with touch-friendly sizing */}
            <div className="p-2">
              {menuItems.map(item => <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <button onClick={() => handleMenuClick(item)} className="start-menu-item w-full min-h-[44px] flex items-center gap-3 px-3 py-2.5
                                 rounded-lg text-left text-foreground
                                 hover:bg-primary/10 active:bg-primary/15
                                 transition-colors touch-manipulation">
                      <span className="flex items-center justify-center w-8 h-8 rounded-md bg-muted/50">
                        {item.icon}
                      </span>
                      <span className="flex-1 font-medium text-sm">{item.label}</span>
                      {item.isExternal && <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="hidden sm:block">
                    <p>{item.hoverText}</p>
                  </TooltipContent>
                </Tooltip>)}
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 taskbar-modern safe-area-bottom
                      h-12 bg-card/90 backdrop-blur-xl border-t border-border/30
                      shadow-[0_-4px_20px_-4px_hsl(var(--foreground)/0.08)]">
        <div className="flex items-center justify-between h-full px-2 sm:px-3">
          {/* Left side: Start button */}
          <div className="flex items-center gap-2">
            {/* Modern Start Button - soft-rounded, tactile */}
            <motion.button ref={buttonRef} onClick={() => setIsStartOpen(!isStartOpen)} className="start-button-modern relative flex items-center gap-2 h-9 px-4
                         rounded-lg font-medium text-sm text-foreground
                         bg-gradient-to-b from-muted to-muted/80
                         border border-border/40
                         shadow-[0_1px_2px_0_hsl(var(--foreground)/0.05),0_2px_4px_-1px_hsl(var(--foreground)/0.05)]
                         transition-all duration-150 touch-manipulation" whileHover={{
            scale: 1.02,
            boxShadow: "0 2px 8px -2px hsl(var(--foreground)/0.1), 0 4px 12px -4px hsl(var(--foreground)/0.08)"
          }} whileTap={{
            scale: 0.98,
            y: 1
          }} aria-label="Start menu" aria-expanded={isStartOpen}>
              {/* Windows-inspired logo grid */}
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-2 h-2 rounded-[2px] bg-primary/80" />
                <div className="w-2 h-2 rounded-[2px] bg-secondary/80" />
                <div className="w-2 h-2 rounded-[2px] bg-accent/80" />
                <div className="w-2 h-2 rounded-[2px] bg-chart-4/80" />
              </div>
              <span className="text-xs text-muted-foreground leading-snug mb-2 line-clamp-2\n">Start</span>
            </motion.button>
          </div>

          {/* Right side: Dark Mode Toggle + Clock */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Dark Mode Toggle Button */}
            {mounted && <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button onClick={toggleTheme} className="flex items-center justify-center w-9 h-9 rounded-lg
                               bg-muted/50 hover:bg-muted transition-colors touch-manipulation" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
                    <motion.div initial={false} animate={{
                  rotate: theme === "dark" ? 180 : 0
                }} transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}>
                      {theme === "dark" ? <Moon className="w-4 h-4 text-foreground/70" /> : <Sun className="w-4 h-4 text-fuchsia-500" />}
                    </motion.div>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to {theme === "dark" ? "light" : "dark"} mode</p>
                </TooltipContent>
              </Tooltip>}

            {/* Clock - modern, minimal */}
            <div className="flex items-center justify-center py-1.5 rounded-lg bg-muted/30 px-[8px] text-secondary-foreground">
              <div className="flex flex-col items-center leading-tight">
                <span className="text-xs text-muted-foreground leading-snug mb-2 line-clamp-2\n">{formatTime(currentTime)}</span>
                <span className="text-[7px] hidden xs:block text-secondary">{formatDate(currentTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>;
};
export default RetroTaskbar;