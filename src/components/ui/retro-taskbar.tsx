/**
 * Retro Windows-style Taskbar Component
 * 
 * A fixed bottom taskbar with Start button, quick-launch icons, and clock.
 * Provides navigation through a Start menu panel.
 */
import { useState, useEffect } from "react";
import { Monitor, User, Briefcase, Mail, FileText, Folder, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  { label: "Resume", href: "#resume", icon: <FileText className="w-5 h-5" /> },
];

const quickLaunchItems = [
  { href: "#portfolio", icon: <Folder className="w-4 h-4" />, label: "Portfolio" },
  { href: "#contact", icon: <Mail className="w-4 h-4" />, label: "Contact" },
];

export const RetroTaskbar = () => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

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
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Start Menu Overlay */}
      <AnimatePresence>
        {isStartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsStartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Start Menu */}
      <AnimatePresence>
        {isStartOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed left-2 bottom-14 z-50 w-64 retro-window"
          >
            {/* Title bar */}
            <div className="retro-title-bar">
              <span className="font-bold text-sm tracking-wide">Portfolio</span>
              <button
                onClick={() => setIsStartOpen(false)}
                className="retro-close-btn"
                aria-label="Close menu"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Menu items */}
            <div className="p-1">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className="retro-menu-item w-full"
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
                className="retro-menu-item w-full text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email...</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 retro-taskbar">
        <div className="flex items-center justify-between h-full px-1">
          {/* Left side: Start button + Quick launch */}
          <div className="flex items-center gap-1">
            {/* Start Button */}
            <button
              onClick={() => setIsStartOpen(!isStartOpen)}
              className={`retro-start-btn ${isStartOpen ? "retro-btn-pressed" : ""}`}
              aria-label="Start menu"
              aria-expanded={isStartOpen}
            >
              <div className="retro-windows-logo">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 bg-destructive" />
                  <div className="w-2 h-2 bg-secondary" />
                  <div className="w-2 h-2 bg-primary" />
                  <div className="w-2 h-2 bg-accent" />
                </div>
              </div>
              <span className="font-bold text-sm">Start</span>
            </button>

            {/* Divider */}
            <div className="retro-taskbar-divider" />

            {/* Quick launch icons */}
            <div className="flex items-center gap-1">
              {quickLaunchItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className="retro-quick-launch"
                  aria-label={item.label}
                  title={item.label}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Right side: Clock */}
          <div className="retro-clock">
            <div className="flex flex-col items-end leading-tight">
              <span className="text-xs font-medium">{formatTime(currentTime)}</span>
              <span className="text-[10px] opacity-80">{formatDate(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RetroTaskbar;
