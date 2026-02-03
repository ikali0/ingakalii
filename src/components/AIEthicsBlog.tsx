import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClock,
  faBookOpen,
  faScaleBalanced,
  faBrain,
  faShieldHalved,
  faGavel,
} from "@fortawesome/free-solid-svg-icons";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { SectionHeader } from "./ui/section-header";
import { Tag } from "./ui/tag";
import { ScrollFade, StaggerContainer, StaggerItem } from "./ui/scroll-fade";
import { GradientMesh } from "./ui/abstract-shapes";

interface BlogArticle {
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  category: string;
  icon: typeof faBookOpen;
  url: string;
  platform: "medium" | "substack";
  featured?: boolean;
}

const allArticles: BlogArticle[] = [
  {
    title: "Fairness Is Not a Metric",
    excerpt: "Reframing algorithmic fairness as an epistemological and justice-based challenge.",
    readTime: "8 min read",
    publishDate: "Jan 2025",
    category: "Bias Detection",
    icon: faScaleBalanced,
    url: "https://medium.com/@altruisticxai/the-geometry-of-fairness-when-metrics-route-morality-0d78beb38661",
    platform: "medium",
  },
  {
    title: "Frameworks Don’t Govern — People Do",
    excerpt:
      "Why the NIST AI Risk Management Framework succeeds or fails based on human judgment, incentives, and organizational power—not checklists.",
    readTime: "7 min read",
    publishDate: "Jan 2025",
    category: "AI Governance",
    icon: faGavel,
    url: "https://ingakali.substack.com/p/frameworks-dont-governpeople-do",
    platform: "substack",
    featured: true,
  },
  {
    title: "The Hidden Costs of Algorithmic Bias",
    excerpt: "Exploring the financial, reputational, and human costs when AI systems perpetuate discrimination.",
    readTime: "6 min read",
    publishDate: "Nov 2024",
    category: "Ethics",
    icon: faBrain,
    url: "https://medium.com/@yourusername/hidden-costs-algorithmic-bias",
    platform: "medium",
  },
  {
    title: "Red Teaming AI Systems: A Security Perspective",
    excerpt: "Lessons from penetration testing applied to AI safety and adversarial robustness testing.",
    readTime: "10 min read",
    publishDate: "Oct 2024",
    category: "Security",
    icon: faShieldHalved,
    url: "https://yourusername.substack.com/p/red-teaming-ai-systems",
    platform: "substack",
  },
  // Add more articles here if needed
];

// Skeleton Loader for placeholders
const ArticleCardSkeleton = () => (
  <div
    className="animate-pulse flex flex-col h-full rounded-xl glass shadow-soft overflow-hidden p-6"
    aria-hidden="true"
  >
    <div className="h-6 w-32 bg-gray-300 rounded mb-4" />
    <div className="h-8 bg-gray-300 rounded mb-3" />
    <div className="h-4 bg-gray-300 rounded mb-6" />
    <div className="flex justify-between items-center mt-auto">
      <div className="h-4 w-24 bg-gray-300 rounded" />
      <div className="h-4 w-12 bg-gray-300 rounded" />
    </div>
  </div>
);

interface ArticleCardProps {
  article: BlogArticle;
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full rounded-xl glass shadow-soft overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      aria-label={`Read article titled ${article.title} on ${article.platform}`}
    >
      {article.featured && (
        <div className="bg-gradient-to-r from-primary to-accent px-3 py-1 text-center">
          <span className="text-[0.625rem] uppercase tracking-wider font-bold text-primary-foreground">
            Featured Article
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FontAwesomeIcon icon={article.icon} className="w-4 h-4 text-primary" />
            </div>
            <Tag variant="muted" size="sm">
              {article.category}
            </Tag>
          </div>

          <div className="flex items-center gap-1 text-caption text-muted-foreground">
            <FontAwesomeIcon
              icon={article.platform === "medium" ? faMedium : faBookOpen}
              className="w-3 h-3"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">{article.platform === "medium" ? "Medium" : "Substack"}</span>
          </div>
        </div>

        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>

        <p className="flex-1 text-muted-foreground mb-4">{article.excerpt}</p>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-3 text-caption text-muted-foreground">
            <span>{article.publishDate}</span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="w-3 h-3" aria-hidden="true" />
              {article.readTime}
            </span>
          </div>

          <span className="flex items-center gap-1 text-primary text-caption font-medium">
            Read <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

// Error Boundary Component to catch render errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="p-6 text-center text-red-600 font-semibold" tabIndex={0} aria-live="assertive">
          Something went wrong while loading the blog articles. Please try again later.
        </div>
      );
    }
    return this.props.children;
  }
}

const PAGE_SIZE = 2;

const AIEthicsBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [error, setError] = useState(false);

  // Simulate fetch delay
  useEffect(() => {
    setLoading(true);
    setError(false);

    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      try {
        // Replace here with real fetch logic if needed
        setArticles(allArticles);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Pagination handlers
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages],
  );

  const pagedArticles = articles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section id="blog" className="relative py-16 px-4 overflow-hidden" aria-labelledby="blog-heading">
      <GradientMesh className="absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-5xl">
        <ScrollFade>
          <SectionHeader
            id="blog-heading"
            overline="Insights"
            title="AI Ethics Blog"
            description="Thoughts on responsible AI, governance frameworks, and the human systems behind them."
          />
        </ScrollFade>

        <ErrorBoundary>
          {loading ? (
            <StaggerContainer className="grid md:grid-cols-2 gap-8" aria-busy="true" aria-live="polite">
              {[...Array(PAGE_SIZE)].map((_, idx) => (
                <StaggerItem key={`loading-${idx}`}>
                  <ArticleCardSkeleton />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : error ? (
            <div role="alert" className="p-6 text-center text-red-600 font-semibold" tabIndex={0} aria-live="assertive">
              Failed to load articles. Please try again later.
            </div>
          ) : (
            <>
              <StaggerContainer className="grid md:grid-cols-2 gap-8" role="list">
                {pagedArticles.map((article) => (
                  <StaggerItem key={article.title} role="listitem">
                    <ArticleCard article={article} />
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <nav aria-label="Pagination" className="flex justify-center mt-8 space-x-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    ← Prev
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    const isActive = page === currentPage;
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        aria-current={isActive ? "page" : undefined}
                        className={`px-3 py-1 rounded border ${
                          isActive
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        aria-label={`Page ${page}`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    Next →
                  </button>
                </nav>
              )}
            </>
          )}
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default AIEthicsBlog;
