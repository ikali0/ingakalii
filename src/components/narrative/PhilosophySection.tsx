/**
 * PhilosophySection Component
 * Showcases the creative philosophy with animated cards
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Palette, Zap } from "lucide-react";

const philosophyItems = [
  {
    icon: Lightbulb,
    title: "Mashup Method",
    desc: "Blending psychology with data structures to create intuitive user paths.",
  },
  {
    icon: Palette,
    title: "Visual Logic",
    desc: "Treating UI as a living canvas where every interaction tells a story.",
  },
  {
    icon: Zap,
    title: "Core Purpose",
    desc: "Building digital tools that solve real problems while inspiring curiosity.",
  },
];

export const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative min-h-screen flex items-center py-section px-container bg-muted/30"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-display-lg md:text-display-xl font-display font-bold leading-none tracking-tight">
              BEYOND THE{" "}
              <span className="bg-gradient-to-r from-primary via-accent-foreground to-secondary-foreground bg-clip-text text-transparent">
                CODEBASE.
              </span>
            </h2>
            <p className="mt-8 text-body-lg text-muted-foreground leading-relaxed max-w-xl">
              I believe that software should be as expressive as a painting and as functional as a heartbeat.
              My work sits at the intersection of technical rigor and creative exploration.
            </p>
          </motion.div>

          {/* Right: Philosophy cards */}
          <div className="space-y-6">
            {philosophyItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group p-6 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elevated"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-heading font-display font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-body text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
