import { ExternalLink } from "lucide-react";
import { FlippingCard } from "@/components/ui/flipping-card";

// Import generated images
import ethicsDashboard from "@/assets/portfolio-ethics-dashboard.jpg";
import governance from "@/assets/portfolio-governance.jpg";
import stakeholder from "@/assets/portfolio-stakeholder.jpg";
import biasDetection from "@/assets/portfolio-bias-detection.jpg";
import decisionFramework from "@/assets/portfolio-decision-framework.jpg";
import tutoring from "@/assets/portfolio-tutoring.jpg";
interface ProjectData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
}
const projects: ProjectData[] = [{
  title: "AI Ethics Dashboard",
  description: "Interactive platform for monitoring and auditing AI systems for fairness, transparency, and accountability metrics.",
  image: ethicsDashboard,
  tags: ["React", "Python"],
  github: "https://github.com",
  live: "https://example.com"
}, {
  title: "Governance Framework",
  description: "Tool for organizations to create and implement AI governance policies with automated compliance checking.",
  image: governance,
  tags: ["Next.js", "TypeScript"],
  github: "https://github.com",
  live: "https://example.com"
}, {
  title: "Stakeholder Mapping",
  description: "Visual tool for mapping stakeholder interests, power dynamics, and potential conflicts in tech deployment.",
  image: stakeholder,
  tags: ["React", "Force Graph"],
  github: "https://github.com"
}, {
  title: "Bias Detection API",
  description: "RESTful API service for detecting and measuring various types of bias in datasets and model outputs.",
  image: biasDetection,
  tags: ["Python", "FastAPI"],
  github: "https://github.com",
  live: "https://example.com"
}, {
  title: "Decision Framework",
  description: "Mobile-first application helping teams make ethical decisions under time pressure with structured frameworks.",
  image: decisionFramework,
  tags: ["React Native", "Firebase"],
  github: "https://github.com"
}, {
  title: "Tutoring & Applied Services",
  description: "AI-powered tutoring platform providing personalized learning experiences and academic support services.",
  image: tutoring,
  tags: ["React", "AI"],
  github: "https://github.com",
  live: "https://studii.lovable.app"
}];
function ProjectCardFront({
  project
}: {
  project: ProjectData;
}) {
  return <div className="flex flex-col h-full w-full overflow-hidden rounded-md bg-card">
      {/* Notebook spiral binding effect */}
      <div className="absolute left-0 top-0 bottom-0 w-3 md:w-4 bg-muted/60 border-r border-border flex flex-col justify-around py-2">
        {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-border mx-auto" />)}
      </div>
      
      {/* Content with notebook margin */}
      <div className="ml-3 md:ml-4 flex flex-col h-full">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden border-b border-border/50">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
        
        {/* Notebook lines effect */}
        <div className="flex-1 p-1.5 md:p-2 relative" style={{
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 11px, hsl(var(--border) / 0.3) 11px, hsl(var(--border) / 0.3) 12px)',
        backgroundSize: '100% 12px'
      }}>
          <h3 className="text-[9px] md:text-[11px] font-medium text-foreground leading-tight line-clamp-1">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-0.5 mt-1">
            {project.tags.map(tag => <span key={tag} className="text-[6px] md:text-[8px] text-primary bg-primary/10 px-1 py-0.5 rounded border border-primary/20">
                {tag}
              </span>)}
          </div>
        </div>
      </div>
    </div>;
}
function ProjectCardBack({
  project
}: {
  project: ProjectData;
}) {
  return <div className="flex-col h-full w-full rounded-md bg-card relative overflow-hidden flex items-center justify-start gap-[11px] px-[11px] py-[6px]">
      {/* Notebook spiral binding effect */}
      <div className="absolute left-0 top-0 bottom-0 w-3 md:w-4 bg-muted/60 border-r border-border flex flex-col justify-around z-10 py-[6px] mx-[4px]">
        {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-border mx-auto" />)}
      </div>
      
      {/* Content */}
      <div className="ml-3 md:ml-4 flex-1 p-2 md:p-3 flex flex-col justify-center items-center text-center py-[14px] px-[14px] mx-[12px] my-[6px]" style={{
      backgroundImage: 'repeating-linear-gradient(transparent, transparent 11px, hsl(var(--border) / 0.3) 11px, hsl(var(--border) / 0.3) 12px)',
      backgroundSize: '100% 12px'
    }}>
        <p className="<div class=\"max-w-prose mx-auto px-4 py-6 font-sans\">">
          {project.description}
        </p>
        {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 rounded text-[7px] md:text-[8px] hover:bg-primary/90 transition-colors shadow-sm">
            View <ExternalLink className="w-2 h-2" />
          </a>}
      </div>
    </div>;
}
const Portfolio = () => {
  return <section id="portfolio" className="py-10 md:py-16 px-3 md:px-4 bg-slate-50">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-5 md:mb-8 text-center">
          <p className="text-[9px] md:text-xs uppercase tracking-widest font-medium mb-1.5 text-primary">
            Selected Work
          </p>
          <h2 className="font-display text-lg md:text-2xl font-medium text-foreground mb-1.5">
            Portfolio
          </h2>
          <p className="text-[10px] md:text-sm text-muted-foreground max-w-sm mx-auto">
            A selection of projects I've designed and built.
          </p>
        </div>

        {/* Mobile: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-2 large:grid-cols-4 gap-2 md:gap-6 justify-items-center px-[12px] py-[12px] my-[11px] mx-[11px]">
          {projects.map(project => <FlippingCard key={project.title} width={140} height={150} className="w-full max-w-[140px] md:max-w-[170px] md:!w-[170px] md:!h-[175px]" frontContent={<ProjectCardFront project={project} />} backContent={<ProjectCardBack project={project} />} />)}
        </div>
      </div>
    </section>;
};
export default Portfolio;