import { ExternalLink } from "lucide-react";
import { FlippingCard } from "@/components/ui/flipping-card";

// Constants for the Notebook Logic
const LINE_HEIGHT = 24; // px
const NOTEBOOK_BG = `repeating-linear-gradient(transparent, transparent ${LINE_HEIGHT - 1}px, hsl(var(--border) / 0.3) ${LINE_HEIGHT - 1}px, hsl(var(--border) / 0.3) ${LINE_HEIGHT}px)`;

function ProjectCardFront({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden rounded-sm bg-[#fffdfa] border border-slate-300 shadow-sm">
      {/* Spiral Binding - Adjusted for mobile scale */}
      <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-slate-200/50 border-r border-slate-300 flex flex-col justify-around py-4 z-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-400/40 shadow-inner mx-auto" />
        ))}
      </div>
      
      <div className="ml-6 md:ml-8 flex flex-col h-full relative">
        {/* Image - Styled as a "taped" or "clipped" photo */}
        <div className="aspect-[16/10] overflow-hidden border-b border-slate-200">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500" />
        </div>
        
        {/* Content with aligned lines */}
        <div className="flex-1 p-3" style={{ backgroundImage: NOTEBOOK_BG, backgroundSize: `100% ${LINE_HEIGHT}px` }}>
          <h3 className="text-[10px] md:text-xs font-bold text-slate-900 uppercase tracking-tight leading-[24px]">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {project.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[7px] md:text-[9px] font-mono text-fuchsia-600 bg-fuchsia-50 px-1 border border-fuchsia-100">
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
      {/* Spiral Binding */}
      <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-slate-200/50 border-r border-slate-300 flex flex-col justify-around py-4 z-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-400/40 shadow-inner mx-auto" />
        ))}
      </div>
      
      {/* Description Area with "Red Margin" line */}
      <div 
        className="ml-6 md:ml-8 flex-1 p-3 border-l border-red-200" 
        style={{ 
          backgroundImage: NOTEBOOK_BG, 
          backgroundSize: `100% ${LINE_HEIGHT}px`,
        }}
      >
        <p className="text-[9px] md:text-[11px] text-slate-700 font-medium italic leading-[24px] line-clamp-5">
          {project.description}
        </p>
        
        <div className="mt-4">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" 
               className="inline-flex items-center gap-1 bg-slate-900 text-white px-2 py-1 rounded-sm text-[8px] md:text-[10px] hover:bg-fuchsia-600 transition-colors shadow-sm">
              Launch <ExternalLink className="w-2 h-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-16 px-4 bg-slate-50/50">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-10 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-fuchsia-600">Selected Labs</span>
          <h2 className="text-3xl font-display font-bold text-slate-900 mt-2">Portfolio</h2>
        </div>

        {/* Mobile-first grid: 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
          {projects.map(project => (
            <div key={project.title} className="w-full flex justify-center">
              <FlippingCard 
                width={0} // Setting to 0 to let CSS classes control fluidity
                height={220} 
                className="w-full aspect-[3/4] max-w-[180px] md:max-w-none md:h-[260px]" 
                frontContent={<ProjectCardFront project={project} />} 
                backContent={<ProjectCardBack project={project} />} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
