/**
 * About Section Component
 * 
 * Personal introduction with highlight cards.
 */
import { Code2, Sparkles, Users } from "lucide-react";
import { FlippingCard } from "./ui/flipping-card";

interface HighlightData {
  icon: typeof Code2;
  title: string;
  description: string;
  backDescription: string;
}

const highlights: HighlightData[] = [
  {
    icon: Code2,
    title: "Technical Excellence",
    description: "Clean, maintainable code.",
    backDescription: "Production-ready code with testing and documentation.",
  },
  {
    icon: Sparkles,
    title: "Creative Solutions",
    description: "Elegant problem solving.",
    backDescription: "Combining technical expertise with design thinking.",
  },
  {
    icon: Users,
    title: "Team Player",
    description: "Collaborative impact.",
    backDescription: "Bridging technical and non-technical stakeholders.",
  },
];

function CardFront({ data }: { data: HighlightData }) {
  const Icon = data.icon;
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-card-sm text-center">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-element-sm">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h4 className="font-display text-body-sm font-medium text-foreground mb-1 leading-tight">
        {data.title}
      </h4>
      <p className="text-caption text-muted-foreground leading-snug">
        {data.description}
      </p>
    </div>
  );
}

function CardBack({ data }: { data: HighlightData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-card-sm text-center rounded-md bg-secondary/20">
      <p className="text-caption leading-snug text-foreground">
        {data.backDescription}
      </p>
    </div>
  );
}

const About = () => {
  return (
    <section
      id="about"
      className="py-section-sm md:py-section px-4 bg-muted/30"
    >
      <div className="container mx-auto max-w-2xl border border-border/50 shadow-sm rounded-lg p-card md:p-container bg-background">
        {/* Header */}
        <div className="mb-container md:mb-container-lg">
          <p className="text-overline uppercase text-accent font-semibold mb-element-sm">
            About Me
          </p>
          <h2 className="font-display text-display-sm text-foreground mb-element-sm">
            Building with Purpose
          </h2>
        </div>

        {/* Description */}
        <div className="text-body-sm md:text-body text-muted-foreground space-y-card-sm mb-container md:mb-container-lg leading-relaxed">
          <p>
            Developer and designer creating digital experiences. Background in{" "}
            <strong className="text-foreground font-semibold">
              computer science, public policy, and economics
            </strong>
            .
          </p>
          <p>
            Full-stack development focused on the intersection of{" "}
            <strong className="text-foreground font-semibold">
              technology and social impact
            </strong>
            .
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="flex flex-wrap gap-container justify-center">
          {highlights.map((item) => (
            <FlippingCard
              key={item.title}
              width={110}
              height={120}
              className="sm:w-[130px] sm:h-[140px] md:w-[150px] md:h-[160px]"
              frontContent={<CardFront data={item} />}
              backContent={<CardBack data={item} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
