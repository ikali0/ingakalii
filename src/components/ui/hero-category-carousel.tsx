/**
 * Hero Category Carousel
 * 
 * A swipeable, mobile-friendly carousel showing category tags
 * that filter and display related projects inline.
 */
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtom,
  faBrain,
  faShieldHalved,
  faBalanceScale,
  faChevronLeft,
  faChevronRight,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

// Import project images
import ethicsDashboard from "@/assets/portfolio-ethics-dashboard.jpg";
import governance from "@/assets/portfolio-governance.jpg";
import stakeholder from "@/assets/portfolio-stakeholder.jpg";
import biasDetection from "@/assets/portfolio-bias-detection.jpg";
import decisionFramework from "@/assets/portfolio-decision-framework.jpg";
import tutoring from "@/assets/portfolio-tutoring.jpg";

/** Category definition with icon and color */
interface Category {
  id: string;
  label: string;
  icon: typeof faBrain;
  color: string;
  bgColor: string;
}

/** Project mapped to categories */
interface CategoryProject {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  link?: string;
}

const categories: Category[] = [
  { id: "ai-ml", label: "AI/ML", icon: faBrain, color: "text-primary", bgColor: "bg-primary/10 border-primary/30" },
  { id: "governance", label: "Governance", icon: faBalanceScale, color: "text-accent", bgColor: "bg-accent/10 border-accent/30" },
  { id: "security", label: "Security", icon: faShieldHalved, color: "text-red-500", bgColor: "bg-red-500/10 border-red-500/30" },
  { id: "ethics", label: "Ethics", icon: faBalanceScale, color: "text-purple-500", bgColor: "bg-purple-500/10 border-purple-500/30" },
  { id: "education", label: "Education", icon: faBrain, color: "text-blue-500", bgColor: "bg-blue-500/10 border-blue-500/30" },
  { id: "research", label: "Research", icon: faAtom, color: "text-neural", bgColor: "bg-neural/10 border-neural/30" },
];

const categoryProjects: CategoryProject[] = [
  {
    id: "ethics-dashboard",
    title: "AI Ethics Dashboard",
    description: "Real-time monitoring for AI fairness, bias detection, and accountability metrics",
    image: ethicsDashboard,
    categories: ["ai-ml", "governance", "ethics"],
  },
  {
    id: "governance-framework",
    title: "Governance Framework Tool",
    description: "Automated compliance checking for AI policies and regulatory requirements",
    image: governance,
    categories: ["governance", "security", "ethics"],
  },
  {
    id: "stakeholder-mapping",
    title: "Stakeholder Mapping",
    description: "Visual tool for mapping power dynamics and impact in AI deployment",
    image: stakeholder,
    categories: ["governance", "research"],
  },
  {
    id: "bias-detection",
    title: "Bias Detection API",
    description: "RESTful API for measuring and mitigating bias in ML datasets",
    image: biasDetection,
    categories: ["ai-ml", "security", "ethics"],
  },
  {
    id: "decision-framework",
    title: "Ethical Decision Framework",
    description: "Mobile-first ethical decision support for AI practitioners",
    image: decisionFramework,
    categories: ["ai-ml", "governance", "ethics"],
  },
  {
    id: "tutoring-platform",
    title: "AI Tutoring Platform",
    description: "Personalized AI-powered learning with built-in ethical safeguards",
    image: tutoring,
    categories: ["ai-ml", "education"],
    link: "https://studii.lovable.app",
  },
];

export function HeroCategoryCarousel() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const filteredProjects = selectedCategory
    ? categoryProjects.filter((p) => p.categories.includes(selectedCategory))
    : [];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <div className="w-full">
      {/* Category Pills Carousel */}
      <div className="relative">
        {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full",
            "bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm",
            "flex items-center justify-center transition-all duration-200",
            "hover:bg-card hover:border-border",
            "disabled:opacity-0 disabled:pointer-events-none",
            "hidden sm:flex"
          )}
          aria-label="Scroll left"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 text-muted-foreground" />
        </button>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full",
            "bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm",
            "flex items-center justify-center transition-all duration-200",
            "hover:bg-card hover:border-border",
            "disabled:opacity-0 disabled:pointer-events-none",
            "hidden sm:flex"
          )}
          aria-label="Scroll right"
        >
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-muted-foreground" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden px-1 sm:px-10" ref={emblaRef}>
          <div className="flex gap-2 touch-pan-x">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              const projectCount = categoryProjects.filter((p) =>
                p.categories.includes(category.id)
              ).length;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full",
                    "border transition-all duration-200 touch-manipulation",
                    "min-h-[44px] select-none",
                    isSelected
                      ? `${category.bgColor} ${category.color} border-current shadow-md`
                      : "bg-card/60 backdrop-blur-sm border-border/50 text-muted-foreground hover:border-border hover:bg-card/80"
                  )}
                  aria-pressed={isSelected}
                >
                  <FontAwesomeIcon
                    icon={category.icon}
                    className={cn("w-4 h-4", isSelected ? category.color : "text-inherit")}
                  />
                  <span className="text-sm font-medium whitespace-nowrap">{category.label}</span>
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full",
                      isSelected
                        ? "bg-current/20 text-inherit"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {projectCount}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Scroll hint for mobile */}
        <div className="flex justify-center mt-2 sm:hidden">
          <span className="text-[10px] text-muted-foreground/60">← Swipe to explore →</span>
        </div>
      </div>

      {/* Filtered Projects Panel */}
      <AnimatePresence mode="wait">
        {selectedCategory && filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden mt-4"
          >
            <div className="p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {categories.find((c) => c.id === selectedCategory)?.label} Projects
                </h3>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear filter
                </button>
              </div>

              {/* Projects Grid - Swipeable on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.08,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group relative overflow-hidden rounded-lg bg-muted/50 border border-border/30 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Project Image */}
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Project Info */}
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-foreground mb-1 line-clamp-1">
                        {project.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>

                      {/* Category Tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.categories.map((catId) => {
                          const cat = categories.find((c) => c.id === catId);
                          if (!cat) return null;
                          return (
                            <span
                              key={catId}
                              className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded-full border",
                                cat.bgColor,
                                cat.color
                              )}
                            >
                              {cat.label}
                            </span>
                          );
                        })}
                      </div>

                      {/* View Link */}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary hover:underline"
                        >
                          View Project
                          <FontAwesomeIcon icon={faExternalLinkAlt} className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View All Projects Link */}
              <div className="mt-4 text-center">
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  View all projects
                  <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroCategoryCarousel;
