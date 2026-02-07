/**
 * Skills Section Component
 *
 * Structured Bento Grid layout with restrained motion and
 * institutional positioning.
 */

import { motion } from "framer-motion";
import { Shield, Brain, Scale, Code, Database, Terminal, Zap } from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { SkillBar } from "./ui/skill-bar";
import { Tag } from "./ui/tag";
import { ScrollFade, StaggerContainer, StaggerItem } from "./ui/scroll-fade";
interface Skill {
  name: string;
  level: number;
  examples: string[];
}
interface BentoCard {
  id: string;
  category: string;
  icon: typeof Shield;
  skills: Skill[];
  span: "normal" | "wide" | "tall";
}
const bentoCards: BentoCard[] = [{
  id: "security",
  category: "Adversarial Security",
  icon: Shield,
  span: "tall",
  skills: [{
    name: "Penetration Testing",
    level: 95,
    examples: ["OWASP Top 10", "API Security", "Red Team Ops"]
  }, {
    name: "Vulnerability Research",
    level: 90,
    examples: ["CVE Triage", "SAST/DAST", "Fuzzing"]
  }, {
    name: "Threat Modeling",
    level: 90,
    examples: ["STRIDE", "MITRE ATT&CK", "Kill Chain"]
  }]
}, {
  id: "ai",
  category: "Applied LLM Systems",
  icon: Brain,
  span: "wide",
  skills: [{
    name: "LLM Deployment",
    level: 95,
    examples: ["Llama 3", "Mistral", "vLLM", "Quantization"]
  }, {
    name: "Prompt Engineering",
    level: 90,
    examples: ["Jailbreak Defense", "CoT", "RAG Pipelines"]
  }]
}, {
  id: "governance",
  category: "AI Governance",
  icon: Scale,
  span: "normal",
  skills: [{
    name: "NIST AI RMF",
    level: 95,
    examples: ["Govern", "Map", "Measure", "Manage"]
  }, {
    name: "Compliance",
    level: 85,
    examples: ["EU AI Act", "SOC2", "HIPAA"]
  }]
}, {
  id: "engineering",
  category: "Systems Engineering",
  icon: Code,
  span: "normal",
  skills: [{
    name: "Architecture",
    level: 90,
    examples: ["Microservices", "Event-Driven", "DDD"]
  }, {
    name: "Full-Stack",
    level: 85,
    examples: ["React", "Next.js", "FastAPI"]
  }]
}, {
  id: "ml",
  category: "ML Infrastructure",
  icon: Database,
  span: "wide",
  skills: [{
    name: "Vector Stores",
    level: 90,
    examples: ["Pinecone", "Weaviate", "pgvector"]
  }, {
    name: "MLOps",
    level: 85,
    examples: ["MLflow", "Weights & Biases", "DVC"]
  }]
}];
const secondaryTech = [{
  name: "Python",
  icon: Terminal
}, {
  name: "PyTorch",
  icon: Zap
}, {
  name: "LangChain",
  icon: Brain
}, {
  name: "Hugging Face",
  icon: Brain
}, {
  name: "Docker",
  icon: Database
}, {
  name: "Kubernetes",
  icon: Database
}, {
  name: "Linux",
  icon: Terminal
}, {
  name: "Burp Suite",
  icon: Shield
}, {
  name: "Terraform",
  icon: Code
}, {
  name: "PostgreSQL",
  icon: Database
}];
function BentoCardComponent({
  card
}: {
  card: BentoCard;
}) {
  const Icon = card.icon;
  const spanClasses = {
    normal: "col-span-1 row-span-1",
    wide: "col-span-1 sm:col-span-2 row-span-1",
    tall: "col-span-1 row-span-1 lg:row-span-2"
  };
  return <motion.div className={`${spanClasses[card.span]} 
        relative overflow-hidden rounded-md 
        bg-card/80 border border-border/20 
        shadow-xs hover:shadow-sm hover:border-border/40
        transition-all duration-200`} whileHover={{
    y: -2
  }} transition={{
    type: "spring",
    stiffness: 400,
    damping: 30
  }}>
      <div className="p-3 h-full flex flex-col">

        {/* Header */}
        <div className="mb-2.5 gap-1.5 flex items-center">
          <div className="w-5 h-5 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0">
            <Icon className="text-primary h-2.5 w-2.5" />
          </div>
          <h3 className="font-medium text-foreground text-[11px] tracking-tight leading-tight">
            {card.category}
          </h3>
        </div>

        {/* Skills */}
        <div className="space-y-2 flex-1">
          {card.skills.map(skill => <SkillBar key={skill.name} name={skill.name} level={skill.level} examples={skill.examples} size="sm" />)}
        </div>
      </div>
    </motion.div>;
}
const Skills = () => {
  return (
    <section id="skills" className="relative py-16 sm:py-20 px-4 bg-background">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <ScrollFade>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-accent text-xl animate-spin" style={{ animationDuration: '3s' }}>✱</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Technical Proficiency
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground leading-tight">
              Skills & Expertise
            </h2>
          </div>
        </ScrollFade>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6" staggerDelay={0.05}>
          {bentoCards.map((card) => (
            <StaggerItem key={card.id}>
              <BentoCardComponent card={card} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Secondary Tech Tags */}
        <ScrollFade delay={0.2}>
          <div className="flex flex-wrap justify-center gap-1.5">
            {secondaryTech.map((tech) => {
              const Icon = tech.icon;
              return (
                <Tag key={tech.name} variant="muted" size="sm">
                  <Icon className="w-2.5 h-2.5 mr-1 opacity-70" />
                  <span className="text-[9px]">{tech.name}</span>
                </Tag>
              );
            })}
          </div>
        </ScrollFade>
      </div>
    </section>
  );
};

export default Skills;