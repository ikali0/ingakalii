/**
 * Experience Section Component
 * 
 * Professional timeline with expandable cards, abstract shapes, and career timeline.
 */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faLocationDot, faPersonWalkingLuggage, faBuilding, faShieldHalved, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "./ui/tag";
import { RingShape, DotsPattern, ParallaxShape } from "./ui/abstract-shapes";
import { ProjectTimeline } from "./ui/project-timeline";

interface ExperienceData {
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
  status: "complete" | "in-progress" | "pending";
  icon: typeof faBriefcase;
}

const experiences: ExperienceData[] = [
  {
    title: "AI Policy Engineer",
    organization: "Independent Consultant",
    period: "Oct 2023 - Present",
    location: "Philadelphia, PA",
    description: "Leading AI consultancy delivering automation prototypes and compliance frameworks.",
    highlights: [
      "Built FERPA/Title IX compliance dashboards for multiple school districts",
      "Led 3 POC studies converting policy frameworks into deployable controls",
      "Conducted 5 NIST AI RMF feasibility assessments with technical specs",
      "Developed GPT-4 and Claude tools to extract regulatory requirements",
      "Integrated open-source LLMs, cutting infra costs by 40%"
    ],
    tags: ["NIST AI RMF", "GPT-4/Claude", "Compliance"],
    status: "in-progress",
    icon: faPersonWalkingLuggage
  },
  {
    title: "Penetration Tester",
    organization: "DIA & Lockheed Martin",
    period: "Nov 2024 - May 2025",
    location: "Washington, DC",
    description: "Executed penetration tests across federal networks, identifying critical vulnerabilities.",
    highlights: [
      "Executed 12+ penetration tests using Metasploit, Burp Suite, and Nmap",
      "Discovered 47 critical vulnerabilities with 48-hour SLA remediation",
      "Reduced security incidents by 30% through OSINT reconnaissance",
      "Briefed senior stakeholders on risk-prioritized action plans"
    ],
    tags: ["Metasploit", "OSINT", "Threat Modeling"],
    status: "complete",
    icon: faShieldHalved
  },
  {
    title: "Consulting Analyst",
    organization: "Accenture Federal Services",
    period: "Jul 2021 - Oct 2024",
    location: "Washington, DC",
    description: "Optimized federal project portfolios and developed compliance frameworks.",
    highlights: [
      "Optimized capital portfolios for DoD, achieving 30% improvement",
      "Developed robust compliance frameworks with DLA",
      "Designed user-centric interfaces for energy.gov",
      "Reduced operational costs by 15% through analysis"
    ],
    tags: ["DoD", "Policy", "UX/UI"],
    status: "complete",
    icon: faBuilding
  },
  {
    title: "Business Analyst",
    organization: "SAP SuccessFactors",
    period: "Dec 2019 - Mar 2021",
    location: "Newtown Square, PA",
    description: "Created ROI reports and analyzed customer data for strategic decisions.",
    highlights: [
      "Created ROI reports for budget allocations and planning",
      "Improved operational efficiency by 25% through data analysis",
      "Achieved 30% reduction in data retrieval time"
    ],
    tags: ["Data Analysis", "ROI", "Process Optimization"],
    status: "complete",
    icon: faChartLine
  }
];

const getStatusStyles = (status: "complete" | "in-progress" | "pending") => {
  switch (status) {
    case "complete":
      return "bg-secondary border-secondary";
    case "in-progress":
      return "bg-primary border-primary animate-pulse";
    case "pending":
      return "bg-muted border-border";
  }
};

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="relative py-section-sm md:py-section px-4 bg-muted/30 overflow-hidden">
      {/* Abstract background shapes with parallax */}
      <ParallaxShape speed={0.2} rotateAmount={12} className="w-40 h-40 -top-10 right-[10%]">
        <RingShape className="w-full h-full" />
      </ParallaxShape>
      <ParallaxShape speed={0.1} className="w-48 h-48 bottom-10 -left-10">
        <DotsPattern className="w-full h-full opacity-40" />
      </ParallaxShape>

      <div className="container relative z-10 mx-auto max-w-3xl">
        {/* Section Header */}
        <motion.div
          className="mb-container md:mb-container-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-overline uppercase text-accent font-semibold mb-element-sm">
            Career
          </p>
          <h2 className="font-display text-display-sm md:text-display-md text-foreground">
            Professional Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line - adjusted for mobile */}
          <div
            className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 rounded-full"
            style={{
              background: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--primary)) 100%)",
              boxShadow: "0 0 8px hsl(var(--primary) / 0.3)"
            }}
          />

          <div className="space-y-card-sm md:space-y-card">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="relative pl-10 md:pl-0"
              >
                {/* Timeline Node - properly aligned for mobile */}
                <motion.div
                  className={`absolute left-1.5 md:left-1/2 top-4 w-3 h-3 rounded-full md:-translate-x-1/2 z-10 ${getStatusStyles(exp.status)}`}
                  style={{
                    boxShadow: exp.status === "in-progress"
                      ? "0 0 10px hsl(var(--primary)), inset 0 -1px 2px rgba(0,0,0,0.2)"
                      : "0 0 6px hsl(var(--secondary) / 0.4), inset 0 -1px 2px rgba(0,0,0,0.2)"
                  }}
                  whileHover={{ scale: 1.3 }}
                >
                  <div className="absolute inset-0.5 rounded-full bg-background/30" />
                </motion.div>

                {/* Connector Line */}
                <div
                  className={`hidden md:block absolute top-card-sm w-card-sm h-px ${
                    index % 2 === 0 ? "left-1/2 ml-element-sm" : "right-1/2 mr-element-sm"
                  }`}
                  style={{ background: "hsl(var(--primary) / 0.3)" }}
                />

                {/* Card Container */}
                <div className={`md:w-[calc(50%-1.5rem)] ${index % 2 === 0 ? "md:ml-auto md:pl-card" : "md:mr-auto md:pr-card"}`}>
                  <motion.div
                    className="relative glass rounded-lg overflow-hidden cursor-pointer"
                    style={{
                      boxShadow: "0 4px 12px -4px hsl(var(--primary) / 0.1), inset 0 1px 0 rgba(255,255,255,0.06)"
                    }}
                    whileHover={{
                      y: -2,
                      scale: 1.01,
                      boxShadow: "0 8px 20px -6px hsl(var(--primary) / 0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
                    }}
                    onClick={() => toggleExpand(index)}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="p-card">
                      {/* Header Row */}
                      <div className="flex items-center justify-between gap-element-sm mb-element-sm">
                        <div className="flex items-center gap-element-sm">
                          <div className="p-1 rounded bg-primary/10">
                            <FontAwesomeIcon icon={exp.icon} className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-caption font-medium text-primary">
                            {exp.period}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-caption text-muted-foreground">
                          <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" />
                          <span className="hidden sm:inline text-justify text-xs font-light">
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Title & Org */}
                      <h3 className="text-body-sm md:text-body font-semibold text-foreground leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-caption text-muted-foreground mb-element-sm">
                        {exp.organization}
                      </p>

                      {/* Description */}
                      <p className="text-caption leading-relaxed mb-element text-foreground/80 md:text-xs">
                        {exp.description}
                      </p>

                      {/* Expand Button */}
                      <button
                        className="flex items-center gap-1 text-caption text-muted-foreground hover:text-foreground transition-colors mb-element"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(index);
                        }}
                      >
                        <span>{expandedIndex === index ? "Less" : "More"}</span>
                        <motion.div
                          animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </motion.div>
                      </button>

                      {/* Expandable Highlights */}
                      <AnimatePresence>
                        {expandedIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <ul className="space-y-element-sm mb-card-sm">
                              {exp.highlights.map((highlight, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="text-body-sm text-muted-foreground flex items-start gap-element-sm"
                                >
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Tags */}
                      <div className="flex-wrap flex items-start justify-center gap-element-sm">
                        {exp.tags.map((tag) => (
                          <motion.div key={tag} whileHover={{ scale: 1.1 }}>
                            <Tag variant="muted" size="sm">
                              {tag}
                            </Tag>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Career Timeline */}
        <ProjectTimeline />
      </div>
    </section>
  );
};

export default Experience;
