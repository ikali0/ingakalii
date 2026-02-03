/**
 * Portfolio Section Component
 * 
 * Project showcase with 3D card effects.
 */
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { Tag } from "./ui/tag";

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

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="portfolio-card-3d h-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="portfolio-card-inner flex flex-col h-full overflow-hidden rounded-xl bg-card border-2 border-border">
        {/* Image Container */}
        <div className="card-image-shine relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent opacity-65"
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col flex-1 p-card">
          <h3 className="text-subheading font-display font-semibold text-foreground leading-tight mb-element-sm line-clamp-2">
            {project.title}
          </h3>

          <p className="text-body-sm text-muted-foreground leading-relaxed mb-card-sm line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-element-sm mb-card-sm" role="list" aria-label="Technologies used">
            {project.tags.map((tag) => (
              <Tag key={tag} variant="default" size="sm" role="listitem">
                {tag}
              </Tag>
            ))}
          </div>

          {/* Action Button */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-button inline-flex items-center justify-center gap-element-sm w-full py-element px-card-sm text-body-sm font-medium text-primary-foreground bg-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card rounded-sm"
              aria-label={`View ${project.title} project`}
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="py-section-sm md:py-section px-4 bg-muted/30"
      aria-labelledby="portfolio-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          overline="Personal Projects"
          title="Featured Work"
          description="A selection of projects I've designed and built."
        />

        {/* Responsive Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-container md:gap-container-lg"
          role="list"
          aria-label="Portfolio projects"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
