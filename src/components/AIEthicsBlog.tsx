import { motion } from "framer-motion";
import { useEffect } from "react";

/* ---------------- Articles ---------------- */

const articles = [{
  title: "The Geometry of Fairness",
  excerpt: "When metrics route morality and algorithmic design choices shape ethical outcomes.",
  url: "https://medium.com/@altruisticxai/the-geometry-of-fairness-when-metrics-route-morality-0d78beb38661",
  featured: true
}, {
  title: "AI Ethics Is the New Risk Frontier",
  excerpt: "Why optimism and pessimism about AI both circle back to the same governance gap.",
  url: "https://ingakali.substack.com/p/frameworks-dont-governpeople-do",
  embed: true
}, {
  title: "2026 AI Predictions vs Reality",
  excerpt: "Examining forecast narratives against institutional constraints and structural incentives.",
  url: "https://open.substack.com/pub/ingakali/p/2026-ai-predictions-vs-reality?r=7e4ma3&utm_campaign=post&utm_medium=web"
}];

/* ---------------- Helpers ---------------- */

const getPlatform = (url: string) => {
  if (url.includes("medium.com")) return "medium";
  if (url.includes("substack.com")) return "substack";
  return "external";
};
const platformStyles: Record<string, string> = {
  medium: "border-l-4 border-l-foreground",
  substack: "border-l-4 border-l-accent",
  external: "border-l-4 border-l-primary"
};

/* ---------------- Component ---------------- */

export default function AIEthicsBlog() {
  // Load Substack embed script once
  useEffect(() => {
    if (document.getElementById("substack-embed-script")) return;
    const script = document.createElement("script");
    script.src = "https://substack.com/embedjs/embed.js";
    script.async = true;
    script.id = "substack-embed-script";
    document.body.appendChild(script);
  }, []);
  const featured = articles.find(a => a.featured);
  const secondary = articles.filter(a => !a.featured);
  return <section id="writing" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent text-xl animate-spin" style={{
            animationDuration: '3s'
          }}>✱</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Writing
            </span>
          </div>
          
          
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Featured Article */}
          {featured && <motion.a href={featured.url} target="_blank" rel="noopener noreferrer" className={`block p-6 rounded-xl bg-card border border-border/40 hover:border-primary/30 transition-all ${platformStyles[getPlatform(featured.url)]}`} whileHover={{
          y: -4
        }} transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }}>
              <span className="text-xs uppercase tracking-widest text-accent mb-2 block">
                Featured
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {featured.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {featured.excerpt}
              </p>
            </motion.a>}

          {/* Secondary Articles */}
          <div className="space-y-4">
            {secondary.map(article => <motion.a key={article.title} href={article.url} target="_blank" rel="noopener noreferrer" className={`block p-5 rounded-lg bg-card border border-border/40 hover:border-primary/30 transition-all ${platformStyles[getPlatform(article.url)]}`} whileHover={{
            y: -2
          }} transition={{
            type: "spring",
            stiffness: 300,
            damping: 25
          }}>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {article.excerpt}
                </p>
              </motion.a>)}
          </div>
        </div>
      </div>
    </section>;
}