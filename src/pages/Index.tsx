/**
 * Index Page
 * 
 * A narrative portfolio with horizontal scrolling projects,
 * scroll-linked parallax effects, and immersive animations.
 */
import { useRef } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import {
  ProgressBar,
  Navigation,
  HeroSection,
  PhilosophySection,
  ProjectsSection,
  ContactSection,
} from "@/components/narrative";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Main scroll progress for progress bar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Hero parallax transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  return (
    <div ref={containerRef} className="relative bg-background">
      {/* Progress Bar */}
      <ProgressBar scaleX={scaleX} />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection opacity={heroOpacity} scale={heroScale} y={heroY} />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Horizontal Scrolling Projects */}
      <ProjectsSection />

      {/* Contact / Footer */}
      <ContactSection />
    </div>
  );
};

export default Index;
