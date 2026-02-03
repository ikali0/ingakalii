import { ExternalLink } from "lucide-react";

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

const projects: ProjectData[] = [
  {
    title: "AI Ethics Dashboard",
    description: "Interactive platform for monitoring and auditing AI systems for fairness, transparency, and accountability metrics.",
    image: ethicsDashboard,
    tags: ["React", "Python"],
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "Governance Framework",
    description: "Tool for organizations to create and implement AI governance policies with automated compliance checking.",
    image: governance,
    tags: ["Next.js", "TypeScript"],
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "Stakeholder Mapping",
    description: "Visual tool for mapping stakeholder interests, power dynamics, and potential conflicts in tech deployment.",
    image: stakeholder,
    tags: ["React", "Force Graph"],
    github: "https://github.com"
  },
  {
    title: "Bias Detection API",
    description: "RESTful API service for detecting and measuring various types of bias in datasets and model outputs.",
    image: biasDetection,
    tags: ["Python", "FastAPI"],
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "Decision Framework",
    description: "Mobile-first application helping teams make ethical decisions under time pressure with structured frameworks.",
    image: decisionFramework,
    tags: ["React Native", "Firebase"],
    github: "https://github.com"
  },
  {
    title: "Tutoring & Applied Services",
    description: "AI-powered tutoring platform providing personalized learning experiences and academic support services.",
    image: tutoring,
    tags: ["React", "AI"],
    github: "https://github.com",
    live: "https://studii.lovable.app"
  }
];

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-lg bg-card border-2 border-border shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-semibold text-foreground leading-tight mb-2 font-display">
          {project.title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/30 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
          >
            View Project <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center">
          <p className="text-xs md:text-sm uppercase tracking-widest mb-2 text-accent font-semibold">
            Personal Projects
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-3">
            Featured Work
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
            A selection of projects I've designed and built.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;