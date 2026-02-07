/**
 * Portfolio Section Component
 * Clean, token-based, accessible, and production-ready.
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
      "Interactive platform for monitoring and auditing AI systems for fairness, transparency, and accountability metrics.",
    image: ethicsDashboard,
    tags: ["React", "Python", "Fairlearn"],
    icon: faChartLine,
    techStack: [
      "React 18",
      "Python 3.11",
      "Fairlearn",
      "FastAPI",
      "PostgreSQL",
      "Docker",
    ],
    impactMetrics: [
      { label: "Bias Incidents Reduced", value: "40%", improvement: "↓" },
      { label: "Detection Speed", value: "3.2s", improvement: "↓ from 45s" },
      { label: "Models Audited", value: "150+" },
    ],
    caseStudy: {
      problem:
        "Organizations lacked visibility into algorithmic bias across ML pipelines.",
      approach:
        "Built real-time monitoring dashboards using Fairlearn integrated into MLOps workflows.",
      outcome:
        "Enabled proactive bias detection before production deployment.",
    },
    github: "https://github.com",
  },
  {
    title: "Governance Framework Tool",
    description:
      "Tool for organizations to create and implement AI governance policies.",
    image: governance,
    tags: ["Next.js", "TypeScript"],
    icon: faGavel,
    techStack: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "tRPC",
      "Tailwind",
    ],
    impactMetrics: [
      { label: "Audit Prep Time", value: "60%", improvement: "↓" },
      { label: "Compliance Score", value: "94%", improvement: "↑" },
      { label: "Templates", value: "45+" },
    ],
    caseStudy: {
      problem:
        "Agencies struggled to translate NIST AI RMF requirements into technical controls.",
      approach:
        "Developed structured workflows mapping RMF categories to implementation steps.",
      outcome:
        "Accelerated compliance documentation significantly.",
    },
    github: "https://github.com",
  },
]

/* ---------------- Helper Component ---------------- */

interface CaseBlockProps {
  icon: any
  title: string
  text: string
  variant: "primary" | "secondary" | "destructive"
}

function CaseBlock({ icon, title, text, variant }: CaseBlockProps) {
  const variantStyles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    destructive: "bg-destructive/10 text-destructive-foreground",
  }

  return (
    <div className="flex gap-3">
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center ${variantStyles[variant]}`}
      >
        <FontAwesomeIcon icon={icon} className="w-3 h-3" />
      </div>
      <div>
        <p className="text-caption font-semibold mb-1">{title}</p>
        <p className="text-caption text-muted-foreground leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  )
}

/* ---------------- Project Card ---------------- */

function ProjectCard({ project }: { project: ProjectData }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      className="h-full"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex flex-col h-full rounded-lg glass border border-border/30 shadow-soft overflow-hidden">

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
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-card">

          <h3 className="text-body font-display font-semibold text-center mb-1">
            {project.title}
          </h3>

          <p className="text-body-sm text-muted-foreground text-center mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Preview */}
          <div className="flex flex-wrap gap-1 justify-center mb-3">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center gap-2 text-sm text-primary font-medium"
            aria-expanded={expanded}
          >
            {expanded ? "Hide Details" : "View Case Study"}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
            </motion.div>
          </button>

          {/* Expandable */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-3"
              >
                <div className="space-y-4 pt-3 border-t border-border/50">

                  <CaseBlock
                    icon={faLightbulb}
                    title="Challenge"
                    text={project.caseStudy.problem}
                    variant="destructive"
                  />

                  <CaseBlock
                    icon={faCogs}
                    title="Approach"
                    text={project.caseStudy.approach}
                    variant="primary"
                  />

                  <CaseBlock
                    icon={faTrophy}
                    title="Impact"
                    text={project.caseStudy.outcome}
                    variant="secondary"
                  />

                  <div>
                    <p className="text-caption font-semibold mb-2">
                      Key Metrics
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {project.impactMetrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="text-center p-2 rounded-md bg-muted/50"
                        >
                          <p className="text-body font-bold text-primary">
                            {metric.value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live Button */}
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
      className="py-section-sm md:py-section bg-muted/30"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
