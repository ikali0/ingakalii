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

/* ---------------- Data ---------------- */

const highlights = [
  {
    icon: faLaptopCode,
    title: "Technical Rigor",
    description: "Production-ready systems.",
    back: "Architecture grounded in clarity, testing, and long-term maintainability.",
  },
  {
    icon: faLightbulb,
    title: "Institutional Insight",
    description: "Governance-aware design.",
    back: "Understanding incentives, power structures, and policy tradeoffs.",
  },
  {
    icon: faHandshake,
    title: "Collaborative Impact",
    description: "Cross-domain fluency.",
    back: "Bridging engineers, researchers, and decision-makers.",
  },
];

/* ---------------- Component ---------------- */

export default function About() {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 px-4 bg-background"
    >
      <ScrollFade>
        <div className="mx-auto max-w-2xl">

          {/* Editorial Accent Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            transition={{ duration: 0.7 }}
            className="h-[2px] bg-primary mb-6"
          />

          {/* Header */}
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
              Profile
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-foreground">
              Artificial Intelligence, Ethics & Institutional Systems
            </h2>
          </div>

          {/* Body Copy */}
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <p>
              I work at the intersection of{" "}
              <span className="text-foreground font-medium">
                artificial intelligence, governance, and human systems
              </span>
              —focusing not on speculation, but on structural consequences once
              technologies are deployed at scale.
            </p>

            <p>
              My work examines how algorithmic systems influence power,
              incentives, institutional design, and public trust.
              Through long-form analysis, I explore where governance models
              succeed, where they fracture, and what durable oversight requires.
            </p>

            <p>
              Technology should be{" "}
              <span className="text-foreground font-medium">
                transparent, accountable, and grounded in lived reality
              </span>
              —not merely optimized.
            </p>
          </div>

          {/* Platform Links — Minimal Editorial Style */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 text-sm">

            <motion.a
              href="https://medium.com/@altruisticxai"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="group relative font-medium text-foreground"
            >
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMedium} />
                Medium Essays
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>

            <motion.a
              href="https://ingakali.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="group relative font-medium text-foreground"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-orange-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
                Substack Analysis
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>

          </div>

          {/* Highlight Cards — Smaller + Cleaner */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6">

            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.04 }}
                className="transition-all"
              >
                <FlippingCard
                  width={120}
                  height={140}
                  className="w-full"
                  frontContent={
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="mb-3 text-primary"
                      />
                      <h4 className="text-sm font-medium">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  }
                  backContent={
                    <div className="flex items-center justify-center h-full p-4 text-center bg-muted/20 rounded-xl">
                      <p className="text-xs leading-snug">
                        {item.back}
                      </p>
                    </div>
                  }
                />
              </motion.div>
            ))}

          </div>

        </div>
      </ScrollFade>
    </section>
  );
}
