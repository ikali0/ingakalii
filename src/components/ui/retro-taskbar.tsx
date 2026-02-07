"use client";

import { useState, useEffect, useRef } from "react";
import { User, Briefcase, FileText, Folder, Moon, Sun, ExternalLink, BookOpen, Mail } from "lucide-react";
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
  icon: <User className="w-4 h-4" />
}, {
  label: "Services",
  href: "#services",
  icon: <Briefcase className="w-4 h-4" />
}, {
  label: "Portfolio",
  href: "#portfolio",
  icon: <Folder className="w-4 h-4" />
}, {
  label: "Experience",
  href: "#experience",
  icon: <BookOpen className="w-4 h-4" />
}, {
  label: "Contact",
  href: "#contact",
  icon: <Mail className="w-4 h-4" />
}, {
  label: "Resume",
  href: "/Inga_Kaltak_Resume.docx",
  icon: <FileText className="w-4 h-4" />,
  isExternal: true
}, {
  label: "Publications",
  href: "https://ingakali.substack.com/",
  icon: <BookOpen className="w-4 h-4" />,
  isExternal: true
}];
export default function RetroTaskbar(): JSX.Element {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);
  const {
    theme,
    setTheme
  } = useTheme();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const firstMenuItemRef = useRef<HTMLButtonElement | null>(null);

  // mark that component is mounted (avoid SSR mismatch for theme)
  useEffect(() => {
    setMounted(true);
  }, []);

  // clock tick
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // click-away handler (defensive)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node | null;
      if (isStartOpen && menuRef.current && buttonRef.current && target && !menuRef.current.contains(target) && !buttonRef.current.contains(target)) {
        setIsStartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isStartOpen]);

  // keyboard handler: Escape to close menu
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isStartOpen) {
        setIsStartOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isStartOpen]);

  // Focus first item when menu opens
  useEffect(() => {
    if (isStartOpen) {
      // small timeout to allow AnimatePresence to mount + browser focusable flow
      const t = setTimeout(() => firstMenuItemRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isStartOpen]);
  const formatTime = (date: Date) => date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
  const formatDate = (date: Date) => date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
  const handleMenuClick = (item: StartMenuItem) => {
    if (item.isExternal) {
      // open external or downloads in new tab/window
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      // only scroll for anchor links (defensive)
      try {
        if (item.href.startsWith("#")) {
          const el = document.querySelector(item.href);
          el?.scrollIntoView({
            behavior: "smooth"
          });
        } else {
          // fallback: navigate within same origin
          window.location.href = item.href;
        }
      } catch {
        // swallow any querySelector edge-cases
      }
    }
    setIsStartOpen(false);
  };
  const toggleTheme = () => {
    if (!setTheme) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return <TooltipProvider>
      {/* Backdrop overlay */}
      <AnimatePresence>
        {isStartOpen && <motion.div className="fixed inset-0 z-40" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setIsStartOpen(false)} aria-hidden />}
      </AnimatePresence>

      {/* Start Menu */}
      <AnimatePresence>
        {isStartOpen && <motion.div ref={menuRef} initial={{
        opacity: 0,
        y: 12,
        scale: 0.97
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 12,
        scale: 0.97
      }} transition={{
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }} className={"fixed left-2 right-2 bottom-16 z-50 sm:w-72 sm:left-3 sm:right-auto " + "bg-card/95 backdrop-blur-xl rounded-2xl border border-border/40 shadow-2xl " + "max-h-[70vh] overflow-y-auto"} role="menu" aria-label="Start menu">
            <div className="p-3 space-y-1">
              {menuItems.map((item, idx) => <button key={item.href} ref={idx === 0 ? firstMenuItemRef : undefined} type="button" role="menuitem" onClick={() => handleMenuClick(item)} className={"w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium " + "bg-muted/30 hover:bg-primary/10 active:scale-[0.98] transition-all"}>
                  <span className={"flex items-center justify-center w-8 h-8 rounded-lg bg-muted shadow-inner"} aria-hidden>
                    {item.icon}
                  </span>

                  <span className="flex-1 text-left">{item.label}</span>

                  {item.isExternal && <ExternalLink className="w-3.5 h-3.5 opacity-60" />}
                </button>)}
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Taskbar */}
      <div className={"fixed bottom-0 left-0 right-0 z-50 h-10 sm:h-11 bg-card/95 backdrop-blur-xl " + "border-t border-border/40 shadow-[0_-4px_12px_-4px_hsl(var(--foreground)/0.1)] " + "safe-area-bottom"}>
        <div className="flex items-center justify-between h-full px-1.5 sm:px-2">
          {/* Start Button - 3D style */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button ref={buttonRef} type="button" onClick={() => setIsStartOpen(s => !s)} whileTap={{
              scale: 0.97
            }} aria-haspopup="true" aria-expanded={isStartOpen} className={"flex items-center gap-1.5 h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg text-[10px] sm:text-xs font-semibold " + "bg-gradient-to-b from-muted to-muted/80 border border-border/50 " + "shadow-[0_3px_0_0_hsl(var(--border)),0_4px_8px_-2px_hsl(var(--foreground)/0.1)] " + "hover:shadow-[0_2px_0_0_hsl(var(--border))] hover:translate-y-[1px] " + "active:shadow-none active:translate-y-[3px] transition-all"}>
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-[2px] bg-primary" />
                  <div className="w-1.5 h-1.5 rounded-[2px] bg-secondary" />
                  <div className="w-1.5 h-1.5 rounded-[2px] bg-accent" />
                  <div className="w-1.5 h-1.5 rounded-[2px] bg-muted-foreground" />
                </div>
                <span className="tracking-tight text-primary">Start</span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>Open Start menu</TooltipContent>
          </Tooltip>

          {/* Right side: theme toggle + clock */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {mounted && <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button type="button" onClick={toggleTheme} whileTap={{
                scale: 0.95
              }} className={"w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-muted/50 " + "border border-border/40 shadow-[0_2px_0_0_hsl(var(--border))] " + "hover:shadow-[0_1px_0_0_hsl(var(--border))] hover:translate-y-[1px] " + "active:shadow-none active:translate-y-[2px] transition-all"} aria-label="Toggle dark mode">
                    {theme === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-accent" />}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>Toggle dark mode</TooltipContent>
              </Tooltip>}

            <div className={"px-2 py-1 rounded-lg bg-muted/50 border border-border/40 text-center " + "shadow-[inset_0_1px_2px_hsl(var(--foreground)/0.05)] " + "flex flex-col items-center justify-center"} aria-live="polite">
              <div className="text-[10px] sm:text-xs font-semibold tracking-tight">{formatTime(currentTime)}</div>
              <div className="text-[8px] opacity-60 hidden xs:block">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>;
}