import { useState } from "react";
import { motion } from "framer-motion";
interface Skill {
  name: string;
  level: number;
  examples: string[];
}
interface SkillCategory {
  category: string;
  skills: Skill[];
}
const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const skillCategories: SkillCategory[] = [{
    category: "Security & Testing",
    skills: [{
      name: "Penetration Testing",
      level: 90,
      examples: ["Network scans", "Web app exploits", "Red team ops"]
    }, {
      name: "Metasploit / Burp Suite",
      level: 85,
      examples: ["Payload crafting", "Proxy intercepts", "SQLi testing"]
    }, {
      name: "OSINT & Threat Modeling",
      level: 85,
      examples: ["Recon tools", "Attack trees", "Risk matrices"]
    }, {
      name: "Vulnerability Assessment",
      level: 90,
      examples: ["CVE analysis", "Patch prioritization", "Reports"]
    }]
  }, {
    category: "AI & Machine Learning",
    skills: [{
      name: "GPT-4 / Claude",
      level: 95,
      examples: ["Prompt engineering", "Fine-tuning", "RAG systems"]
    }, {
      name: "Open-source LLMs",
      level: 85,
      examples: ["Llama", "Mistral", "Local deployment"]
    }, {
      name: "AI Risk Management",
      level: 90,
      examples: ["Bias audits", "Safety evals", "Alignment"]
    }, {
      name: "Automation",
      level: 85,
      examples: ["Workflows", "API chains", "Bot prototypes"]
    }]
  }, {
    category: "Policy & Compliance",
    skills: [{
      name: "NIST AI RMF",
      level: 90,
      examples: ["Map", "Measure", "Manage", "Govern"]
    }, {
      name: "FERPA / Title IX",
      level: 85,
      examples: ["Data privacy", "Student records", "Audits"]
    }, {
      name: "Gov Procurement",
      level: 80,
      examples: ["FAR/DFAR", "RFPs", "Contract mods"]
    }, {
      name: "Risk Auditing",
      level: 90,
      examples: ["Controls mapping", "Gap analysis", "Remediation"]
    }]
  }];
  const additionalSkills = ["Blockchain", "UX/UI", "Data Analysis", "Strategy", "Change Mgmt", "Python", "Dashboards"];
  return <section id="skills" className="py-10 md:py-16 px-3 md:px-4 bg-slate-50">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <motion.div className="mb-5 md:mb-8" initial={{
        opacity: 0,
        y: 15
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.4
      }}>
          <p className="text-[9px] md:text-xs uppercase tracking-widest font-medium mb-1.5 text-primary">
            Expertise
          </p>
          <h2 className="font-display text-lg md:text-2xl font-medium text-foreground mb-1.5">
            Skills & Technologies
          </h2>
          <p className="text-[10px] md:text-sm text-muted-foreground max-w-md">
            A comprehensive toolkit built over years of hands-on work.
          </p>
        </motion.div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mb-6">
          {skillCategories.map((category, catIndex) => <motion.div key={category.category} className="bg-card border border-border/60 rounded-md p-2 md:p-3" initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.3,
          delay: catIndex * 0.1
        }} style={{
          boxShadow: '0 2px 8px -2px hsl(var(--primary) / 0.08)'
        }}>
              <h3 className="text-[9px] md:text-[11px] font-medium text-foreground mb-2 md:mb-3 pb-1 border-b border-border/40">
                {category.category}
              </h3>
              <div className="space-y-2 md:space-y-2.5">
                {category.skills.map(skill => <div key={skill.name} className="relative group" onMouseEnter={() => setHoveredSkill(skill.name)} onMouseLeave={() => setHoveredSkill(null)}>
                    <div className="flex justify-between text-[8px] md:text-[10px] mb-0.5">
                      <span className="text-foreground truncate pr-1">{skill.name}</span>
                      <span className="text-muted-foreground shrink-0">{skill.level}%</span>
                    </div>
                    <div className="h-1 md:h-1.5 bg-muted/60 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" initial={{
                  width: 0
                }} whileInView={{
                  width: `${skill.level}%`
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.8,
                  delay: 0.2
                }} />
                    </div>
                    
                    {/* Hover Examples Tooltip */}
                    {hoveredSkill === skill.name && <motion.div initial={{
                opacity: 0,
                y: 5
              }} animate={{
                opacity: 1,
                y: 0
              }} className="absolute left-0 right-0 top-full mt-1 z-20 bg-popover border border-border rounded px-1.5 py-1 shadow-lg">
                        <div className="flex flex-wrap gap-0.5">
                          {skill.examples.map((ex, i) => <span key={i} className="text-[6px] md:text-[7px] bg-primary/10 text-primary px-1 py-0.5 rounded">
                              {ex}
                            </span>)}
                        </div>
                      </motion.div>}
                  </div>)}
              </div>
            </motion.div>)}
        </div>

        {/* Divider */}
        <div className="h-px bg-border/40 mb-4" />

        {/* Additional Skills */}
        <h3 className="text-[10px] md:text-xs font-medium text-foreground mb-2">
          Also Proficient In
        </h3>
        <div className="flex-wrap gap-1 flex items-start justify-center text-black">
          {additionalSkills.map(skill => <motion.span key={skill} className="px-1.5 py-0.5 border border-border/50 rounded-full text-[7px] md:text-[8px] text-muted-foreground hover:border-primary hover:text-primary transition-colors bg-muted/30" whileHover={{
          scale: 1.05
        }}>
              {skill}
            </motion.span>)}
        </div>
      </div>
    </section>;
};
export default Skills;