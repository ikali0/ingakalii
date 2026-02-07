/**
 * AI Ethics Blog Section Component
 * Clean, accessible, token-driven, animated.
 */

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faClock,
  faBookOpen,
  faScaleBalanced,
  faGavel,
} from "@fortawesome/free-solid-svg-icons"
import { faMedium } from "@fortawesome/free-brands-svg-icons"

import { SectionHeader } from "./ui/section-header"

/* ---------------- Types ---------------- */

interface BlogArticle {
  title: string
  excerpt: string
  readTime: string
  publishDate: string
  category: string
  icon: any
  url: string
  platform: "medium" | "substack"
  featured?: boolean
}

/* ---------------- Data ---------------- */

const articles: BlogArticle[] = [
  {
    title: `"Fairness" Is Not a Metric`,
    excerpt:
      "A critical examination of how fairness metrics can obscure rather than reveal ethical dimensions.",
    readTime: "8 min read",
    publishDate: "Jan 2025",
    category: "Bias & Measurement",
    icon: faScaleBalanced,
    url: "https://medium.com/",
    platform: "medium",
    featured: true,
  },
  {
    title: "AI Ethics Is the New Risk Frontier",
    excerpt:
      "Why governance frameworks succeed or fail based on incentives and institutional power.",
    readTime: "7 min read",
    publishDate: "Jan 2025",
    category: "AI Governance",
    icon: faGavel,
    url: "https://substack.com/",
    platform: "substack",
    featured: true,
  },
]

/* ---------------- Card ---------------- */

function ArticleCard({ article }: { article: BlogArticle }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.a
      ref={ref}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      className="group block rounded-lg border border-border/40 bg-card p-card shadow-soft transition-colors hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-primary/10">
            <FontAwesomeIcon
              icon={article.icon}
              className="w-5 h-5 text-primary"
            />
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              {article.category}
            </span>
          </div>
        </div>

        {/* Platform badge */}
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          {article.platform === "medium" && (
            <>
              <FontAwesomeIcon icon={faMedium} className="w-3 h-3" />
              Medium
            </>
          )}
          {article.platform === "substack" && (
            <>
              <FontAwesomeIcon icon={faBookOpen} className="w-3 h-3" />
              Substack
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-body font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-body-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
        {article.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs text-muted-foreground">

        <div className="flex items-center gap-2">
          <span>{article.publishDate}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <span className="flex items-center gap-1 font-medium text-primary">
          Read
          <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
        </span>
      </div>
    </motion.a>
  )
}

/* ---------------- Section ---------------- */

export default function AIEthicsBlog() {
  return (
    <section
      id="blog"
      className="relative py-section px-4 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeader
          overline="Selected Writing"
          title="Research & Analysis"
          description="Long-form essays on AI ethics, governance, and algorithmic accountability."
        />

        <div className="grid gap-6 mt-8">
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
