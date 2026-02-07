import { useMemo, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
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
  description: string;
  highlights: string[];
  status: "complete" | "in-progress";
  icon: any;
}

const experiences: ExperienceData[] = [
  {
    id: "ai-policy",
    title: "AI Policy Engineer",
    organization: "Independent Consultant",
    period: "2023 – Present",
    description:
      "Leading AI consultancy delivering automation prototypes and compliance frameworks.",
    highlights: [
      "NIST AI RMF assessments",
      "Compliance dashboards",
      "LLM governance systems",
    ],
    status: "in-progress",
    icon: faPersonWalkingLuggage,
  },
  {
    id: "pentest",
    title: "Penetration Tester",
    organization: "DIA & Lockheed Martin",
    period: "2024 – 2025",
    description: "Executed federal penetration testing engagements.",
    highlights: [
      "12+ penetration tests",
      "47 critical vulnerabilities",
    ],
    status: "complete",
    icon: faShieldHalved,
  },
  {
    id: "consulting",
    title: "Consulting Analyst",
    organization: "Accenture Federal Services",
    period: "2021 – 2024",
    description: "Federal portfolio optimization & compliance design.",
    highlights: ["30% portfolio optimization"],
    status: "complete",
    icon: faBuilding,
  },
  {
    id: "sap",
    title: "Business Analyst",
    organization: "SAP SuccessFactors",
    period: "2019 – 2021",
    description: "Enterprise analytics systems.",
    highlights: ["25% operational efficiency gain"],
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
  const containerRef = useRef(null);

  /* ---------------- Scroll Progress ---------------- */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  /* ---------------- Sort Data ---------------- */

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
      ref={containerRef}
      className="relative py-20 px-4 bg-muted/20 overflow-hidden"
    >
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
            Experience
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
            Career Timeline
          </h2>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative">

          {/* Static Line */}
          <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2
                          top-0 bottom-0 w-[2px] bg-border/40" />

          {/* Animated Progress Line */}
          <motion.div
            style={{ height: progressHeight }}
            className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2
                       top-0 w-[2px] bg-primary"
          />

          <div className="space-y-16">

            {sorted.map((exp, index) => {
              const isExpanded = expanded === exp.id;
              const isCurrent = exp.status === "in-progress";

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col sm:flex-row sm:items-start"
                >
                  {/* Floating Year Marker */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="absolute -left-2 sm:left-1/2 sm:-translate-x-1/2
                               -top-6 text-xs font-medium text-muted-foreground"
                  >
                    {exp.period}
                  </motion.div>

                  {/* Timeline Dot */}
                  <motion.div
                    animate={
                      isCurrent
                        ? { scale: [1, 1.2, 1] }
                        : undefined
                    }
                    transition={
                      isCurrent
                        ? { repeat: Infinity, duration: 2 }
                        : undefined
                    }
                    className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2
                               w-6 h-6 rounded-full
                               bg-primary
                               shadow-lg flex items-center justify-center z-10"
                  >
                    <FontAwesomeIcon
                      icon={exp.icon}
                      className="text-white text-xs"
                    />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      rotateX: 3,
                      rotateY: -3,
                      scale: 1.02,
                    }}
                    style={{ perspective: 1200 }}
                    className="ml-10 sm:ml-0 sm:w-1/2
                               sm:odd:pr-10 sm:even:pl-10
                               rounded-2xl border border-border/40
                               bg-white/50 dark:bg-white/[0.05]
                               backdrop-blur-xl
                               shadow-[0_15px_40px_-15px_rgba(0,0,0,0.25)]
                               p-6"
                  >
                    <div
                      onClick={() =>
                        setExpanded(isExpanded ? null : exp.id)
                      }
                      className="cursor-pointer"
                    >
                      <h3 className="font-medium text-base">
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
                              <li key={i}>• {h}</li>
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

        {/* Mobile Horizontal Swipe */}
        <div className="mt-16 sm:hidden overflow-x-auto flex gap-6 pb-4">
          {sorted.map((exp) => (
            <div
              key={exp.id}
              className="min-w-[250px] rounded-xl border border-border/40
                         bg-card p-4 shadow-md"
            >
              <h4 className="text-sm font-medium">{exp.title}</h4>
              <p className="text-xs text-muted-foreground">
                {exp.period}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
