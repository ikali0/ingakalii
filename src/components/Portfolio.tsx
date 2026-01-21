import { ExternalLink } from "lucide-react";
import { FlippingCard } from "@/components/ui/flipping-card";

// Assuming asset imports remain the same...

const projects: ProjectData[] = [/* ... your project data ... */];

/**
 * Notebook Constants for consistency
 */
const NOTEBOOK_STYLES = {
  lineHeight: '24px', // Standard height for text to sit on lines
  spiralWidth: 'w-6 md:w-8',
  lineColor: 'hsl(var(--border) / 0.4)',
  redMargin: 'border-l-2 border-red-200/50'
};

function ProjectCardFront({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden rounded-sm bg-[#fafafa] shadow-md border border-slate-200">
      {/* Spiral Binding */}
      <div className={`absolute left-0 top-0 bottom-0 ${NOTEBOOK_STYLES.spiralWidth} bg-slate-100 border-r border-slate-300 flex flex-col justify-around py-4 z-20`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-400 shadow-inner mx-auto" />
        ))}
      </div>
      
      <div className="flex flex-col h-full ml-6 md:ml-8 relative">
        {/* Thumbnail */}
        <div className="aspect-[16/9] overflow-hidden grayscale-[20%] hover:grayscale-0 transition-all border-b border-slate-200">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
        
        {/* Content Area with Notebook Lines */}
        <div 
          className="flex-1 p-3 md:p-4" 
          style={{
            backgroundImage: `repeating-linear-gradient(transparent, transparent ${NOTEBOOK_STYLES.lineHeight}, ${NOTEBOOK_STYLES.lineColor} ${NOTEBOOK_STYLES.lineHeight}, ${NOTEBOOK_STYLES.lineColor} calc(${NOTEBOOK_STYLES.lineHeight} + 1px))`,
            backgroundSize: '100% 24px',
            lineHeight: '24px'
          }}
        >
          <h3 className="text-[10px] md:text-xs font-bold text-slate-800 uppercase tracking-tight line-clamp-1">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {project.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[7px] md:text-[9px] font-mono text-fuchsia-600">
                #{tag}
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
    <div className="flex flex-col h-full w-full rounded-sm bg-[#fafafa] shadow-md border border-slate-200 relative overflow-hidden">
      {/* Spiral Binding */}
      <div className={`absolute left-0 top-0 bottom-0 ${NOTEBOOK_STYLES.spiralWidth} bg-slate-100 border-r border-slate-300 flex flex-col justify-around py-4 z-20`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-400 shadow-inner mx-auto" />
        ))}
      </div>
      
      {/* Content Area */}
      <div 
        className={`ml-6 md:ml-8 flex-1 p-3 md:p-4 ${NOTEBOOK_STYLES.redMargin}`}
        style={{
          backgroundImage: `repeating-linear-gradient(transparent, transparent ${NOTEBOOK_STYLES.lineHeight}, ${NOTEBOOK_STYLES.lineColor} ${NOTEBOOK_STYLES.lineHeight}, ${NOTEBOOK_STYLES.lineColor} calc(${NOTEBOOK_STYLES.lineHeight} + 1px))`,
          backgroundSize: '100% 24px'
        }}
      >
        <p className="text-[9px] md:text-[11px] leading-[24px] text-slate-700 font-medium italic line-clamp-4 md:line-clamp-5">
          {project.description}
        </p>
        
        <div className="absolute bottom-4 right-4">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" 
               className="inline-flex items-center gap-1 bg-black text-white px-3 py-1 rounded-sm text-[8px] md:text-[10px] hover:bg-fuchsia-600 transition-colors shadow-lg">
              Open <ExternalLink className="w-2 h-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-16 px-6 bg-[#f0f0f0]">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-fuchsia-600">Archive</span>
          <h2 className="text-3xl font-display font-bold text-slate-900">Portfolio</h2>
        </div>

        {/* Responsive Grid: 1 col on tiny, 2 on mobile/tablet, 3+ on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {projects.map(project => (
            <div key={project.title} className="flex justify-center w-full">
              <FlippingCard 
                width={180} 
                height={220} 
                className="w-full max-w-[200px] md:max-w-none md:!w-full md:!h-[240px]" 
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

export default Portfolio;
