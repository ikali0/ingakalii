/**
 * Skills Section Component
 * 
 * Technical proficiency display with animated skill bars.
 */
import { motion } from "framer-motion";
import { SectionHeader } from "./ui/section-header";
import { SkillBar } from "./ui/skill-bar";
import { Tag } from "./ui/tag";

interface Skill {
  name: string;
  level: number;
  examples: string[];
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Offensive Security",
    skills: [
      { name: "Penetration Testing", level: 90, examples: ["Red Teaming", "Exploit Dev", "Network Ops"] },
      { name: "Vulnerability Research", level: 90, examples: ["CVE Analysis", "Static/Dynamic Analysis"] },
      { name: "Security Architecture", level: 85, examples: ["Threat Modeling", "Zero Trust", "IAS"] },
    ],
  },
  {
    category: "Applied AI & LLMs",
    skills: [
      { name: "ChatGPT-5 / Claude 3.5", level: 95, examples: ["Reasoning Models", "Agentic Workflows"] },
      { name: "Llama & Open Source", level: 88, examples: ["Quantization", "Local Inference", "Fine-Tuning"] },
      { name: "HF Transformers", level: 85, examples: ["Model Pipelines", "Tokenizer Optimization"] },
    ],
  },
  {
    category: "Governance & Risk",
    skills: [
      { name: "NIST AI RMF", level: 92, examples: ["Map/Measure", "Adversarial Robustness"] },
      { name: "Compliance Frameworks", level: 85, examples: ["FERPA", "Title IX", "SOC2 AI"] },
      { name: "AI Safety & Auditing", level: 90, examples: ["Bias Mitigation", "Safety Guardrails"] },
    ],
  },
];

const secondaryTech = [
  "Python",
  "PyTorch",
  "LangChain",
  "Vector DBs",
  "Linux Kernel",
  "Docker",
  "DevSecOps",
];

const Skills = () => {
  return (
    <section id="skills" className="py-section-sm md:py-section px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            overline="Technical Proficiency"
            title="Skills & Expertise"
            description="Bridging the gap between frontier AI development and rigorous security infrastructure."
            align="left"
          />
        </motion.div>

        {/* Competency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-container md:gap-container-lg">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-overline text-muted-foreground uppercase mb-card pb-element-sm border-b border-border">
                {cat.category}
              </h3>

              <div className="space-y-card">
                {cat.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    examples={skill.examples}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Stack */}
        <div className="mt-container-lg flex flex-wrap justify-center gap-element-sm">
          {secondaryTech.map((tech) => (
            <Tag key={tech} variant="outline" size="md">
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
