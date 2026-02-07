import { motion } from "framer-motion";
import { useEffect } from "react";
import { SectionHeader } from "./ui/section-header";

/* ---------------- Links ---------------- */

const mediumUrl =
  "https://medium.com/@altruisticxai/the-geometry-of-fairness-when-metrics-route-morality-0d78beb38661";

const substackMainUrl =
  "https://ingakali.substack.com/p/frameworks-dont-governpeople-do";

const predictionsUrl =
  "https://open.substack.com/pub/ingakali/p/2026-ai-predictions-vs-reality?r=7e4ma3&utm_campaign=post&utm_medium=web";

/* ---------------- Blog Section ---------------- */

export default function AIEthicsBlog() {
  // Load Substack embed script safely
  useEffect(() => {
    if (document.getElementById("substack-embed-script")) return;

    const script = document.createElement("script");
    script.src = "https://substack.com/embedjs/embed.js";
    script.async = true;
    script.id = "substack-embed-script";
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="blog"
      className="relative py-24 px-4 bg-background overflow-hidden"
    >
      <div className="relative mx-auto max-w-3xl space-y-12">

        <SectionHeader
          overline="Selected Writing"
          title="AI Ethics & Governance"
          description="Long-form essays on algorithmic accountability, institutional risk, and moral architectures."
        />

        <div className="grid gap-8">

          {/* Medium Article */}
          <motion.a
            href={mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="block rounded-2xl border border-border/40 bg-card p-6 shadow-sm
                       hover:border-primary/40 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              The Geometry of Fairness
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              When metrics route morality and algorithmic design choices shape ethical outcomes.
            </p>
            <span className="text-xs font-medium text-primary">
              Read on Medium →
            </span>
          </motion.a>

          {/* Substack Official Embed */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm"
          >
            <div
              className="substack-post-embed"
              data-post-link={substackMainUrl}
            >
              <p lang="en">
                AI Ethics Is the New Risk Frontier by I.K.
              </p>
              <p>
                Why optimism and pessimism about AI both circle back to the same governance gap.
              </p>
              <a
                href={substackMainUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read on Substack
              </a>
            </div>
          </motion.div>

          {/* 2026 Predictions Article */}
          <motion.a
            href={predictionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="block rounded-2xl border border-border/40 bg-card p-6 shadow-sm
                       hover:border-primary/40 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              2026 AI Predictions vs Reality
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Examining forecast narratives against institutional constraints and structural incentives.
            </p>
            <span className="text-xs font-medium text-primary">
              Read on Substack →
            </span>
          </motion.a>

        </div>
      </div>
    </section>
  );
}
