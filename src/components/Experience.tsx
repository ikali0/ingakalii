import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonWalkingLuggage,
  faShieldHalved,
  faBuilding,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

/* ------------------------------------------------------------------ */
/* DATA                                                               */
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
  status: "complete" | "in-progress";
  icon: any;
}

const experiences: ExperienceData[] = [
  {
    id: "ai-policy",
    title: "AI Policy Engineer",
    organization: "Independent Consultant",
    period: "2023 – Present",
    location: "Philadelphia, PA",
    description:
      "Leading AI consultancy delivering automation prototypes and compliance frameworks.",
    highlights: [
      "Built FERPA/Title IX dashboards",
      "Converted policy frameworks into deployable controls",
      "NIST AI RMF feasibility assessments",
      "Developed GPT-4 & Claude compliance tools",
    ],
    tags: ["NIST AI RMF", "Compliance", "LLMs"],
    status: "in-progress",
    icon: faPersonWalkingLuggage,
  },
  {
    id: "pentest",
    title: "Penetration Tester",
    organization: "DIA & Lockheed Martin",
    period: "2024 – 2025",
    location: "Washington, DC",
    description: "Executed penetration tests across federal networks.",
    highlights: [
      "12+ penetration tests",
      "47 critical vulnerabilities discovered",
      "Reduced incidents by 30%",
    ],
    tags: ["Metasploit", "OSINT", "Threat Modeling"],
    status: "complete",
    icon: faShieldHalved,
  },
  {
    id: "consulting",
    title: "Consulting Analyst",
    organization: "Accenture Federal Services",
    period: "2021 – 2024",
    location: "Washington, DC",
    description: "Optimized federal portfolios and compliance frameworks.",
    highlights: [
      "30% portfolio optimization",
      "DLA compliance frameworks",
      "Energy.gov UX interfaces",
    ],
    tags: ["DoD", "Policy", "UX/UI"],
    status: "complete",
    icon: faBuilding,
  },
  {
    id: "sap",
    title: "Business Analyst",
    organization: "SAP SuccessFactors",
    period: "2019 – 2021",
    location: "Pennsylvania",
    description: "Enterprise analytics & reporting systems.",
    highlights: [
      "25% operational efficiency improvement",
      "30% faster data retrieval",
    ],
    tags: ["ROI", "Data Analysis"],
    status: "complete",
    icon: faChartLine,
  },
];

/* ------------------------------------------------------------------ */
/* COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...experiences].sort(
        (a, b) =>
          Number(b.period.slice(0, 4)) -
          Number(a.period.slice(0, 4))
      ),
    []
  );

  return (
    <section
      id="experience"
      className="relative py-16 sm:py-20 px-4 bg-muted/20"
    >
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="mb-12"
        >
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
            Experience
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
            Career Timeline
          </h2>
        </motion.div>

        {/* Timeline Wrapper */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-border/40" />

          <div className="space-y-10">

            {sorted.map((exp, index) => {
              const isExpanded = expanded === exp.id;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative flex flex-col sm:flex-row sm:items-start"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2
                                  w-6 h-6 rounded-full
                                  bg-primary shadow-lg
                                  flex items-center justify-center z-10">
                    <FontAwesomeIcon
                      icon={exp.icon}
                      className="text-white text-xs"
                    />
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      rotateX: 2,
                      rotateY: -2,
                      scale: 1.01,
                    }}
                    style={{ perspective: 1000 }}
                    className="ml-10 sm:ml-0 sm:w-1/2
                               sm:odd:pr-10 sm:even:pl-10
                               sm:odd:text-right
                               rounded-2xl border border-border/40
                               bg-white/50 dark:bg-white/[0.05]
                               backdrop-blur-xl
                               shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]
                               p-5 sm:p-6"
                  >
                    <div
                      onClick={() =>
                        setExpanded(isExpanded ? null : exp.id)
                      }
                      className="cursor-pointer"
                    >
                      <p className="text-xs text-muted-foreground">
                        {exp.period}
                      </p>

                      <h3 className="font-medium text-base mt-1">
                        {exp.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {exp.organization}
                      </p>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4"
                        >
                          <p className="text-sm text-muted-foreground mb-3">
                            {exp.description}
                          </p>

                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {exp.highlights.map((h, i) => (
                              <li key={i}>
                                • {h}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <ChevronDown
                      className={`mt-3 w-4 h-4 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
