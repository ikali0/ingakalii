/**
 * useActiveSection Hook
 * 
 * Tracks which section is currently in view using Intersection Observer.
 * Returns the ID of the active section for navigation highlighting.
 */
import { useState, useEffect } from "react";

const SECTION_IDS = ["about", "skills", "portfolio", "experience", "contact"];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Offset for the fixed navbar (roughly 80px)
    const rootMargin = "-80px 0px -50% 0px";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    // Observe all sections
    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle initial state - check which section is visible on page load
    const checkInitialSection = () => {
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    
    // Check after a small delay to ensure DOM is ready
    const timeout = setTimeout(checkInitialSection, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return activeSection;
}
