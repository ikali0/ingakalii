/**
 * AI Ethics Blog Section Component
 *
 * Displays article previews with external links to Substack/Medium.
 * Features a clean card-based layout with reading time estimates.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock, faBookOpen, faScaleBalanced, faGavel } from "@fortawesome/free-solid-svg-icons";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { SectionHeader } from "./ui/section-header";
import { ScrollFade, StaggerContainer, StaggerItem } from "./ui/scroll-fade";
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
  title: '"Fairness" Is Not a Metric',
  excerpt: "A critical examination of how fairness metrics can obscure rather than reveal the ethical dimensions of algorithmic systems.",
  readTime: "8 min read",
  publishDate: "Jan 2025",
  category: "Bias & Measurement",
  icon: faScaleBalanced,
  url: "https://medium.com/@altruisticxai/the-geometry-of-fairness-when-metrics-route-morality-0d78beb38661",
  platform: "medium",
  featured: true
}, {
  title: "AI Ethics Is the New Risk Frontier",
  excerpt: "Why the NIST AI Risk Management Framework succeeds or fails based on human judgment, incentives, and organizational power—not checklists.",
  readTime: "7 min read",
  publishDate: "Jan 2025",
  category: "AI Governance",
  icon: faGavel,
  url: "https://ingakali.substack.com/p/frameworks-dont-governpeople-do",
  platform: "substack",
  featured: true
}];
interface ArticleCardProps {
  article: BlogArticle;
}
function ArticleCard({
  article
}: ArticleCardProps) {
  return <motion.a href={article.url} target="_blank" rel="noopener noreferrer" className="group block border border-border/50 bg-card/50 backdrop-blur-sm rounded-lg p-6 hover:border-border hover:bg-card/80 transition-all duration-200 px-[20px] py-[20px]" whileHover={{
    y: -2
  }} whileTap={{
    scale: 0.995
  }}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-secondary-foreground text-neural">
            <FontAwesomeIcon icon={article.icon} className="w-5 h-5 text-foreground/70 text-[sidebar-primary-foreground]" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              {article.category}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <FontAwesomeIcon icon={article.platform === "medium" ? faMedium : faBookOpen} className="w-3.5 h-3.5" />
          <span>{article.platform === "medium" ? "Medium" : "Substack"}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed mb-4 text-xs">
        {article.excerpt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{article.publishDate}</span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>

        <span className="flex items-center gap-1.5 text-sm text-primary font-medium group-hover:gap-2 transition-all">
          Read essay
          <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
        </span>
      </div>
    </motion.a>;
}
const AIEthicsBlog = () => <section id="blog" className="relative py-section px-4 overflow-hidden">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
    </div>

    <div className="container relative z-10 mx-auto max-w-3xl">
      <ScrollFade>
        <SectionHeader overline="Selected Writing" title="Research & Analysis" description="Long-form essays on AI ethics, governance, and the systems that shape algorithmic accountability." />
      </ScrollFade>

      <StaggerContainer className="grid gap-6">
        {articles.map(article => <StaggerItem key={article.title}>
            <ArticleCard article={article} />
          </StaggerItem>)}
      </StaggerContainer>
    </div>
  </section>;
export default AIEthicsBlog;