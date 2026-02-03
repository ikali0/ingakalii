/**
 * Modern Windows-style Taskbar Component
 *
 * Windows 11–inspired taskbar with Start menu, clock, and theme toggle.
 */
import { useState, useEffect, useRef } from "react";
import { User, Briefcase, FileText, Folder, X, Moon, Sun, ExternalLink, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/* ------------------------------------------------------------------ */
/* DATA                                                               */
/* ------------------------------------------------------------------ */

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
  label: "Resume",
  href: "/Inga_Kali_Resume.pdf",
  icon: <FileText className="w-4 h-4" />,
  isExternal: true
}, {
  label: "Portfolio",
  href: "#portfolio",
  icon: <Folder className="w-4 h-4" />
}, {
  label: "Experience",
  href: "#experience",
  icon: <Briefcase className="w-4 h-4" />
}, {
  label: "Publications",
  href: "https://ingakali.substack.com/",
  icon: <BookOpen className="w-4 h-4" />,
  isExternal: true
}];

/* ------------------------------------------------------------------ */
/* COMPONENT                                                          */
/* ------------------------------------------------------------------ */

const RetroTaskbar = () => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const {
    theme,
    setTheme
  } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  /* ---------------- lifecycle ---------------- */

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (isStartOpen && !menuRef.current?.contains(e.target as Node) && !startButtonRef.current?.contains(e.target as Node)) {
        setIsStartOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isStartOpen]);

  /* ---------------- helpers ---------------- */

  const openItem = (item: StartMenuItem) => {
    if (item.isExternal) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      document.querySelector(item.href)?.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsStartOpen(false);
  };
  const formatTime = (d: Date) => d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
  const formatDate = (d: Date) => d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  /* ------------------------------------------------------------------ */

  return <TooltipProvider>
      {/* Overlay */}
      <AnimatePresence>
        {isStartOpen && <motion.div className="fixed inset-0 z-40" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setIsStartOpen(false)} />}
      </AnimatePresence>

      {/* Start Menu */}
      <AnimatePresence>
        {isStartOpen && <motion.div ref={menuRef} initial={{
        opacity: 0,
        y: 6,
        scale: 0.98
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 6,
        scale: 0.98
      }} transition={{
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }} className="fixed bottom-14 left-2 right-2 sm:left-3 sm:w-72 z-50
                       rounded-xl bg-card/95 backdrop-blur-xl
                       border border-border/50 shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <span className="text-sm font-medium">Start</span>
              <button onClick={() => setIsStartOpen(false)} className="p-1.5 rounded-md hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2">
              {menuItems.map(item => <button key={item.label} onClick={() => openItem(item)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                             hover:bg-primary/10 active:bg-primary/20 transition-colors">
                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-muted/50">{item.icon}</span>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.isExternal && <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>)}
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="fixed bottom-0 inset-x-0 z-50 h-12
                      bg-card/90 backdrop-blur-xl border-t border-border/30">
        <div className="flex items-center justify-between h-full px-3">
          {/* Start Button */}
          <motion.button ref={startButtonRef} onClick={() => setIsStartOpen(v => !v)} className="flex items-center gap-2 h-9 border font-[Segoe_UI] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 bg-secondary px-[14px] border-secondary-foreground border-solid text-center rounded-sm" whileTap={{
          y: 1
        }}>
            {/* Windows logo tiles */}
            <div className="grid grid-cols-2 gap-[2px]">
              <div className="w-2 h-2 rounded-[2px] bg-accent" />
              <div className="w-2 h-2 rounded-sm shadow-sm bg-lime-400" />
              <div className="w-2 h-2 bg-primary rounded-[2px]" />
              <div className="w-2 h-2 rounded-[2px] bg-secondary-foreground" />
            </div>
            <span className="tracking-tight text-card-foreground">Start</span>
          </motion.button>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {mounted && <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted">
                    {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>Switch to {theme === "dark" ? "light" : "dark"} mode</TooltipContent>
              </Tooltip>}

            <div className="px-3 py-1.5 rounded-lg bg-muted/30 text-center">
              <div className="text-xs font-medium">{formatTime(currentTime)}</div>
              <div className="text-[10px] text-muted-foreground">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>;
};
export default RetroTaskbar;