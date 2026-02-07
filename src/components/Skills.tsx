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
    examples: ["Red Teaming", "Exploit Development"]
  }, {
    name: "Vulnerability Research",
    level: 90,
    examples: ["CVE Analysis", "SAST/DAST"]
  }, {
    name: "Threat Modeling",
    level: 90,
    examples: ["Zero Trust", "Attack Surface Mapping"]
  }]
}, {
  id: "ai",
  category: "Applied LLM Systems",
  icon: Brain,
  span: "wide",
  skills: [{
    name: "LLM Deployment",
    level: 95,
    examples: ["Open-Source Models", "Infrastructure Optimization"]
  }, {
    name: "Prompt Risk Analysis",
    level: 90,
    examples: ["Injection Mitigation", "Agent Guardrails"]
  }]
}, {
  id: "governance",
  category: "AI Governance Implementation",
  icon: Scale,
  span: "normal",
  skills: [{
    name: "NIST AI RMF",
    level: 95,
    examples: ["Map / Measure / Manage"]
  }, {
    name: "Compliance Architecture",
    level: 85,
    examples: ["FERPA", "SOC2", "Audit Readiness"]
  }]
}, {
  id: "engineering",
  category: "Systems Engineering",
  icon: Code,
  span: "normal",
  skills: [{
    name: "System Design",
    level: 90,
    examples: ["Distributed Systems", "Service Architecture"]
  }, {
    name: "Full-Stack Development",
    level: 85,
    examples: ["React", "Node.js"]
  }]
}, {
  id: "ml",
  category: "ML Infrastructure",
  icon: Database,
  span: "wide",
  skills: [{
    name: "Vector Databases",
    level: 90,
    examples: ["Pinecone", "Weaviate"]
  }, {
    name: "MLOps Pipelines",
    level: 85,
    examples: ["MLflow", "CI/CD"]
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
  name: "Docker",
  icon: Database
}, {
  name: "Linux",
  icon: Terminal
}, {
  name: "DevSecOps",
  icon: Shield
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
        relative overflow-hidden rounded-lg 
        bg-card border border-border/40 
        shadow-sm hover:shadow-md 
        transition-all duration-300`} whileHover={{
    y: -4
  }} transition={{
    type: "spring",
    stiffness: 300,
    damping: 25
  }}>
      <div className="p-5 h-full flex flex-col px-[11px] py-[11px]">

        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
            <Icon className="text-primary h-4 w-4" />
          </div>
          <h3 className="font-semibold text-foreground text-sm tracking-tight">
            {card.category}
          </h3>
        </div>

        {/* Skills */}
        <div className="space-y-4 flex-1">
          {card.skills.map(skill => <SkillBar key={skill.name} name={skill.name} level={skill.level} examples={skill.examples} />)}
        </div>
      </div>
    </motion.div>;
}
const Skills = () => {
  return <section id="skills" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent text-xl animate-spin" style={{
            animationDuration: '3s'
          }}>✱</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Expertise
            </span>
          </div>
          
          <p className="text-foreground/80 max-w-xl text-sm md:text-base leading-relaxed">
            Core competencies spanning security, AI systems, governance, and engineering.
          </p>
        </div>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
          {bentoCards.map(card => <StaggerItem key={card.id}>
              <BentoCardComponent card={card} />
            </StaggerItem>)}
        </StaggerContainer>

        {/* Secondary Tech */}
        <ScrollFade>
          <div className="mt-10 pt-8 border-t border-border/30">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Also Proficient In
            </p>
            <div className="flex flex-wrap gap-2">
              {secondaryTech.map(tech => <Tag key={tech.name} variant="outline" size="sm">
                  {tech.name}
                </Tag>)}
            </div>
          </div>
        </ScrollFade>
      </div>
    </section>;
};
export default Skills;