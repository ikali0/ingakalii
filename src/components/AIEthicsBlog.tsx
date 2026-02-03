/**
 * AI Ethics Blog Section Component
 * 
 * Displays article previews with external links to Substack/Medium.
 * Features a clean card-based layout with reading time estimates.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock, faBookOpen, faScaleBalanced, faBrain, faShieldHalved, faGavel } from "@fortawesome/free-solid-svg-icons";
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
const articles: BlogArticle[] = [{
  title: "Building Fairness Metrics That Actually Matter",
  excerpt: "A practical guide to selecting and implementing fairness metrics that align with your organization's values and regulatory requirements.",
  readTime: "8 min read",
  publishDate: "Jan 2025",
  category: "Bias Detection",
  icon: faScaleBalanced,
  url: "https://medium.com/@yourusername/building-fairness-metrics",
  platform: "medium",
  featured: true
}, {
  title: "NIST AI RMF: From Framework to Implementation",
  excerpt: "How to translate the NIST AI Risk Management Framework into actionable technical controls for your ML pipeline.",
  readTime: "12 min read",
  publishDate: "Dec 2024",
  category: "Governance",
  icon: faGavel,
  url: "https://yourusername.substack.com/p/nist-ai-rmf-implementation",
  platform: "substack"
}, {
  title: "The Hidden Costs of Algorithmic Bias",
  excerpt: "Exploring the financial, reputational, and human costs when AI systems perpetuate discrimination.",
  readTime: "6 min read",
  publishDate: "Nov 2024",
  category: "Ethics",
  icon: faBrain,
  url: "https://medium.com/@yourusername/hidden-costs-algorithmic-bias",
  platform: "medium"
}, {
  title: "Red Teaming AI Systems: A Security Perspective",
  excerpt: "Lessons from penetration testing applied to AI safety and adversarial robustness testing.",
  readTime: "10 min read",
  publishDate: "Oct 2024",
  category: "Security",
  icon: faShieldHalved,
  url: "https://yourusername.substack.com/p/red-teaming-ai-systems",
  platform: "substack"
}];
interface ArticleCardProps {
  article: BlogArticle;
}
function ArticleCard({
  article
}: ArticleCardProps) {
  return <motion.a href={article.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col h-full rounded-xl glass shadow-soft overflow-hidden touch-manipulation" whileHover={{
    y: -4,
    scale: 1.01
  }} whileTap={{
    scale: 0.99
  }} transition={{
    type: "spring",
    stiffness: 400,
    damping: 25
  }}>
      {/* Featured Badge */}
      {article.featured && <div className="bg-gradient-to-r from-primary to-accent px-3 py-1 text-center">
          <span className="text-[0.625rem] uppercase tracking-wider font-bold text-primary-foreground">
            Featured Article
          </span>
        </div>}

      <div className="flex flex-col flex-1 p-card">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-element-sm mb-element">
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

        {/* Title */}
        <h3 className="text-body font-semibold text-foreground leading-tight mb-element-sm group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        

        {/* Footer */}
        <div className="flex items-center justify-between pt-element border-t border-border/50">
          <div className="flex items-center gap-element text-caption text-muted-foreground">
            <span>{article.publishDate}</span>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
              <span>{article.readTime}</span>
            </div>
          </div>
          
          {/* Read More Arrow */}
          <motion.div className="flex items-center gap-1 text-primary text-caption font-medium" whileHover={{
          x: 4
        }}>
            <span>Read</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
          </motion.div>
        </div>
      </div>
    </motion.a>;
}
const AIEthicsBlog = () => {
  return <section id="blog" className="relative py-section-sm md:py-section px-4 bg-background overflow-hidden" aria-labelledby="blog-heading">
      {/* Abstract background */}
      <GradientMesh className="inset-0 w-full h-full opacity-30" />
      <ParallaxShape speed={0.15} rotateAmount={15} className="w-32 h-32 top-20 right-[5%]">
        <CircleShape className="w-full h-full opacity-40" />
      </ParallaxShape>

      <div className="container relative z-10 mx-auto max-w-5xl">
        <ScrollFade>
          <SectionHeader overline="Insights" title="AI Ethics Blog" description="Thoughts on building responsible AI systems, governance frameworks, and the intersection of technology and ethics." />
        </ScrollFade>

        {/* Articles Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-card" staggerDelay={0.1}>
          {articles.map(article => <StaggerItem key={article.title}>
              <ArticleCard article={article} />
            </StaggerItem>)}
        </StaggerContainer>

        {/* CTA to view all articles */}
        <ScrollFade delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-element mt-container">
            <motion.a href="https://medium.com/@yourusername" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-element-sm px-6 py-3 min-h-[48px] rounded-lg bg-muted hover:bg-muted/80 active:bg-muted/60 text-foreground text-body-sm font-medium transition-colors touch-manipulation" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              <FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
              <span>View All on Medium</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 opacity-60" />
            </motion.a>
            
            <motion.a href="https://yourusername.substack.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-element-sm px-6 py-3 min-h-[48px] rounded-lg bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground text-body-sm font-medium transition-colors touch-manipulation" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4" />
              <span>Subscribe on Substack</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 opacity-60" />
            </motion.a>
          </div>
        </ScrollFade>
      </div>
    </section>;
};
export default AIEthicsBlog;