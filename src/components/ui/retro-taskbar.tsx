/**
 * Retro Windows-style Taskbar Component
 * 
 * A fixed bottom taskbar with Start button, quick-launch icons, dark mode toggle, and clock.
 * Provides navigation through a Start menu panel.
 */
import { useState, useEffect } from "react";
import { Monitor, User, Briefcase, Mail, FileText, Folder, X, ArrowUp, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface StartMenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const menuItems: StartMenuItem[] = [
  { label: "About", href: "#about", icon: <User className="w-5 h-5" /> },
  { label: "Skills", href: "#skills", icon: <Monitor className="w-5 h-5" /> },
  { label: "Portfolio", href: "#portfolio", icon: <Folder className="w-5 h-5" /> },
  { label: "Experience", href: "#experience", icon: <Briefcase className="w-5 h-5" /> },
  { label: "Contact", href: "#contact", icon: <Mail className="w-5 h-5" /> },
  { label: "Resume", href: "#resume", icon: <FileText className="w-5 h-5" /> }
];

const quickLaunchItems = [
  { href: "#portfolio", icon: <ArrowUp className="h-[11px] w-[11px]" />, label: "Portfolio" },
  { href: "#contact", icon: <Mail className="w-4 h-4" />, label: "Contact" }
];

export const RetroTaskbar = () => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Wait for mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync CRT effects with document body class
  useEffect(() => {
    const screen = document.querySelector('.crt-screen');
    if (screen) {
      if (crtEnabled) {
        screen.classList.remove('crt-disabled');
      } else {
        screen.classList.add('crt-disabled');
      }
    }
  }, [crtEnabled]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMenuClick = (href: string) => {
    setIsStartOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

  return (
    <>
      {/* Start Menu Overlay - prevents interaction with page when menu is open */}
      <AnimatePresence>
        {isStartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/20 backdrop-blur-[1px]"
            onClick={() => setIsStartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Start Menu - responsive positioning */}
      <AnimatePresence>
        {isStartOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed left-2 right-2 sm:left-2 sm:right-auto bottom-14 z-50 sm:w-64 retro-window max-h-[70vh] overflow-y-auto"
          >
            {/* Title bar */}
            <div className="retro-title-bar sticky top-0 z-10">
              <span className="font-bold text-sm tracking-wide">Portfolio</span>
              <button
                onClick={() => setIsStartOpen(false)}
                className="retro-close-btn min-w-[20px] min-h-[20px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Menu items with touch-friendly sizing */}
            <div className="p-1">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className="retro-menu-item w-full min-h-[44px] touch-manipulation"
                >
                  <span className="retro-menu-icon">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="retro-divider mx-2" />

            {/* Shutdown area */}
            <div className="p-2">
              <a
                href="mailto:altruisticxai@gmail.com"
                className="retro-menu-item w-full text-sm min-h-[44px] touch-manipulation"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email...</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 retro-taskbar safe-area-bottom">
        <div className="flex items-center justify-between h-full px-1 sm:px-2">
          {/* Left side: Start button + Quick launch */}
          <div className="gap-1 flex items-center">
            {/* Start Button - touch-friendly sizing */}
            <button
              onClick={() => setIsStartOpen(!isStartOpen)}
              className={`retro-start-btn min-h-[36px] touch-manipulation ${isStartOpen ? "retro-btn-pressed" : ""}`}
              aria-label="Start menu"
              aria-expanded={isStartOpen}
            >
              <div className="retro-windows-logo">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 bg-primary" />
                  <div className="w-2 h-2 bg-secondary" />
                  <div className="w-2 h-2 bg-accent" />
                  <div className="w-2 h-2 bg-[hsl(45_95%_55%)]" />
                </div>
              </div>
              <span className="font-bold text-xs hidden xs:inline">Start</span>
            </button>

            {/* Divider - hidden on very small screens */}
            <div className="retro-taskbar-divider hidden sm:block" />

            {/* Quick launch icons - hidden on mobile for cleaner look */}
            <div className="hidden sm:flex items-center gap-1">
              {quickLaunchItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className="retro-quick-launch min-w-[32px] min-h-[32px] touch-manipulation"
                  aria-label={item.label}
                  title={item.label}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Right side: Dark Mode Toggle + Clock */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Dark Mode Toggle Button */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                className="retro-quick-launch w-9 h-9 min-w-[36px] min-h-[36px] touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {theme === "dark" ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </motion.div>
              </motion.button>
            )}

            {/* Clock - responsive sizing */}
            <div className="retro-clock px-2 sm:px-3">
              <div className="flex-col leading-tight flex items-center justify-center">
                <span className="text-[11px] sm:text-xs font-medium text-center whitespace-nowrap">{formatTime(currentTime)}</span>
                <span className="text-[9px] sm:text-[10px] opacity-80 hidden xs:block">{formatDate(currentTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RetroTaskbar;
