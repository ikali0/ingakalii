import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faLightbulb,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { FlippingCard } from "./ui/flipping-card";
import { ScrollFade } from "./ui/scroll-fade";
import {
  BlobShape,
  SparkleShape,
  ParallaxShape,
} from "./ui/abstract-shapes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

/* ---------------- Data ---------------- */

interface HighlightData {
  icon: any;
  title: string;
  description: string;
  backDescription: string;
}

const highlights: HighlightData[] = [
  {
    icon: faLaptopCode,
    title: "Technical Excellence",
    description: "Clean, maintainable code.",
    backDescription:
      "Production-ready systems with thoughtful architecture and documentation.",
  },
  {
    icon: faLightbulb,
    title: "Creative Solutions",
    description: "Elegant problem solving.",
    backDescription:
      "Design-led engineering that bridges usability and technical rigor.",
  },
  {
    icon: faHandshake,
    title: "Collaborative Impact",
    description: "Aligned teamwork.",
    backDescription:
      "Connecting researchers, builders, and institutions around shared goals.",
  },
];

/* ---------------- Cards ---------------- */

function CardFront({ data }: { data: HighlightData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center">
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mb-3">
        <FontAwesomeIcon icon={data.icon} className="w-4 h-4 text-primary" />
      </div>
      <h4 className="text-sm font-semibold text-foreground mb-1">
        {data.title}
      </h4>
      <p className="text-xs text-muted-foreground leading-snug">
        {data.description}
      </p>
    </div>
  );
}

function CardBack({ data }: { data: HighlightData }) {
  return (
    <div className="flex items-center justify-center h-full w-full p-4 text-center rounded-xl bg-muted/30">
      <p className="text-xs leading-snug text-foreground">
        {data.backDescription}
      </p>
    </div>
  );
}

/* ---------------- Section ---------------- */

const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 px-4 bg-muted/20 overflow-hidden"
    >
      {/* Subtle Background Motion */}
      <ParallaxShape speed={0.15} className="w-56 h-56 -top-20 -right-16">
        <BlobShape className="w-full h-full opacity-40" />
      </ParallaxShape>

      <ParallaxShape speed={0.25} className="w-6 h-6 top-24 left-[8%]">
        <SparkleShape className="w-full h-full opacity-70" />
      </ParallaxShape>

      <ScrollFade>
        <div className="relative z-10 mx-auto max-w-3xl">

          {/* Glass Card */}
          <div className="rounded-3xl border border-border/40
                          bg-white/40 dark:bg-white/[0.04]
                          backdrop-blur-xl shadow-lg p-6 sm:p-10">

            {/* Header */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
                About Me
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Building with Purpose
              </h2>
            </div>

            {/* Body Copy */}
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                I work at the intersection of{" "}
                <span className="text-foreground font-semibold">
                  artificial intelligence, ethics, and human impact
                </span>
                —focusing not on hype, but on how systems reshape power,
                incentives, and trust once deployed.
              </p>

              <p>
                Through long-form writing on alignment, governance, and
                accountability, I explore where AI delivers value, where it
                creates subtle harms, and what responsible oversight truly
                requires.
              </p>

              <p>
                I believe technology should be{" "}
                <span className="text-foreground font-semibold">
                  transparent, humane, and grounded in lived reality
                </span>
                —not abstract metrics alone.
              </p>
            </div>

            {/* Platform Links */}
            <div className="mt-10">
              <TooltipProvider>
                <div className="flex flex-col sm:flex-row gap-4">

                  {/* Medium */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href="https://medium.com/@altruisticxai"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.97 }}
                        className="flex items-start gap-3 p-4 rounded-xl
                                   bg-card border border-border/40
                                   hover:border-primary/40 transition"
                      >
                        <FontAwesomeIcon
                          icon={faMedium}
                          className="w-5 h-5 mt-1"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            Medium
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Long-form AI ethics essays
                          </p>
                        </div>
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>
                      Read in-depth analysis
                    </TooltipContent>
                  </Tooltip>

                  {/* Substack */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href="https://ingakali.substack.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.97 }}
                        className="flex items-start gap-3 p-4 rounded-xl
                                   bg-card border border-border/40
                                   hover:border-orange-500/40 transition"
                      >
                        <svg
                          className="w-5 h-5 mt-1 text-orange-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold">
                            Substack
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Ongoing institutional analysis
                          </p>
                        </div>
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>
                      Subscribe for new writing
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>

            {/* Highlight Cards */}
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FlippingCard
                    width={120}
                    height={140}
                    className="sm:w-[140px] sm:h-[160px]"
                    frontContent={<CardFront data={item} />}
                    backContent={<CardBack data={item} />}
                  />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </ScrollFade>
    </section>
  );
};

export default About;
