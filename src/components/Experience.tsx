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
const experiences: ExperienceData[] = [{
  title: "AI Policy Engineer",
  organization: "Independent Consultant",
  period: "Oct 2023 - Present",
  location: "Philadelphia, PA",
  description: "Leading AI consultancy delivering automation prototypes and compliance frameworks.",
  highlights: ["Built FERPA/Title IX compliance dashboards for multiple school districts", "Led 3 POC studies converting policy frameworks into deployable controls", "Conducted 5 NIST AI RMF feasibility assessments with technical specs", "Developed GPT-4 and Claude tools to extract regulatory requirements", "Integrated open-source LLMs, cutting infra costs by 40%"],
  tags: ["NIST AI RMF", "GPT-4/Claude", "Compliance"],
  status: "in-progress"
}, {
  title: "Penetration Tester",
  organization: "DIA & Lockheed Martin",
  period: "Nov 2024 - May 2025",
  location: "Washington, DC",
  description: "Executed penetration tests across federal networks, identifying critical vulnerabilities.",
  highlights: ["Executed 12+ penetration tests using Metasploit, Burp Suite, and Nmap", "Discovered 47 critical vulnerabilities with 48-hour SLA remediation", "Reduced security incidents by 30% through OSINT reconnaissance", "Briefed senior stakeholders on risk-prioritized action plans"],
  tags: ["Metasploit", "OSINT", "Threat Modeling"],
  status: "complete"
}, {
  title: "Consulting Analyst",
  organization: "Accenture Federal Services",
  period: "Jul 2021 - Oct 2024",
  location: "Washington, DC",
  description: "Optimized federal project portfolios and developed compliance frameworks.",
  highlights: ["Optimized capital portfolios for DoD, achieving 30% improvement", "Developed robust compliance frameworks with DLA", "Designed user-centric interfaces for energy.gov", "Reduced operational costs by 15% through analysis"],
  tags: ["DoD", "Policy", "UX/UI"],
  status: "complete"
}, {
  title: "Business Analyst",
  organization: "SAP SuccessFactors",
  period: "Dec 2019 - Mar 2021",
  location: "Newtown Square, PA",
  description: "Created ROI reports and analyzed customer data for strategic decisions.",
  highlights: ["Created ROI reports for budget allocations and planning", "Improved operational efficiency by 25% through data analysis", "Achieved 30% reduction in data retrieval time"],
  tags: ["Data Analysis", "ROI", "Process Optimization"],
  status: "complete"
}];
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
  return <section id="experience" className="py-10 md:py-16 px-3 md:px-4 bg-slate-50">
      <div className="container mx-auto max-w-3xl">
        {/* Section Header */}
        <motion.div className="mb-6 md:mb-8" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }}>
          <p className="text-[9px] md:text-xs uppercase tracking-widest font-medium mb-1.5 text-primary">
            Career
          </p>
          <h2 className="font-display text-lg md:text-2xl font-medium text-foreground mb-1.5">
            Professional Experience
          </h2>
          <p className="text-[10px] md:text-sm text-muted-foreground max-w-md">
            Building secure, compliant, and impactful AI systems.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2" style={{
          background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--primary)) 100%)',
          boxShadow: '0 0 8px hsl(var(--primary) / 0.3)',
          borderRadius: '9999px'
        }} />

          <div className="space-y-3 md:space-y-4">
            {experiences.map((exp, index) => <motion.div key={index} initial={{
            opacity: 0,
            x: -15
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true,
            margin: "-20px"
          }} transition={{
            duration: 0.3,
            delay: index * 0.06
          }} className="relative pl-6 md:pl-0">
                {/* Timeline Node */}
                <motion.div className={`absolute left-0.5 md:left-1/2 top-2.5 w-3 h-3 rounded-full md:-translate-x-1/2 z-10 ${getStatusStyles(exp.status)}`} style={{
              boxShadow: exp.status === 'in-progress' ? '0 0 10px hsl(var(--primary)), inset 0 -1px 2px rgba(0,0,0,0.2)' : '0 0 6px hsl(var(--secondary) / 0.4), inset 0 -1px 2px rgba(0,0,0,0.2)'
            }} whileHover={{
              scale: 1.3
            }}>
                  <div className="absolute inset-0.5 rounded-full bg-white/30" />
                </motion.div>

                {/* Connector Line */}
                <div className={`hidden md:block absolute top-3.5 w-4 h-px ${index % 2 === 0 ? 'left-1/2 ml-1.5' : 'right-1/2 mr-1.5'}`} style={{
              background: 'hsl(var(--primary) / 0.3)'
            }} />

                {/* Card Container */}
                <div className={`md:w-[calc(50%-1rem)] ${index % 2 === 0 ? 'md:ml-auto md:pl-4' : 'md:mr-auto md:pr-4'}`}>
                  {/* Notebook-style Card */}
                  <motion.div className="relative bg-card border border-border rounded-md overflow-hidden cursor-pointer" style={{
                boxShadow: '0 4px 12px -4px hsl(var(--primary) / 0.1), inset 0 1px 0 rgba(255,255,255,0.06)'
              }} whileHover={{
                y: -2,
                boxShadow: '0 8px 20px -6px hsl(var(--primary) / 0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
              }} onClick={() => toggleExpand(index)} transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}>
                    {/* Notebook spiral binding */}
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 md:w-3 bg-muted/50 border-r border-border/60 flex flex-col justify-around py-1.5">
                      {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-border mx-auto" />)}
                    </div>

                    {/* Content with notebook lines */}
                    <div className="ml-2.5 md:ml-3 p-2 md:p-3" style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 13px, hsl(var(--border) / 0.2) 13px, hsl(var(--border) / 0.2) 14px)',
                  backgroundSize: '100% 14px'
                }}>
                      {/* Header Row */}
                      <div className="flex items-center justify-between gap-1.5 mb-1.5">
                        <div className="flex items-center gap-1">
                          <div className="p-0.5 rounded bg-primary/10">
                            <Briefcase className="h-2 w-2 md:h-2.5 md:w-2.5 text-primary" />
                          </div>
                          <span className="text-[8px] md:text-[10px] font-medium text-primary">
                            {exp.period}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 text-[7px] md:text-[9px] text-muted-foreground">
                          <MapPin className="w-2 h-2" />
                          <span className="hidden xs:inline">{exp.location}</span>
                        </div>
                      </div>

                      {/* Title & Org */}
                      <h3 className="text-[10px] md:text-xs font-medium text-foreground leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-[8px] md:text-[10px] text-muted-foreground mb-1.5">{exp.organization}</p>

                      {/* Description */}
                      <p className="text-[8px] md:text-[10px] leading-relaxed mb-1.5 text-purple-700">
                        {exp.description}
                      </p>

                      {/* Expand Button */}
                      <button className="flex items-center gap-0.5 text-[8px] md:text-[9px] transition-colors mb-1.5 text-black" onClick={e => {
                    e.stopPropagation();
                    toggleExpand(index);
                  }}>
                        <span>{expandedIndex === index ? 'Less' : 'More'}</span>
                        <motion.div animate={{
                      rotate: expandedIndex === index ? 180 : 0
                    }} transition={{
                      duration: 0.2
                    }}>
                          <ChevronDown className="w-2.5 h-2.5" />
                        </motion.div>
                      </button>

                      {/* Expandable Highlights */}
                      <AnimatePresence>
                        {expandedIndex === index && <motion.div initial={{
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
                            <ul className="space-y-1 mb-2">
                              {exp.highlights.map((highlight, i) => <motion.li key={i} initial={{
                          opacity: 0,
                          x: -10
                        }} animate={{
                          opacity: 1,
                          x: 0
                        }} transition={{
                          delay: i * 0.05
                        }} className="text-[10px] md:text-xs text-muted-foreground flex items-start gap-1.5">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{highlight}</span>
                                </motion.li>)}
                            </ul>
                          </motion.div>}
                      </AnimatePresence>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {exp.tags.map(tag => <span key={tag} className="px-1 py-0.5 bg-muted text-[7px] md:text-[8px] rounded border border-border/40 text-purple-900">
                            {tag}
                          </span>)}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Experience;