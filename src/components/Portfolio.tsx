/**
 * Portfolio Section Component
 * Cleaned, token-compliant, accessible.
 */

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChartLine,
  faGavel,
  faUsers,
  faBug,
  faMobile,
  faGraduationCap,
  faExternalLinkAlt,
  faChevronDown,
  faLightbulb,
  faCogs,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons"
import { motion, AnimatePresence } from "framer-motion"

import { SectionHeader } from "./ui/section-header"
import { ScrollFade, StaggerContainer, StaggerItem } from "./ui/scroll-fade"
import {
  TriangleShape,
  WavyLine,
  GradientMesh,
  ParallaxShape,
} from "./ui/abstract-shapes"

import ethicsDashboard from "@/assets/portfolio-ethics-dashboard.jpg"
import governance from "@/assets/portfolio-governance.jpg"
import stakeholder from "@/assets/portfolio-stakeholder.jpg"
import biasDetection from "@/assets/portfolio-bias-detection.jpg"
import decisionFramework from "@/assets/portfolio-decision-framework.jpg"
import tutoring from "@/assets/portfolio-tutoring.jpg"

/* ---------------- Types ---------------- */

interface ImpactMetric {
  label: string
  value: string
  improvement?: string
}

interface CaseStudy {
  problem: string
  approach: string
  outcome: string
}

interface ProjectData {
  title: string
  description: string
  image: string
  tags: string[]
  icon: any
  caseStudy: CaseStudy
  impactMetrics: ImpactMetric[]
  techStack: string[]
  github?: string
  live?: string
}

/* ---------------- Data ---------------- */

const projects: ProjectData[] = [
  {
    title: "AI Ethics Dashboard",
    description:
      "Interactive platform for monitoring and auditing AI systems.",
    image: ethicsDashboard,
    tags: ["React", "Python"],
    icon: faChartLine,
    techStack: ["React 18", "Python 3.11", "Fairlearn", "FastAPI"],
    impactMetrics: [
      { label: "Bias Incidents Reduced", value: "40%" },
      { label: "Detection Speed", value: "3.2s" },
      { label: "Models Audited", value: "150+" },
    ],
    caseStudy: {
      problem: "Lack of visibility into algorithmic bias.",
      approach: "Built real-time fairness dashboards.",
      outcome: "Reduced post-launch bias incidents.",
    },
  },
  {
    title: "Governance Framework Tool",
    description:
      "AI governance workflow system with compliance tracking.",
    image: governance,
    tags: ["Next.js", "TypeScript"],
    icon: faGavel,
    techStack: ["Next.js", "TypeScript", "Prisma"],
    impactMetrics: [
      { label: "Audit Prep Time", value: "60%" },
      { label: "Compliance Score", value: "94%" },
    ],
    caseStudy: {
      problem: "Translating NIST AI RMF into technical controls.",
      approach: "Mapped compliance to structured workflows.",
      outcome: "Accelerated audit preparation.",
    },
  },
]

/* ---------------- Card ---------------- */

function ProjectCard({ project }: { project: ProjectData }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      className="h-full"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex flex-col h-full rounded-lg glass shadow-soft border border-border/30 overflow-hidden">

        {/* Image */}
        <div className="relative aspect-[16/10] bg-muted group overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute top-2 left-2 w-6 h-6 rounded bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <FontAwesomeIcon icon={project.icon} className="text-primary text-xs" />
          </div>

          {project.impactMetrics[0] && (
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-xs font-medium shadow-sm">
              {project.impactMetrics[0].value}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-card">

          <h3 className="text-body font-display font-semibold text-center mb-2">
            {project.title}
          </h3>

          <p className="text-body-sm text-muted-foreground text-center mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* Tech preview */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="flex items-center justify-center gap-2 text-sm text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md"
          >
            {expanded ? "Hide Details" : "View Case Study"}

            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-4"
              >
                <div className="space-y-4 pt-4 border-t border-border/50">

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-md bg-destructive/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faLightbulb} className="w-3 h-3 text-destructive-foreground" />
                    </div>
                    <p className="text-caption text-muted-foreground">
                      {project.caseStudy.problem}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCogs} className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-caption text-muted-foreground">
                      {project.caseStudy.approach}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-md bg-secondary/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faTrophy} className="w-3 h-3 text-secondary" />
                    </div>
                    <p className="text-caption text-muted-foreground">
                      {project.caseStudy.outcome}
                    </p>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-md min-h-[44px] text-sm font-medium hover:bg-primary/90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Project
              <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

/* ---------------- Section ---------------- */

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative py-section-sm md:py-section px-4 bg-muted/30 overflow-hidden"
    >
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
          <SectionHeader
            overline="Case Studies"
            title="Featured Work"
            description="Projects solving real AI ethics and governance challenges."
          />
        </ScrollFade>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
