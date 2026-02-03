/**
 * Skills Section Component
 * 
 * Technical proficiency display with animated skill bars, scroll animations, and abstract shapes.
 */
import { motion } from "framer-motion";
import { SectionHeader } from "./ui/section-header";
import { SkillBar } from "./ui/skill-bar";
import { Tag } from "./ui/tag";
import { ScrollFade, StaggerContainer, StaggerItem } from "./ui/scroll-fade";
import { CircleShape, RingShape, DotsPattern } from "./ui/abstract-shapes";

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
    <section id="skills" className="relative py-section-sm md:py-section px-4 bg-background overflow-hidden">
      {/* Abstract background shapes */}
      <CircleShape className="w-48 h-48 -top-10 -left-10" />
      <RingShape className="w-32 h-32 top-1/3 right-[5%]" />
      <DotsPattern className="w-32 h-32 bottom-20 left-[8%]" />

      <div className="container relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <ScrollFade>
          <SectionHeader
            overline="Technical Proficiency"
            title="Skills & Expertise"
            description="Bridging the gap between frontier AI development and rigorous security infrastructure."
            align="left"
          />
        </ScrollFade>

        {/* Competency Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-container md:gap-container-lg">
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.category}>
              <motion.div
                className="glass rounded-xl p-card shadow-soft h-full"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 32px -8px hsl(var(--primary) / 0.2)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <h3 className="text-overline text-muted-foreground uppercase mb-card pb-element-sm border-b border-border/50">
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
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Secondary Stack */}
        <ScrollFade delay={0.3} className="mt-container-lg">
          <div className="flex flex-wrap justify-center gap-element-sm">
            {secondaryTech.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                <Tag variant="outline" size="md">
                  {tech}
                </Tag>
              </motion.div>
            ))}
          </div>
        </ScrollFade>
      </div>
    </section>
  );
};

export default Skills;
