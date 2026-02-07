/**
 * Portfolio Section Component
 * 
 * Enhanced case study cards with problem/approach/outcomes structure,
 * expandable details, and visual project timeline.
 */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faGavel, faUsers, faBug, faMobile, faGraduationCap, faExternalLinkAlt, faChevronDown, faLightbulb, faCogs, faTrophy } from "@fortawesome/free-solid-svg-icons";
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
/**
 * Impact Metric for case studies
 */
interface ImpactMetric {
  label: string;
  value: string;
  improvement?: string;
}

/**
 * Case Study structure with detailed problem/approach/outcome
 */
interface CaseStudy {
  problem: string;
  approach: string;
  outcome: string;
}

/**
 * Enhanced Project Data structure supporting detailed case studies
 */
interface ProjectData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  icon: typeof faChartLine;
  caseStudy: CaseStudy;
  /** Impact metrics with measurable outcomes */
  impactMetrics: ImpactMetric[];
  /** Tech stack used in the project */
  techStack: string[];
  github?: string;
  live?: string;
}
const projects: ProjectData[] = [{
  title: "AI Ethics Dashboard",
  description: "Interactive platform for monitoring and auditing AI systems for fairness, transparency, and accountability metrics.",
  image: ethicsDashboard,
  tags: ["React", "Python", "Fairlearn"],
  icon: faChartLine,
  techStack: ["React 18", "Python 3.11", "Fairlearn", "FastAPI", "PostgreSQL", "Docker"],
  impactMetrics: [{
    label: "Bias Incidents Reduced",
    value: "40%",
    improvement: "↓"
  }, {
    label: "Detection Speed",
    value: "3.2s",
    improvement: "↓ from 45s"
  }, {
    label: "Models Audited",
    value: "150+",
    improvement: ""
  }],
  caseStudy: {
    problem: "Organizations lacked visibility into algorithmic bias across their ML pipelines, leading to compliance risks and reputational damage.",
    approach: "Built real-time monitoring dashboards using Fairlearn and custom fairness metrics, integrated with existing MLOps workflows via REST APIs.",
    outcome: "Enabled proactive bias detection before production deployment, reducing post-launch fairness incidents."
  },
  github: "https://github.com"
}, {
  title: "Governance Framework Tool",
  description: "Tool for organizations to create and implement AI governance policies with automated compliance checking.",
  image: governance,
  tags: ["Next.js", "TypeScript", "NIST AI RMF"],
  icon: faGavel,
  techStack: ["Next.js 14", "TypeScript", "Prisma", "tRPC", "Tailwind CSS", "Vercel"],
  impactMetrics: [{
    label: "Audit Prep Time",
    value: "60%",
    improvement: "↓ reduction"
  }, {
    label: "Compliance Score",
    value: "94%",
    improvement: "↑ from 67%"
  }, {
    label: "Policy Templates",
    value: "45+",
    improvement: ""
  }],
  caseStudy: {
    problem: "Federal agencies struggled to translate NIST AI RMF requirements into actionable technical controls and documentation.",
    approach: "Developed a structured workflow tool mapping RMF categories to specific code patterns, tests, and documentation templates.",
    outcome: "Accelerated compliance documentation and reduced audit preparation time significantly."
  },
  github: "https://github.com"
}, {
  title: "Stakeholder Mapping",
  description: "Visual tool for mapping stakeholder interests, power dynamics, and potential conflicts in tech deployment.",
  image: stakeholder,
  tags: ["React", "D3.js", "Force Graph"],
  icon: faUsers,
  techStack: ["React", "D3.js", "Force Graph", "Node.js", "MongoDB", "AWS Lambda"],
  impactMetrics: [{
    label: "Alignment Improved",
    value: "35%",
    improvement: "↑"
  }, {
    label: "Conflict Resolution",
    value: "2.1x",
    improvement: "faster"
  }, {
    label: "Stakeholders Mapped",
    value: "500+",
    improvement: ""
  }],
  caseStudy: {
    problem: "Complex AI deployments involve multiple stakeholders with competing interests, leading to project delays and scope conflicts.",
    approach: "Created interactive force-directed graphs to visualize stakeholder relationships, influence levels, and potential friction points.",
    outcome: "Improved cross-functional alignment and reduced stakeholder conflicts during AI rollouts."
  },
  github: "https://github.com"
}, {
  title: "Bias Detection API",
  description: "RESTful API service for detecting and measuring various types of bias in datasets and model outputs.",
  image: biasDetection,
  tags: ["Python", "FastAPI", "Scikit-learn"],
  icon: faBug,
  techStack: ["Python", "FastAPI", "Scikit-learn", "NumPy", "Pandas", "Redis", "Kubernetes"],
  impactMetrics: [{
    label: "Fairness Score",
    value: "18%",
    improvement: "↑ improvement"
  }, {
    label: "Metrics Supported",
    value: "12+",
    improvement: ""
  }, {
    label: "API Latency",
    value: "< 200ms",
    improvement: "p99"
  }],
  caseStudy: {
    problem: "Data science teams lacked standardized tools to measure demographic parity, equalized odds, and other fairness metrics during development.",
    approach: "Built a modular API supporting 12+ fairness metrics with clear documentation and integration guides for CI/CD pipelines.",
    outcome: "Enabled teams to catch bias issues early in the development lifecycle."
  },
  github: "https://github.com"
}, {
  title: "Ethical Decision Framework",
  description: "Mobile-first application helping teams make ethical decisions under time pressure with structured frameworks.",
  image: decisionFramework,
  tags: ["React Native", "Firebase", "Ethics"],
  icon: faMobile,
  techStack: ["React Native", "Firebase", "Expo", "TypeScript", "Redux Toolkit"],
  impactMetrics: [{
    label: "Team Adoption",
    value: "90%",
    improvement: ""
  }, {
    label: "Decision Time",
    value: "40%",
    improvement: "↓ faster"
  }, {
    label: "Scenarios Trained",
    value: "200+",
    improvement: ""
  }],
  caseStudy: {
    problem: "Engineering teams faced ethical dilemmas without structured frameworks, leading to inconsistent decision-making under pressure.",
    approach: "Developed a mobile app with guided decision trees based on established ethical frameworks (IEEE, ACM) with scenario-based training.",
    outcome: "Standardized ethical decision-making across distributed teams."
  },
  github: "https://github.com"
}, {
  title: "AI Tutoring Platform",
  description: "AI-powered tutoring platform providing personalized learning experiences and academic support services.",
  image: tutoring,
  tags: ["React", "GPT-4", "Personalization"],
  icon: faGraduationCap,
  techStack: ["React", "GPT-4 API", "Supabase", "Tailwind CSS", "Vercel Edge"],
  impactMetrics: [{
    label: "Test Scores",
    value: "25%",
    improvement: "↑ improvement"
  }, {
    label: "Session Completion",
    value: "87%",
    improvement: ""
  }, {
    label: "Students Helped",
    value: "1,200+",
    improvement: ""
  }],
  caseStudy: {
    problem: "Students lacked access to personalized, on-demand academic support that adapts to their learning pace and style.",
    approach: "Built an AI tutor using GPT-4 with custom prompting strategies, progress tracking, and adaptive difficulty scaling.",
    outcome: "Delivered scalable 1:1 tutoring experiences with measurable learning improvements."
  },
  github: "https://github.com",
  live: "https://studii.lovable.app"
}];
interface ProjectCardProps {
  project: ProjectData;
}
function ProjectCard({
  project
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return <motion.article className="h-full touch-manipulation" whileHover={{
    scale: 1.01
  }} whileTap={{
    scale: 0.99
  }} transition={{
    type: "spring",
    stiffness: 400,
    damping: 25
  }}>
      <div className="flex flex-col h-full overflow-hidden rounded-lg glass shadow-soft border border-border/30">
        {/* Image Container with hover zoom effect */}
        <div className="card-image-shine relative aspect-[16/10] overflow-hidden bg-muted group">
          <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" />
          {/* Category Icon Badge */}
          <div className="absolute top-2 left-2 w-6 h-6 rounded bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <FontAwesomeIcon icon={project.icon} className="text-primary text-xs" />
          </div>
          {/* Primary Impact Metric Badge */}
          {project.impactMetrics[0] && <div className="absolute bottom-2 right-2 max-w-[70%] sm:max-w-none px-1.5 py-0.5 rounded bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-[0.625rem] font-medium shadow-sm truncate">
              {project.impactMetrics[0].label}: {project.impactMetrics[0].value}
            </div>}
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent transition-opacity duration-300 opacity-80" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col flex-1 p-3">
          <h3 className="text-body-sm font-display font-semibold text-foreground leading-tight mb-1">
            {project.title}
          </h3>

          <p className="text-[10px] px-1.5 py-[1px] border border-neutral-300 rounded-sm\n">
            {project.description}
          </p>

          {/* Category Tags */}
          
          
          {/* Tech Stack - Compact display */}
          <div className="text-[11px] text-muted-foreground leading-tight mb-2 line-clamp-2 flex items-center justify-center">
            {project.techStack.slice(0, 4).map(tech => <span key={tech} className="text-[0.625rem] px-1.5 py-0.5 rounded bg-accent-foreground text-secondary-foreground">
                {tech}
              </span>)}
            {project.techStack.length > 4 && <span className="text-[0.625rem] px-1.5 py-0.5 rounded text-slate-50 bg-secondary-foreground">
                +{project.techStack.length - 4}
              </span>}
          </div>

          {/* Expandable Case Study Section - touch-friendly button */}
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-[10px] px-1.5 py-[1px] border border-neutral-300 rounded-sm\n" aria-expanded={isExpanded}>
            <span>{isExpanded ? "Hide Details" : "View Case Study"}</span>
            <motion.div animate={{
            rotate: isExpanded ? 180 : 0
          }} transition={{
            duration: 0.2
          }}>
              <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-fuchsia-600" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: "auto",
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} transition={{
            duration: 0.25,
            ease: "easeInOut"
          }} className="overflow-hidden">
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
                  
                  {/* Impact Metrics Grid */}
                  <div className="mt-element pt-element border-t border-border/30">
                    <p className="text-caption font-semibold text-foreground mb-element-sm">Key Metrics</p>
                    <div className="grid grid-cols-3 gap-element-sm">
                      {project.impactMetrics.map(metric => <div key={metric.label} className="text-center p-2 rounded-md bg-muted/50">
                          <p className="text-body-sm font-bold text-primary">{metric.value}</p>
                          <p className="text-[0.625rem] text-muted-foreground leading-tight">{metric.label}</p>
                          {metric.improvement && <p className="text-[0.5625rem] text-secondary font-medium">{metric.improvement}</p>}
                        </div>)}
                    </div>
                  </div>
                  
                  {/* Full Tech Stack */}
                  <div className="mt-element">
                    <p className="text-caption font-semibold text-foreground mb-element-sm">Tech Stack</p>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map(tech => <span key={tech} className="text-[0.625rem] px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                          {tech}
                        </span>)}
                    </div>
                  </div>
                </div>
              </motion.div>}
          </AnimatePresence>

          {/* Spacer to push button to bottom */}
          

          {/* Action Button - touch-friendly sizing */}
          {project.live && <motion.a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-element-sm w-full text-body-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card rounded-md mt-card-sm min-h-[44px] touch-manipulation px-[6px] py-[6px] my-[10px]" aria-label={`View ${project.title} project`} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
              <span>View Project</span>
              <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" aria-hidden="true" />
            </motion.a>}
        </div>
      </div>
    </motion.article>;
}
const Portfolio = () => {
  return <section id="portfolio" className="relative py-section-sm md:py-section px-4 bg-muted/30 overflow-hidden" aria-labelledby="portfolio-heading">
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

      <div className="container relative z-10 mx-auto max-w-5xl">
        <ScrollFade>
          <SectionHeader overline="Case Studies" title="Featured Work" description="Projects designed to solve real problems in AI ethics, governance, and responsible technology deployment." />
        </ScrollFade>

        {/* Responsive Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
          {projects.map(project => <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>)}
        </StaggerContainer>
      </div>
    </section>;
};
export default Portfolio;