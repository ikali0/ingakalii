import { motion } from "framer-motion";
import { useEffect } from "react";
import { SectionHeader } from "./ui/section-header";

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
  medium: "border-l-4 border-l-black dark:border-l-white",
  substack: "border-l-4 border-l-orange-500",
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
  return <section id="blog" className="relative px-4 bg-background overflow-hidden py-[90px]">
      
    </section>;
}