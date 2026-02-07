/**
 * ProjectsSection Component
 * Horizontal scrolling projects gallery with parallax
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";

// Import portfolio images
import ethicsDashboard from "@/assets/portfolio-ethics-dashboard.jpg";
import governance from "@/assets/portfolio-governance.jpg";
import stakeholder from "@/assets/portfolio-stakeholder.jpg";
import biasDetection from "@/assets/portfolio-bias-detection.jpg";
import decisionFramework from "@/assets/portfolio-decision-framework.jpg";
import tutoring from "@/assets/portfolio-tutoring.jpg";

interface Project {
  title: string;
  desc: string;
  tech: string[];
  color: string;
  image: string;
  github?: string;
  live?: string;
}

const PROJECTS: Project[] = [
  {
    title: "AI Ethics Dashboard",
    desc: "Interactive platform for monitoring and auditing AI systems for fairness, transparency, and accountability metrics.",
    tech: ["React", "Python", "Fairlearn"],
    color: "from-blue-600 to-indigo-600",
    image: ethicsDashboard,
    github: "https://github.com",
  },
  {
    title: "Governance Framework",
    desc: "Tool for organizations to create and implement AI governance policies with automated compliance checking.",
    tech: ["Next.js", "TypeScript", "NIST AI RMF"],
    color: "from-purple-600 to-violet-600",
    image: governance,
    github: "https://github.com",
  },
  {
    title: "Stakeholder Mapping",
    desc: "Visual tool for mapping stakeholder interests, power dynamics, and potential conflicts in tech deployment.",
    tech: ["React", "D3.js", "Force Graph"],
    color: "from-emerald-600 to-teal-600",
    image: stakeholder,
    github: "https://github.com",
  },
  {
    title: "Bias Detection API",
    desc: "RESTful API service for detecting and measuring various types of bias in datasets and model outputs.",
    tech: ["Python", "FastAPI", "Scikit-learn"],
    color: "from-orange-600 to-amber-600",
    image: biasDetection,
    github: "https://github.com",
  },
  {
    title: "Decision Framework",
    desc: "Mobile-first application helping teams make ethical decisions under time pressure with structured frameworks.",
    tech: ["React Native", "Firebase", "Ethics"],
    color: "from-rose-600 to-pink-600",
    image: decisionFramework,
    github: "https://github.com",
  },
  {
    title: "AI Tutoring Platform",
    desc: "AI-powered tutoring platform providing personalized learning experiences and academic support services.",
    tech: ["React", "GPT-4", "Personalization"],
    color: "from-cyan-600 to-sky-600",
    image: tutoring,
    github: "https://github.com",
    live: "https://studii.lovable.app",
  },
];

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate the horizontal scroll amount based on number of projects
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", `-${(PROJECTS.length - 1) * 100 / PROJECTS.length}%`]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${PROJECTS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full items-center"
          style={{ x: xTranslate }}
        >
          {/* Title card */}
          <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center px-container">
            <span className="text-overline text-primary tracking-widest mb-4">Portfolio</span>
            <h2 className="text-display-lg md:text-display-xl font-display font-bold text-center leading-none">
              SELECTED
              <br />
              <span className="bg-gradient-to-r from-primary via-accent-foreground to-secondary-foreground bg-clip-text text-transparent">
                REMIXES
              </span>
            </h2>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>

          {/* Project cards */}
          {PROJECTS.map((project, index) => (
            <div
              key={project.title}
              className="flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative w-full max-w-4xl"
              >
                {/* Project number */}
                <div
                  className={`absolute -top-8 -left-4 text-[8rem] md:text-[12rem] font-display font-bold opacity-10 bg-gradient-to-br ${project.color} bg-clip-text text-transparent select-none`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Card */}
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-elevated">
                  {/* Image */}
                  <div className="aspect-video md:aspect-square overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-caption px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-display-sm font-display font-bold text-foreground">
                      {project.title}
                    </h3>

                    <p className="mt-4 text-body text-muted-foreground leading-relaxed">
                      {project.desc}
                    </p>

                    {/* Action links */}
                    <div className="mt-6 flex items-center gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                          aria-label="View on GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                          aria-label="View live project"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
