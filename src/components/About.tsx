import { Code2, Sparkles, Users } from "lucide-react";
import { FlippingCard } from "./ui/flipping-card";
interface HighlightData {
  icon: typeof Code2;
  title: string;
  description: string;
  backDescription: string;
}
const highlights: HighlightData[] = [{
  icon: Code2,
  title: "Technical Excellence",
  description: "Clean, maintainable code.",
  backDescription: "Production-ready code with testing and documentation."
}, {
  icon: Sparkles,
  title: "Creative Solutions",
  description: "Elegant problem solving.",
  backDescription: "Combining technical expertise with design thinking."
}, {
  icon: Users,
  title: "Team Player",
  description: "Collaborative impact.",
  backDescription: "Bridging technical and non-technical stakeholders."
}];
function CardFront({
  data
}: {
  data: HighlightData;
}) {
  const Icon = data.icon;
  return <div className="flex flex-col items-center justify-center h-full w-full p-2 sm:p-3 text-center">
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center mb-1.5 sm:mb-2">
        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
      </div>
      <h4 className="font-display text-[10px] sm:text-xs font-medium text-foreground mb-1 leading-tight">
        {data.title}
      </h4>
      <p className="text-[8px] sm:text-[10px] text-muted-foreground leading-snug">
        {data.description}
      </p>
    </div>;
}
function CardBack({
  data
}: {
  data: HighlightData;
}) {
  return <div className="flex flex-col items-center justify-center h-full w-full p-2 sm:p-3 text-center rounded-md bg-pink-300">
      <p className="text-[8px] leading-snug text-black sm:text-sm">
        {data.backDescription}
      </p>
    </div>;
}
const About = () => {
  return <section id="about" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-slate-50">
      <div className="container mx-auto max-w-2xl border border-border/50 shadow-sm rounded-md p-4 sm:p-6 bg-[sidebar-primary-foreground] bg-background">
        {/* Notebook spiral effect */}
        <div className="absolute left-2 top-4 bottom-4 w-3 hidden sm:flex flex-col gap-[6px]">
          {[...Array(8)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-border/60" />)}
        </div>
        
        <div className="mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest font-medium mb-1.5 text-primary/70">
            About Me
          </p>
          <h2 className="font-display text-lg sm:text-xl md:text-2xl font-medium text-foreground mb-2">
            Building with Purpose
          </h2>
        </div>

        <div className="text-xs sm:text-sm text-muted-foreground space-y-3 mb-6 sm:mb-8">
          <p>
            Developer and designer creating digital experiences. Background in{" "}
            <strong className="text-foreground">computer science, public policy, and economics </strong>.
          </p>
          <p>
            Full-stack development focused on the intersection of{" "}
            <strong className="text-foreground">technology and social impact</strong>.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {highlights.map(item => <FlippingCard key={item.title} width={90} height={100} className="sm:w-[110px] sm:h-[120px] md:w-[130px] md:h-[140px]" frontContent={<CardFront data={item} />} backContent={<CardBack data={item} />} />)}
        </div>
      </div>
    </section>;
};
export default About;