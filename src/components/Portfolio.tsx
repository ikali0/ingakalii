/**
 * Portfolio Section Component
 * 
 * Project showcase with glassmorphism cards, hover animations, and abstract shapes.
 */
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "./ui/section-header";
import { Tag } from "./ui/tag";
import { ScrollFade, StaggerContainer, StaggerItem } from "./ui/scroll-fade";
import { TriangleShape, WavyLine, GradientMesh } from "./ui/abstract-shapes";

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
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      className="h-full"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex flex-col h-full overflow-hidden rounded-xl glass shadow-soft">
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
              <motion.div key={tag} whileHover={{ scale: 1.1 }}>
                <Tag variant="default" size="sm" role="listitem">
                  {tag}
                </Tag>
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-element-sm w-full py-element px-card-sm text-body-sm font-medium text-primary-foreground bg-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card rounded-md"
              aria-label={`View ${project.title} project`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="relative py-section-sm md:py-section px-4 bg-muted/30 overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      {/* Abstract background elements */}
      <GradientMesh className="inset-0 w-full h-full" />
      <TriangleShape className="w-24 h-24 top-20 right-[10%] opacity-50" />
      <TriangleShape className="w-16 h-16 bottom-32 left-[5%] opacity-40 rotate-45" />
      <WavyLine className="w-full h-16 top-1/2 left-0 opacity-50" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <ScrollFade>
          <SectionHeader
            overline="Personal Projects"
            title="Featured Work"
            description="A selection of projects I've designed and built."
          />
        </ScrollFade>

        {/* Responsive Grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-container md:gap-container-lg"
          staggerDelay={0.08}
        >
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Portfolio;
