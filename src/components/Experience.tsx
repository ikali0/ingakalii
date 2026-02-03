/**
 * Experience Section Component
 *
 * - Expandable experience cards
 * - Filters by role and year
 * - VerticalTimeline derived from same data (no duplication)
 */
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPersonWalkingLuggage,
  faBuilding,
  faShieldHalved,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Tag } from "./ui/tag";
import { RingShape, DotsPattern, ParallaxShape } from "./ui/abstract-shapes";
import { VerticalTimeline, type TimelineEntry } from "./ui/vertical-timeline";

/* ------------------------------------------------------------------ */
/* DATA — single source of truth                                       */
/* ------------------------------------------------------------------ */

interface ExperienceData {
  id: string;
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
  status: "complete" | "in-progress" | "pending";
  icon: any;
}

const experiences: ExperienceData[] = [
  {
    id: "ai-policy",
    title: "AI Policy Engineer",
    organization: "Independent Consultant",
    period: "Oct 2023 – Present",
    location: "Philadelphia, PA",
    description: "Leading AI consultancy delivering automation prototypes and compliance frameworks.",
    highlights: [
      "Built FERPA/Title IX compliance dashboards",
      "Converted policy frameworks into deployable controls",
      "Conducted NIST AI RMF feasibility assessments",
      "Developed GPT-4 and Claude compliance tools",
    ],
    tags: ["NIST AI RMF", "Compliance", "LLMs"],
    status: "in-progress",
    icon: faPersonWalkingLuggage,
  },
  {
    id: "pentest",
    title: "Penetration Tester",
    organization: "DIA & Lockheed Martin",
    period: "Nov 2024 – May 2025",
    location: "Washington, DC",
    description: "Executed penetration tests across federal networks.",
    highlights: [
      "Executed 12+ penetration tests",
      "Discovered 47 critical vulnerabilities",
      "Reduced security incidents by 30%",
    ],
    tags: ["Metasploit", "OSINT", "Threat Modeling"],
    status: "complete",
    icon: faShieldHalved,
  },
  {
    id: "consulting",
    title: "Consulting Analyst",
    organization: "Accenture Federal Services",
    period: "Jul 2021 – Oct 2024",
    location: "Washington, DC",
    description: "Optimized federal portfolios and compliance frameworks.",
    highlights: [
      "30% portfolio optimization",
      "Developed DLA compliance frameworks",
      "Designed energy.gov UX interfaces",
    ],
    tags: ["DoD", "Policy", "UX/UI"],
    status: "complete",
    icon: faBuilding,
  },
  {
    id: "sap",
    title: "Business Analyst",
    organization: "SAP SuccessFactors",
    period: "Dec 2019 – Mar 2021",
    location: "Newtown Square, PA",
    description: "ROI analysis and enterprise reporting.",
    highlights: ["25% operational efficiency improvement", "30% reduction in data retrieval time"],
    tags: ["ROI", "Data Analysis"],
    status: "complete",
    icon: faChartLine,
  },
];

/* ------------------------------------------------------------------ */
/* COMPONENT                                                          */
/* ------------------------------------------------------------------ */

const Experience = () => {
  const reduceMotion = useReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  /* ------------------ derived filter values ------------------ */

  const roles = useMemo(() => Array.from(new Set(experiences.map((e) => e.title))), []);

  const years = useMemo(() => {
    const allYears = experiences.flatMap((e) => e.period.match(/\d{4}/g) ?? []);
    return Array.from(new Set(allYears)).sort((a, b) => Number(b) - Number(a));
  }, []);

  /* ------------------ filtered experiences ------------------ */

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      const roleMatch = roleFilter === "all" || exp.title === roleFilter;
      const yearMatch = yearFilter === "all" || exp.period.includes(yearFilter);
      return roleMatch && yearMatch;
    });
  }, [roleFilter, yearFilter]);

  /* ------------------ derived timeline entries ------------------ */

  const timelineEntries: TimelineEntry[] = useMemo(() => {
    return filteredExperiences.map((exp) => {
      const years = exp.period.match(/\d{4}/g) ?? [];
      const startYear = years[0] ?? "";
      const endYear = exp.period.includes("Present") ? undefined : years[1];

      return {
        year: startYear,
        endYear,
        title: exp.title,
        organization: exp.organization,
        location: exp.location,
        description: exp.description,
        highlights: exp.highlights,
        tags: exp.tags,
        type: "career",
        icon: exp.icon,
        isCurrent: exp.status === "in-progress",
      };
    });
  }, [filteredExperiences]);

  return (
    <section id="experience" className="relative py-section px-4 bg-muted/30 overflow-hidden">
      {/* Background */}
      <ParallaxShape speed={0.15} className="w-40 h-40 -top-10 right-[10%]">
        <RingShape />
      </ParallaxShape>
      <ParallaxShape speed={0.1} className="w-48 h-48 bottom-10 -left-10">
        <DotsPattern className="opacity-40" />
      </ParallaxShape>

      <div className="container relative z-10 mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="mb-container"
        >
          <p className="text-overline text-accent font-semibold">Career</p>
          <h2 className="font-display text-display-sm md:text-display-md">Professional Experience</h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-container">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Cards */}
        <div className="space-y-card">
          {filteredExperiences.map((exp) => {
            const expanded = expandedId === exp.id;

            return (
              <motion.div key={exp.id} layout className="glass rounded-lg p-card">
                <div className="flex justify-between mb-element-sm">
                  <span className="text-caption text-primary">{exp.period}</span>
                  <span className="text-caption text-muted-foreground flex gap-1">
                    <FontAwesomeIcon icon={faLocationDot} />
                    {exp.location}
                  </span>
                </div>

                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-caption text-muted-foreground">{exp.organization}</p>

                <p className="text-caption mt-element-sm">{exp.description}</p>

                <button
                  onClick={() => setExpandedId(expanded ? null : exp.id)}
                  className="flex items-center gap-1 text-caption mt-element"
                >
                  {expanded ? "Less" : "More"}
                  <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
                    <ChevronDown className="w-3 h-3" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-element"
                    >
                      <ul className="space-y-2">
                        {exp.highlights.map((h) => (
                          <li key={h} className="text-sm">
                            • {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap gap-2 mt-element">
                  {exp.tags.map((tag) => (
                    <Tag key={tag} size="sm" variant="muted">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Derived Vertical Timeline */}
        <VerticalTimeline entries={timelineEntries} title="Career Journey" overline="Timeline" />
      </div>
    </section>
  );
};

export default Experience;
