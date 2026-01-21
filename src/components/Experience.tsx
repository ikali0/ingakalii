import { useState } from "react";
import { Briefcase, MapPin, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceData {
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
  status: "complete" | "in-progress" | "pending";
}

const experiences: ExperienceData[] = [
  {
    title: "AI Policy Engineer",
    organization: "Independent Consultant",
    period: "Oct 2023 - Present",
    location: "Philadelphia, PA",
    [cite_start]description: "Leading AI consultancy delivering automation prototypes and compliance frameworks[cite: 5, 9].",
    highlights: [
      [cite_start]"Built FERPA/Title IX compliance dashboards for multiple school districts [cite: 8, 15]",
      [cite_start]"Led 3 POC studies converting policy frameworks into deployable controls [cite: 10, 17]",
      [cite_start]"Conducted 5 NIST AI RMF feasibility assessments with technical specs [cite: 12, 19]",
      [cite_start]"Developed GPT-4 and Claude tools to extract regulatory requirements [cite: 11, 18]",
      [cite_start]"Integrated open-source LLMs (Llama, Mistral), cutting infra costs by 40% [cite: 14, 20]"
    ],
    tags: ["NIST AI RMF", "GPT-4/Claude", "Compliance"],
    status: "in-progress"
  },
  {
    title: "Penetration Tester",
    organization: "DIA & Lockheed Martin",
    period: "Nov 2024 - May 2025",
    location: "Washington, DC",
    [cite_start]description: "Executed penetration tests across federal networks, identifying critical vulnerabilities[cite: 25, 28].",
    highlights: [
      [cite_start]"Executed 12+ penetration tests using Metasploit, Burp Suite, and Nmap [cite: 28, 32]",
      [cite_start]"Discovered 47 critical vulnerabilities with 48-hour SLA remediation [cite: 29, 33]",
      [cite_start]"Reduced security incidents by 30% through OSINT reconnaissance [cite: 30, 33]",
      [cite_start]"Briefed senior stakeholders on risk-prioritized action plans [cite: 31, 33]"
    ],
    tags: ["Metasploit", "OSINT", "Threat Modeling"],
    status: "complete"
  },
  {
    title: "Consulting Analyst",
    organization: "Accenture Federal Services",
    period: "Jul 2021 - Oct 2024",
    location: "Washington, DC",
    [cite_start]description: "Optimized federal project portfolios and developed compliance frameworks[cite: 34, 37].",
    highlights: [
      [cite_start]"Optimized capital portfolios for DoD, achieving 30% improvement [cite: 37, 42]",
      [cite_start]"Developed robust compliance frameworks with DLA [cite: 38, 43]",
      [cite_start]"Designed user-centric interfaces for energy.gov [cite: 40, 46]",
      [cite_start]"Reduced operational costs by 15% through analysis [cite: 41, 47]"
    ],
    tags: ["DoD", "Policy", "UX/UI"],
    status: "complete"
  },
  {
    title: "Business Analyst",
    organization: "SAP SuccessFactors",
    period: "Dec 2019 - Mar 2021",
    location: "Newtown Square, PA",
    [cite_start]description: "Created ROI reports and analyzed customer data for strategic decisions[cite: 52, 53].",
    highlights: [
      [cite_start]"Created ROI reports for budget allocations and planning [cite: 53, 56]",
      [cite_start]"Improved operational efficiency by 25% through data analysis [cite: 54, 57]",
      [cite_start]"Achieved 30% reduction in data retrieval time [cite: 55, 57]"
    ],
    tags: ["Data Analysis", "ROI", "Process Optimization"],
    status: "complete"
  }
];

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-12 md:py-20 bg-slate-50">
      {/* Container: max-w-prose prevents text from stretching too wide on desktop */}
      <div className="container mx-auto max-w-prose px-4">
        
        {/* Section Header */}
        <header className="mb-10 text-left">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-2">Career</p>
          <h2 className="text-2xl font-bold text-black md:text-3xl mb-3">Professional Experience</h2>
          <p className="text-sm leading-relaxed text-slate-600 md:text-base">
            Building secure, compliant, and impactful AI systems.
          </p>
        </header>

        {/* Timeline List */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative border-l-2 border-slate-200 pl-6 ml-2"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white shadow-sm ${
                exp.status === 'in-progress' ? 'bg-blue-600 animate-pulse' : 'bg-slate-400'
              }`} />

              {/* Card Content */}
              <div className="group cursor-pointer" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-tight">{exp.period}</span>
                  <div className="flex items-center text-xs text-slate-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {exp.location}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-black md:text-xl leading-snug group-hover:text-blue-700 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-sm font-medium text-slate-700 mb-2">{exp.organization}</p>
                
                <p className="text-sm leading-relaxed text-slate-600 md:text-base mb-3 line-clamp-3">
                  {exp.description}
                </p>

                {/* Expandable Section */}
                <button className="flex items-center text-sm font-bold text-blue-600 mb-4">
                  {expandedIndex === index ? "View Less" : "View Achievements"}
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${expandedIndex === index ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.ul 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 overflow-hidden border-t border-slate-100 pt-4 pb-2"
                    >
                      {exp.highlights.map((item, i) => (
                        <li key={i} className="text-sm leading-relaxed text-slate-700 md:text-base flex gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-200/50 text-slate-600 text-[10px] md:text-xs font-bold rounded uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
