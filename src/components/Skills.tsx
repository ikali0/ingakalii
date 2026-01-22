import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const skillCategories: SkillCategory[] = [{
    category: "Offensive Security",
    skills: [{
      name: "Penetration Testing",
      level: 90,
      examples: ["Red Teaming", "Exploit Dev", "Network Ops"]
    }, {
      name: "Vulnerability Research",
      level: 90,
      examples: ["CVE Analysis", "Static/Dynamic Analysis"]
    }, {
      name: "Security Architecture",
      level: 85,
      examples: ["Threat Modeling", "Zero Trust", "IAS"]
    }]
  }, {
    category: "Applied AI & LLMs",
    skills: [{
      name: "ChatGPT-5 / Claude 3.5",
      level: 95,
      examples: ["Reasoning Models", "Agentic Workflows"]
    }, {
      name: "Llama & Open Source",
      level: 88,
      examples: ["Quantization", "Local Inference", "Fine-Tuning"]
    }, {
      name: "HF Transformers",
      level: 85,
      examples: ["Model Pipelines", "Tokenizer Optimization"]
    }]
  }, {
    category: "Governance & Risk",
    skills: [{
      name: "NIST AI RMF",
      level: 92,
      examples: ["Map/Measure", "Adversarial Robustness"]
    }, {
      name: "Compliance Frameworks",
      level: 85,
      examples: ["FERPA", "Title IX", "SOC2 AI"]
    }, {
      name: "AI Safety & Auditing",
      level: 90,
      examples: ["Bias Mitigation", "Safety Guardrails"]
    }]
  }];
  const secondaryTech = ["Python", "PyTorch", "LangChain", "Vector DBs", "Linux Kernel", "Docker", "DevSecOps"];
  return <section id="skills" className="py-16 px-5 bg-slate-50/50">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header - High Level */}
        <motion.div className="mb-10 text-center md:text-left" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-fuchsia-600">
            Technical Proficiency
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-900 mt-2 md:text-3xl">
            Core Competencies
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl text-sm md:text-sm">
            Bridging the gap between frontier AI development and rigorous security infrastructure.
          </p>
        </motion.div>

        {/* Competency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {skillCategories.map((cat, idx) => <motion.div key={cat.category} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: idx * 0.1
        }} viewport={{
          once: true
        }} className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transition-shadow border-solid border-popover-foreground">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b pb-2">
                {cat.category}
              </h3>
              
              <div className="space-y-6">
                {cat.skills.map(skill => <div key={skill.name} className="cursor-pointer" onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-semibold text-slate-800 text-xs">{skill.name}</span>
                      <span className="text-[10px] font-mono text-slate-800">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-deep border-slate-800 border-solid border">
                      <motion.div initial={{
                  width: 0
                }} whileInView={{
                  width: `${skill.level}%`
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 1,
                  ease: "easeOut"
                }} className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-600" />
                    </div>

                    {/* Mobile-Friendly Context - Tap to show */}
                    <AnimatePresence>
                      {activeSkill === skill.name && <motion.div initial={{
                  height: 0,
                  opacity: 0
                }} animate={{
                  height: "auto",
                  opacity: 1
                }} exit={{
                  height: 0,
                  opacity: 0
                }} className="overflow-hidden">
                          <div className="flex flex-wrap gap-1 mt-3">
                            {skill.examples.map(ex => <span key={ex} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                                {ex}
                              </span>)}
                          </div>
                        </motion.div>}
                    </AnimatePresence>
                  </div>)}
              </div>
            </motion.div>)}
        </div>

        {/* Secondary Stack */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {secondaryTech.map(tech => <span key={tech} className="px-4 py-1.5 text-[10px] md:text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-full shadow-sm">
              {tech}
            </span>)}
        </div>
      </div>
    </section>;
};
export default Skills;