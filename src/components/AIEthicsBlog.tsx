/**
 * AI Ethics Blog Section Component
 *
 * Displays article previews with external links to Substack/Medium.
 * Features a clean card-based layout with reading time estimates.
 */
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
import { GradientMesh, ParallaxShape, CircleShape } from "./ui/abstract-shapes";

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

const articles: BlogArticle[] = [
  {
    title: "Building Fairness Metrics That Actually Matter",
    excerpt:
      "A practical guide to selecting and implementing fairness metrics that align with your organization's values and regulatory requirements.",
    readTime: "8 min read",
    publishDate: "Jan 2025",
    category: "Bias Detection",
    icon: faScaleBalanced,
    url: "https://medium.com/@yourusername/building-fairness-metrics",
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
];

interface ArticleCardProps {
  article: BlogArticle;
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full rounded-xl glass shadow-soft overflow-hidden"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {article.featured && (
        <div className="bg-gradient-to-r from-primary to-accent px-3 py-1 text-center">
          <span className="text-[0.625rem] uppercase tracking-wider font-bold text-primary-foreground">
            Featured Article
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-card">
        <div className="flex items-center justify-between mb-element">
          <div className="flex items-center gap-element-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FontAwesomeIcon icon={article.icon} className="w-4 h-4 text-primary" />
            </div>
            <Tag variant="muted" size="sm">
              {article.category}
            </Tag>
          </div>

          <div className="flex items-center gap-1 text-caption text-muted-foreground">
            <FontAwesomeIcon icon={article.platform === "medium" ? faMedium : faBookOpen} className="w-3 h-3" />
            <span className="hidden sm:inline">{article.platform === "medium" ? "Medium" : "Substack"}</span>
          </div>
        </div>

        <h3 className="font-semibold mb-element-sm group-hover:text-primary transition-colors">{article.title}</h3>

        <p className="text-muted-foreground line-clamp-3 flex-1">{article.excerpt}</p>

        <div className="flex items-center justify-between pt-element border-t">
          <div className="flex items-center gap-element text-caption text-muted-foreground">
            <span>{article.publishDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <span className="flex items-center gap-1 text-primary text-caption font-medium">
            Read <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

const AIEthicsBlog = () => (
  <section id="blog" className="relative py-section px-4 overflow-hidden">
    <GradientMesh className="absolute inset-0 opacity-30" />

    <div className="container relative z-10 mx-auto max-w-5xl">
      <ScrollFade>
        <SectionHeader
          overline="Insights"
          title="AI Ethics Blog"
          description="Thoughts on responsible AI, governance frameworks, and the human systems behind them."
        />
      </ScrollFade>

      <StaggerContainer className="grid md:grid-cols-2 gap-card">
        {articles.map((article) => (
          <StaggerItem key={article.title}>
            <ArticleCard article={article} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default AIEthicsBlog;
