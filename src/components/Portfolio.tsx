import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { FlippingCard } from "@/components/ui/flipping-card";
import { motion, AnimatePresence } from "framer-motion";
import EntropyBackground from "@/components/EntropyBackground";
import { cn } from "@/lib/utils";

/** * Interface for Project Data
 */
interface ProjectData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  live?: string;
  category: string;
}

const CATEGORIES = ["All", "AI Ethics", "Governance", "Security", "Services"];

// CSS Variable fallback for the notebook lines
const LINE_HEIGHT_CSS = "clamp(18px, 4vw, 24px)";
const NOTEBOOK_BG = `repeating-linear-gradient(transparent, transparent calc(${LINE_HEIGHT_CSS} - 1px), hsl(var(--border) / 0.3) calc(${LINE_HEIGHT_CSS} - 1px), hsl(var(--border) / 0.3) ${LINE_HEIGHT_CSS})`;

const projects: ProjectData[] = [
  {
    title: "Tutoring & Applied Services",
    description: "AI-driven academic support platform providing personalized learning experiences and pedagogical alignment.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800", 
    tags: ["React", "AI"],
    live: "https://studii.lovable.app",
    category: "Services"
  },
  {
    title: "Red-Team Llama Engine",
    description: "Security auditing suite for open-source LLMs. Includes automated prompt injection and jailbreak detection tests.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    tags: ["Llama-3", "Security"],
    category: "Security"
  },
  {
    title: "NIST RMF Dashboard",
    description: "Governance tool for mapping AI outputs to NIST Risk Management Framework standards for enterprise compliance.",
    image: "https://images.unsplash.com/photo-1454165833772-d996d49513d2?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "Policy"],
    category: "Governance"
  },
  {
    title: "Bias Detection API",
    description: "High-performance API designed to monitor real-time decision chains for systemic bias and logic drift.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e90526354c?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "FastAPI"],
    category: "AI Ethics"
  }
];

function ProjectCardFront({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden rounded-sm bg-[#fffdfa] border border-slate-300 shadow-sm relative group">
      {/* Spiral Binding */}
      <div className="absolute left-0 top-0 bottom-0 w-[12%] max-w-[32px] bg-slate-200/50 border-r border-slate-300 flex flex-col justify-around py-4 z-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-[40%] aspect-square rounded-full bg-slate-400/40 shadow-inner mx-auto" />
        ))}
      </div>
      
      <div className="ml-[12%] md:ml-8 flex flex-col h-full relative">
        {/* Washi Tape Effect */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-fuchsia-500/10 backdrop-blur-[2px] -rotate-2 z-30 border-x border-white/20" />
        
        <div className="aspect-[16/11] overflow-hidden border-b border-slate-200">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
          />
        </div>
        
        <div className="flex-1 p-2 md:p-3" style={{ backgroundImage: NOTEBOOK_BG, backgroundSize: `100% ${LINE_HEIGHT_CSS}` }}>
          <h3 className="text-[min(3vw,13px)] md:text-sm font-bold text-slate-900 uppercase tracking-tight truncate">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {project.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[min(2.5vw,9px)] font-mono text-fuchsia-600 bg-fuchsia-50 px-1 border border-fuchsia-100 uppercase">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCardBack({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-col h-full w-full rounded-sm bg-[#fffdfa] border border-slate-300 shadow-md relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-[12%] max-w-[32px] bg-slate-200/50 border-r border-slate-300 flex flex-col justify-around py-4 z-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-[40%] aspect-square rounded-full bg-slate-400/40 shadow-inner mx-auto" />
        ))}
      </div>
      
      <div 
        className="ml-[12%] md:ml-8 flex-1 p-3 md:p-4 border-l border-red-200/60" 
        style={{ backgroundImage: NOTEBOOK_BG, backgroundSize: `100% ${LINE_HEIGHT_CSS}` }}
      >
        <p className="text-[min(2.8vw,11px)] md:text-xs text-slate-700 font-medium italic leading-[1.6] line-clamp-6">
          {project.description}
        </p>
        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-30">
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 bg-slate-900 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-sm text-[9px] md:text-[10px] hover:bg-fuchsia-600 transition-colors shadow-lg active:scale-95"
            >
              Launch <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");

  const filteredProjects = projects.filter(p =>
    filter === "All" ? true : p.category === filter
  );

  return (
    <section id="portfolio" className="relative py-12 md:py-24 px-4 overflow-hidden min-h-screen flex flex-col items-center">
      {/* Background layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <EntropyBackground category={filter} />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-fuchsia-600">The Archive</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mt-2">Portfolio</h2>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-3 py-1 md:px-5 md:py-2 text-[9px] md:text-[11px] uppercase tracking-wider font-bold border-2 transition-all duration-300",
                  filter === cat
                    ? "bg-fuchsia-600 border-fuchsia-600 text-white translate-y-[-2px] shadow-[0_4px_0_0_rgba(162,28,175,0.2)]"
                    : "bg-white/80 backdrop-blur-sm border-slate-200 text-slate-500 hover:border-fuchsia-300 hover:text-fuchsia-600"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout 
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center perspective-1000 h-[280px] md:h-[320px]"
              >
                <FlippingCard
                  className="w-full h-full"
                  frontContent={<ProjectCardFront project={project} />}
                  backContent={<ProjectCardBack project={project} />}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
