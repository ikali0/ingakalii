"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./ui/section-header";

/* ---------------- Links ---------------- */

const mediumUrl =
  "https://medium.com/@altruisticxai/the-geometry-of-fairness-when-metrics-route-morality-0d78beb38661";

const substackMainUrl =
  "https://ingakali.substack.com/p/frameworks-dont-governpeople-do";

const predictionsUrl =
  "https://open.substack.com/pub/ingakali/p/2026-ai-predictions-vs-reality?r=7e4ma3&utm_campaign=post&utm_medium=web";

/* ---------------- Animated Card ---------------- */

function AnimatedCard({
  title,
  excerpt,
  href,
  platform,
}: {
  title: string;
  excerpt: string;
  href: string;
  platform: "Medium" | "Substack";
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group block rounded-2xl border border-border/40 bg-card p-6
                 shadow-sm transition-all hover:border-primary/40
                 hover:shadow-md"
    >
      <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground uppercase tracking-wide">
        <span>{platform}</span>
        <span>Read →</span>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {excerpt}
      </p>
    </motion.a>
  );
}

/* ---------------- Blog Section ---------------- */

export default function AIBlogSection() {
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
          <AnimatedCard
            title="The Geometry of Fairness"
            excerpt="When metrics route morality and algorithmic design choices shape ethical outcomes."
            href={mediumUrl}
            platform="Medium"
          />

          {/* Substack Official Embed */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
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

            <Script
              src="https://substack.com/embedjs/embed.js"
              strategy="lazyOnload"
            />
          </motion.div>

          {/* 2026 Predictions Article */}
          <AnimatedCard
            title="2026 AI Predictions vs Reality"
            excerpt="Examining forecast narratives against institutional constraints and structural incentives."
            href={predictionsUrl}
            platform="Substack"
          />

        </div>
      </div>
    </section>
  );
}
