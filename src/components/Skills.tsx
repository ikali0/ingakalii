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
      
    </motion.div>;
}
const Skills = () => {
  return <section id="skills" className="section-padding bg-background relative overflow-hidden">
      <div className="container-width">
        <ScrollFade>
          <SectionHeader overline="Technical Expertise" title="Core Competencies" description="Security-first approach to AI systems, from adversarial testing to production deployment." />
        </ScrollFade>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {bentoCards.map(card => <StaggerItem key={card.id}>
              <BentoCardComponent card={card} />
            </StaggerItem>)}
        </StaggerContainer>

        {/* Secondary Technologies */}
        <ScrollFade delay={0.3}>
          <div className="flex flex-wrap justify-center gap-1.5">
            {secondaryTech.map(tech => <Tag key={tech.name} size="sm">
                {tech.name}
              </Tag>)}
          </div>
        </ScrollFade>
      </div>
    </section>;
};
export default Skills;