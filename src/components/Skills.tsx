/**
 * Skills Section Component
 * 
 * Bento Grid layout with varied card sizes, animated skill bars, and abstract shapes.
 */
import { motion } from "framer-motion";
import { Shield, Brain, Scale, Zap, Code, Database, Terminal } from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { SkillBar } from "./ui/skill-bar";
import { Tag } from "./ui/tag";
import { ScrollFade, StaggerContainer, StaggerItem } from "./ui/scroll-fade";
import { CircleShape, RingShape, DotsPattern, SparkleShape, ParallaxShape } from "./ui/abstract-shapes";
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
  span: "normal" | "wide" | "tall" | "large";
  accent?: string;
}
const bentoCards: BentoCard[] = [{
  id: "security",
  category: "Offensive Security",
  icon: Shield,
  span: "tall",
  accent: "from-red-500/15 to-orange-500/10",
  skills: [{
    name: "Penetration Testing",
    level: 90,
    examples: ["Red Teaming", "Exploit Dev"]
  }, {
    name: "Vulnerability Research",
    level: 90,
    examples: ["CVE Analysis", "SAST/DAST"]
  }, {
    name: "Security Architecture",
    level: 85,
    examples: ["Zero Trust", "Threat Modeling"]
  }]
}, {
  id: "ai",
  category: "Applied AI & LLMs",
  icon: Brain,
  span: "wide",
  accent: "from-[hsl(265_50%_55%/0.2)] to-[hsl(213_94%_35%/0.1)]",
  skills: [{
    name: "GPT-5 / Claude 3.5",
    level: 95,
    examples: ["Reasoning", "Agents"]
  }, {
    name: "Open Source LLMs",
    level: 88,
    examples: ["Llama", "Fine-Tuning"]
  }]
}, {
  id: "governance",
  category: "Governance & Risk",
  icon: Scale,
  span: "normal",
  accent: "from-[hsl(158_55%_45%/0.2)] to-[hsl(180_50%_40%/0.1)]",
  skills: [{
    name: "NIST AI RMF",
    level: 92,
    examples: ["Map/Measure"]
  }, {
    name: "Compliance",
    level: 85,
    examples: ["FERPA", "SOC2"]
  }]
}, {
  id: "engineering",
  category: "Engineering",
  icon: Code,
  span: "normal",
  accent: "from-[hsl(213_94%_35%/0.2)] to-[hsl(190_80%_45%/0.1)]",
  skills: [{
    name: "Full-Stack Dev",
    level: 88,
    examples: ["React", "Node.js"]
  }, {
    name: "System Design",
    level: 85,
    examples: ["Microservices"]
  }]
}, {
  id: "data",
  category: "Data & ML Ops",
  icon: Database,
  span: "wide",
  accent: "from-amber-500/15 to-yellow-500/10",
  skills: [{
    name: "Vector Databases",
    level: 90,
    examples: ["Pinecone", "Weaviate"]
  }, {
    name: "MLOps Pipelines",
    level: 85,
    examples: ["MLflow", "Weights & Biases"]
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
    tall: "col-span-1 row-span-1 lg:row-span-2",
    large: "col-span-1 sm:col-span-2 row-span-1 lg:row-span-2"
  };
  return <motion.div className={`${spanClasses[card.span]} relative overflow-hidden rounded-lg glass shadow-soft group touch-manipulation border border-border/30`} whileHover={{
    scale: 1.01,
    boxShadow: "0 8px 24px -8px hsl(158 55% 45% / 0.15)"
  }} whileTap={{
    scale: 0.99
  }} transition={{
    type: "spring",
    stiffness: 400,
    damping: 25
  }}>
      {/* Gradient accent overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
      
      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Header */}
        <div className="mb-3 flex items-center gap-2">
          <div className="w-7 h-7 bg-primary/10 group-hover:bg-primary/20 transition-colors rounded flex items-center justify-center">
            <Icon className="text-primary h-3.5 w-3.5" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-sm">
            {card.category}
          </h3>
        </div>

        {/* Skills */}
        <div className="space-y-3 flex-1">
          {card.skills.map(skill => <SkillBar key={skill.name} name={skill.name} level={skill.level} examples={skill.examples} />)}
        </div>
      </div>
    </motion.div>;
}
const Skills = () => {
  return <section id="skills" className="relative py-section-sm md:py-section px-4 bg-background overflow-hidden">
      {/* Abstract background shapes with parallax */}
      <ParallaxShape speed={0.1} className="w-48 h-48 -top-10 -left-10">
        <CircleShape className="w-full h-full" />
      </ParallaxShape>
      <ParallaxShape speed={0.2} rotateAmount={15} className="w-32 h-32 top-1/3 right-[5%]">
        <RingShape className="w-full h-full" />
      </ParallaxShape>
      <ParallaxShape speed={0.08} className="w-32 h-32 bottom-20 left-[8%]">
        <DotsPattern className="w-full h-full" />
      </ParallaxShape>
      <ParallaxShape speed={0.3} className="w-6 h-6 top-40 right-[20%]">
        <SparkleShape className="w-full h-full" />
      </ParallaxShape>

      <div className="container relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <ScrollFade>
          <SectionHeader overline="Technical Proficiency" title="Skills & Expertise" description="Bridging the gap between frontier AI development and rigorous security infrastructure." align="left" />
        </ScrollFade>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(140px,auto)] gap-4" staggerDelay={0.08}>
          {bentoCards.map(card => <StaggerItem key={card.id}>
              <BentoCardComponent card={card} />
            </StaggerItem>)}
        </StaggerContainer>

        {/* Secondary Stack */}
        <ScrollFade delay={0.3} className="mt-container-lg">
          <div className="flex flex-wrap justify-center gap-[10px]">
            {secondaryTech.map((tech, index) => {
            const Icon = tech.icon;
            return <motion.div key={tech.name} initial={{
              opacity: 0,
              scale: 0.8
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.05,
              duration: 0.3
            }} whileHover={{
              scale: 1.1,
              y: -2
            }} whileTap={{
              scale: 0.95
            }} className="touch-manipulation">
                  <Tag variant="outline" size="md" className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {tech.name}
                  </Tag>
                </motion.div>;
          })}
          </div>
        </ScrollFade>
      </div>
    </section>;
};
export default Skills;