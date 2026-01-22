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
  return <div className="flex flex-col h-full w-full overflow-hidden rounded-lg bg-card shadow-md">
      {/* Notebook spiral binding effect */}
      <div className="absolute left-0 top-0 bottom-0 w-4 md:w-5 bg-muted/60 border-r border-border flex flex-col justify-around py-3">
        {[...Array(6)].map((_, i) => <div key={i} className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-border mx-auto" />)}
      </div>
      
      {/* Content with notebook margin */}
      <div className="ml-4 md:ml-5 flex flex-col h-full">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden border-b border-border/50">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        </div>
        
        {/* Content area */}
        <div className="flex-1 p-3 md:p-4 relative" style={{
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 15px, hsl(var(--border) / 0.3) 15px, hsl(var(--border) / 0.3) 16px)',
        backgroundSize: '100% 16px'
      }}>
          <h3 className="text-sm md:text-base font-semibold text-foreground leading-tight line-clamp-2 mb-2">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map(tag => <span key={tag} className="text-[10px] md:text-xs text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20 font-medium">
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
  return <div className="flex flex-col h-full w-full rounded-lg bg-card shadow-md relative overflow-hidden">
      {/* Notebook spiral binding effect */}
      <div className="absolute left-0 top-0 bottom-0 w-4 md:w-5 bg-muted/60 border-r border-border flex flex-col justify-around z-10 py-3">
        {[...Array(6)].map((_, i) => <div key={i} className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-border mx-auto" />)}
      </div>
      
      {/* Content */}
      <div className="ml-4 md:ml-5 flex-1 p-4 md:p-6 flex flex-col justify-center" style={{
      backgroundImage: 'repeating-linear-gradient(transparent, transparent 15px, hsl(var(--border) / 0.3) 15px, hsl(var(--border) / 0.3) 16px)',
      backgroundSize: '100% 16px'
    }}>
        <p className="text-sm leading-relaxed text-foreground/80 mb-4 line-clamp-4 md:text-sm">
          {project.description}
        </p>
        {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 med-primary text-primary-foreground px-4 py-2 rounded-med text-sm font-medium hover: med-primary/90 transition-colors shadow-sm self-start">
            View Project <ExternalLink className="w-4 h-4" />
          </a>}
      </div>
    </div>;
}
const Portfolio = () => {
  return <section id="portfolio" className="py-12 md:py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8 md:mb-12 text-center">
          <p className="text-xs md:text-sm uppercase tracking-widest font-medium mb-2 text-primary">
            Selected Work
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-medium text-foreground mb-3">
            Portfolio
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            A selection of projects I've designed and built.
          </p>
        </div>

        {/* Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map(project => <FlippingCard key={project.title} width={280} height={300} className="w-full !h-[280px] sm:!h-[300px]" frontContent={<ProjectCardFront project={project} />} backContent={<ProjectCardBack project={project} />} />)}
        </div>
      </div>
    </section>;
};
export default Portfolio;