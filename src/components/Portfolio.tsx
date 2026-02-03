/**
 * Portfolio Section Component
 * 
 * Enhanced case study cards with problem/approach/outcomes structure,
 * expandable details, and visual project timeline.
 */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartLine, faGavel, faUsers, faBug, faMobile, faGraduationCap,
  faExternalLinkAlt, faChevronDown, faLightbulb, faCogs, faTrophy,
  faPenNib, faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./ui/section-header";
import { Tag } from "./ui/tag";
import { ScrollFade, StaggerContainer, StaggerItem } from "./ui/scroll-fade";
import { TriangleShape, WavyLine, GradientMesh, ParallaxShape } from "./ui/abstract-shapes";

// Import generated images
import ethicsDashboard from "@/assets/portfolio-ethics-dashboard.jpg";
import governance from "@/assets/portfolio-governance.jpg";
import stakeholder from "@/assets/portfolio-stakeholder.jpg";
import biasDetection from "@/assets/portfolio-bias-detection.jpg";
import decisionFramework from "@/assets/portfolio-decision-framework.jpg";
import tutoring from "@/assets/portfolio-tutoring.jpg";

interface CaseStudy {
  problem: string;
  approach: string;
  outcome: string;
  metric?: string;
}

interface ProjectData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  icon: typeof faChartLine;
  caseStudy: CaseStudy;
  github?: string;
  live?: string;
}

const projects: ProjectData[] = [
  {
    title: "AI Ethics Dashboard",
    description: "Interactive platform for monitoring and auditing AI systems for fairness, transparency, and accountability metrics.",
    image: ethicsDashboard,
    tags: ["React", "Python", "Fairlearn"],
    icon: faChartLine,
    caseStudy: {
      problem: "Organizations lacked visibility into algorithmic bias across their ML pipelines, leading to compliance risks and reputational damage.",
      approach: "Built real-time monitoring dashboards using Fairlearn and custom fairness metrics, integrated with existing MLOps workflows via REST APIs.",
      outcome: "Enabled proactive bias detection before production deployment, reducing post-launch fairness incidents.",
      metric: "Reduced bias incidents by 40%"
    },
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "Governance Framework Tool",
    description: "Tool for organizations to create and implement AI governance policies with automated compliance checking.",
    image: governance,
    tags: ["Next.js", "TypeScript", "NIST AI RMF"],
    icon: faGavel,
    caseStudy: {
      problem: "Federal agencies struggled to translate NIST AI RMF requirements into actionable technical controls and documentation.",
      approach: "Developed a structured workflow tool mapping RMF categories to specific code patterns, tests, and documentation templates.",
      outcome: "Accelerated compliance documentation and reduced audit preparation time significantly.",
      metric: "Cut audit prep time by 60%"
    },
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "Stakeholder Mapping",
    description: "Visual tool for mapping stakeholder interests, power dynamics, and potential conflicts in tech deployment.",
    image: stakeholder,
    tags: ["React", "D3.js", "Force Graph"],
    icon: faUsers,
    caseStudy: {
      problem: "Complex AI deployments involve multiple stakeholders with competing interests, leading to project delays and scope conflicts.",
      approach: "Created interactive force-directed graphs to visualize stakeholder relationships, influence levels, and potential friction points.",
      outcome: "Improved cross-functional alignment and reduced stakeholder conflicts during AI rollouts.",
      metric: "Improved alignment by 35%"
    },
    github: "https://github.com"
  },
  {
    title: "Bias Detection API",
    description: "RESTful API service for detecting and measuring various types of bias in datasets and model outputs.",
    image: biasDetection,
    tags: ["Python", "FastAPI", "Scikit-learn"],
    icon: faBug,
    caseStudy: {
      problem: "Data science teams lacked standardized tools to measure demographic parity, equalized odds, and other fairness metrics during development.",
      approach: "Built a modular API supporting 12+ fairness metrics with clear documentation and integration guides for CI/CD pipelines.",
      outcome: "Enabled teams to catch bias issues early in the development lifecycle.",
      metric: "18% improvement in model fairness scores"
    },
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "Ethical Decision Framework",
    description: "Mobile-first application helping teams make ethical decisions under time pressure with structured frameworks.",
    image: decisionFramework,
    tags: ["React Native", "Firebase", "Ethics"],
    icon: faMobile,
    caseStudy: {
      problem: "Engineering teams faced ethical dilemmas without structured frameworks, leading to inconsistent decision-making under pressure.",
      approach: "Developed a mobile app with guided decision trees based on established ethical frameworks (IEEE, ACM) with scenario-based training.",
      outcome: "Standardized ethical decision-making across distributed teams.",
      metric: "90% team adoption rate"
    },
    github: "https://github.com"
  },
  {
    title: "AI Tutoring Platform",
    description: "AI-powered tutoring platform providing personalized learning experiences and academic support services.",
    image: tutoring,
    tags: ["React", "GPT-4", "Personalization"],
    icon: faGraduationCap,
    caseStudy: {
      problem: "Students lacked access to personalized, on-demand academic support that adapts to their learning pace and style.",
      approach: "Built an AI tutor using GPT-4 with custom prompting strategies, progress tracking, and adaptive difficulty scaling.",
      outcome: "Delivered scalable 1:1 tutoring experiences with measurable learning improvements.",
      metric: "25% improvement in test scores"
    },
    github: "https://github.com",
    live: "https://studii.lovable.app"
  }
];

// Blog/Writing section data
const blogInfo = {
  title: "AI Ethics & Design Philosophy",
  description: "Thoughts on building responsible AI systems, governance frameworks, and the intersection of technology and ethics.",
  links: [
    { label: "Medium", url: "https://medium.com/@yourusername", icon: faMedium },
    { label: "Substack", url: "https://yourusername.substack.com", icon: faPenNib },
  ]
};

interface ProjectCardProps {
  project: ProjectData;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      className="h-full"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex flex-col h-full overflow-hidden rounded-xl glass shadow-soft">
        {/* Image Container with hover zoom effect */}
        <div className="card-image-shine relative aspect-[16/10] overflow-hidden bg-muted group">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          {/* Category Icon Badge */}
          <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md">
            <FontAwesomeIcon 
              icon={project.icon} 
              className="text-primary text-sm" 
            />
          </div>
          {/* Metric Badge */}
          {project.caseStudy.metric && (
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-caption font-semibold shadow-md">
              {project.caseStudy.metric}
            </div>
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent opacity-65 transition-opacity duration-300 group-hover:opacity-80"
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col flex-1 p-card">
          <h3 className="text-subheading font-display font-semibold text-foreground leading-tight mb-element-sm">
            {project.title}
          </h3>

          <p className="text-body-sm text-muted-foreground leading-relaxed mb-card-sm line-clamp-2">
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

          {/* Expandable Case Study Section */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-element-sm text-body-sm font-medium text-primary hover:text-primary/80 transition-colors mb-element"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "Hide Details" : "View Case Study"}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-card-sm pt-element border-t border-border/50">
                  {/* Problem */}
                  <div className="flex gap-element-sm">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-destructive/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faLightbulb} className="w-3 h-3 text-destructive-foreground" />
                    </div>
                    <div>
                      <p className="text-caption font-semibold text-foreground mb-0.5">Challenge</p>
                      <p className="text-caption text-muted-foreground leading-relaxed">{project.caseStudy.problem}</p>
                    </div>
                  </div>
                  
                  {/* Approach */}
                  <div className="flex gap-element-sm">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCogs} className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-caption font-semibold text-foreground mb-0.5">Approach</p>
                      <p className="text-caption text-muted-foreground leading-relaxed">{project.caseStudy.approach}</p>
                    </div>
                  </div>
                  
                  {/* Outcome */}
                  <div className="flex gap-element-sm">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-secondary/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faTrophy} className="w-3 h-3 text-secondary" />
                    </div>
                    <div>
                      <p className="text-caption font-semibold text-foreground mb-0.5">Impact</p>
                      <p className="text-caption text-muted-foreground leading-relaxed">{project.caseStudy.outcome}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spacer to push button to bottom */}
          <div className="flex-1" />

          {/* Action Button */}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-element-sm w-full py-element px-card-sm text-body-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card rounded-md mt-card-sm"
              aria-label={`View ${project.title} project`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View Project</span>
              <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" aria-hidden="true" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function BlogSection() {
  return (
    <ScrollFade delay={0.2}>
      <motion.div 
        className="mt-container-lg p-card rounded-xl glass shadow-soft"
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-card">
          <div>
            <div className="flex items-center gap-element-sm mb-element-sm">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <FontAwesomeIcon icon={faPenNib} className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-subheading font-display font-semibold text-foreground">
                {blogInfo.title}
              </h3>
            </div>
            <p className="text-body-sm text-muted-foreground max-w-lg">
              {blogInfo.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-element">
            {blogInfo.links.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-element-sm px-4 py-2 rounded-md bg-muted hover:bg-muted/80 text-foreground text-body-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={link.icon} className="w-4 h-4" />
                <span>{link.label}</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 opacity-60" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </ScrollFade>
  );
}

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="relative py-section-sm md:py-section px-4 bg-muted/30 overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      {/* Abstract background elements with parallax */}
      <GradientMesh className="inset-0 w-full h-full" />
      <ParallaxShape speed={0.2} rotateAmount={10} className="w-24 h-24 top-20 right-[10%]">
        <TriangleShape className="w-full h-full opacity-50" />
      </ParallaxShape>
      <ParallaxShape speed={0.15} rotateAmount={-8} className="w-16 h-16 bottom-32 left-[5%]">
        <TriangleShape className="w-full h-full opacity-40 rotate-45" />
      </ParallaxShape>
      <ParallaxShape speed={0.1} className="w-full h-16 top-1/2 left-0">
        <WavyLine className="w-full h-full opacity-50" />
      </ParallaxShape>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <ScrollFade>
          <SectionHeader
            overline="Case Studies"
            title="Featured Work"
            description="Projects designed to solve real problems in AI ethics, governance, and responsible technology deployment."
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

        {/* Blog/Writing Section */}
        <BlogSection />
      </div>
    </section>
  );
};

export default Portfolio;
