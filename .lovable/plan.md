# BEM Refactoring + Portfolio Case Study Expansion

## Overview

This plan covers two major enhancements:

1. Refactor About, Skills, and Contact sections to use the BEM utility classes already defined in `global.css`
2. Transform the Portfolio section from basic descriptions into compelling case studies with problem/approach/outcomes structure

---

## Part 1: BEM Refactoring for Consistency

### About Section (`src/components/About.tsx`)

**Current State:** Uses inline Tailwind classes like `py-section-sm md:py-section px-4 bg-muted/30`

**Changes:**

- Replace section wrapper with `section section--padded section--muted`
- Replace container with `section__container section__container--sm`
- Replace header block with `header`, `header__overline`, `header__title`
- Add `card--glass` to the main content card

**Key Replacements:**

```text
"relative py-section-sm md:py-section px-4 bg-muted/30 overflow-hidden"
  → "section section--padded section--muted"

"container relative z-10 mx-auto max-w-2xl glass rounded-xl..."
  → "section__container section__container--sm card card--glass"

"mb-container md:mb-container-lg"
  → "header"

"text-overline uppercase text-accent font-semibold mb-element-sm"
  → "header__overline"
```

---

### Skills Section (`src/components/Skills.tsx`)

**Current State:** Uses inline classes for section and bento grid layout

**Changes:**

- Replace section wrapper with `section section--padded section--background`
- Replace container with `section__container section__container--lg`
- Replace bento grid with `grid--bento` utility class
- Apply `card--glass` to BentoCardComponent
- Use `icon-badge icon-badge--md icon-badge--primary` for skill icons

**Key Replacements:**

```text
"relative py-section-sm md:py-section px-4 bg-background overflow-hidden"
  → "section section--padded section--background"

"grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-container"
  → "grid--bento"

Icon container: → "icon-badge icon-badge--md icon-badge--primary"
```

---

### Contact Section (`src/components/Contact.tsx`)

**Current State:** Uses inline Tailwind for sections and retro windows

**Changes:**

- Replace section wrapper with `section section--padded section--background`
- Replace container with `section__container section__container--lg`
- Replace header with BEM classes `header`, `header__overline`, `header__description`
- Use `grid--two-col` for the two-column layout
- Apply `retro-window__title-bar` and `retro-window__content` BEM classes
- Use `list`, `list__item`, `list__icon`, `list__text` for services list

**Key Replacements:**

```text
"relative py-section-sm md:py-section px-4 pb-section bg-background overflow-hidden"
  → "section section--padded section--background"

"grid sm:grid-cols-2 gap-container-lg"
  → "grid--two-col"

"retro-title-bar" → "retro-window__title-bar"
"p-card bg-card/70 backdrop-blur-sm" → "retro-window__content"

Service list items → "list__item" with "list__icon" and "list__text"
```

---

## Part 2: Portfolio Case Study Expansion

### New Data Structure

Expand `ProjectData` interface to include case study fields:

```typescript
interface ProjectData {
  title: string;
  // Case Study Fields
  problem: string;      // The challenge (1-2 sentences)
  approach: string;     // Methodology (1-2 sentences)
  outcomes: string[];   // Measurable impacts (2-4 bullet points)
  // Existing fields
  image: string;
  tags: string[];
  icon: typeof faChartLine;
  github?: string;
  live?: string;
  // Optional fields
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}
```

### Case Study Content for Each Project

**1. AI Ethics Dashboard**

- **Problem:** Organizations lacked real-time visibility into AI system fairness, making bias detection reactive rather than proactive.
- **Approach:** Built an interactive monitoring platform with automated auditing pipelines and customizable fairness thresholds.
- **Outcomes:**
  - Reduced bias detection time by 60%
  - Enabled proactive intervention in 3 enterprise deployments
  - Decreased false positive rate by 35%

**2. Governance Framework**

- **Problem:** Manual policy compliance checking created bottlenecks and inconsistencies in AI deployment approvals.
- **Approach:** Developed an automated policy engine that maps governance requirements to technical controls.
- **Outcomes:**
  - Cut compliance review time by 45%
  - Achieved 98% policy coverage across 12 regulatory frameworks
  - Reduced deployment delays by 2 weeks on average

**3. Stakeholder Mapping**

- **Problem:** Complex tech projects failed due to unidentified stakeholder conflicts and power dynamics.
- **Approach:** Created a force-directed graph visualization tool for mapping interests, influence, and potential friction points.
- **Outcomes:**
  - Identified 23 previously overlooked stakeholder conflicts
  - Improved stakeholder buy-in by 40%
  - Reduced project scope creep incidents by 30%

**4. Bias Detection API**

- **Problem:** Data scientists lacked standardized tools for measuring multiple bias types across diverse datasets.
- **Approach:** Built a RESTful API with modular bias metrics and automated reporting for ML pipelines.
- **Outcomes:**
  - Reduced bias in model outputs by 25%
  - Integrated into 5 production ML pipelines
  - Processed 2M+ bias evaluations

**5. Decision Framework**

- **Problem:** Teams made inconsistent ethical decisions under time pressure without structured guidance.
- **Approach:** Developed a mobile-first app with timed ethical frameworks and decision audit trails.
- **Outcomes:**
  - Improved decision consistency by 50%
  - Reduced ethical incidents by 35%
  - Adopted by 3 organizations

**6. Tutoring & Applied Services**

- **Problem:** Students needed personalized, adaptive learning experiences that traditional tutoring couldn't provide at scale.
- **Approach:** Built an AI-powered platform with adaptive curriculum and real-time progress tracking.
- **Outcomes:**
  - Improved student outcomes by 30%
  - Delivered 500+ tutoring sessions
  - Achieved 95% satisfaction rating

---

### Updated ProjectCard Component

The card layout will be restructured as:

```text
┌──────────────────────────────────────┐
│  [Image with hover zoom]             │
│  [Category Icon Badge]               │
├──────────────────────────────────────┤
│  Title                               │
│                                      │
│  THE CHALLENGE                       │
│  Problem description...              │
│                                      │
│  THE APPROACH                        │
│  Approach description...             │
│                                      │
│  IMPACT                              │
│  • Outcome 1                         │
│  • Outcome 2                         │
│  • Outcome 3                         │
│                                      │
│  [Tags: React, Python, ...]          │
│                                      │
│  [View Case Study Button]            │
└──────────────────────────────────────┘
```

### New BEM Classes Needed (add to global.css)

```css
/* Case Study Card */
.case-study {
  @apply flex flex-col h-full;
}
.case-study__section {
  @apply mb-element;
}
.case-study__label {
  @apply text-overline uppercase text-accent font-semibold mb-1 tracking-wide;
}
.case-study__text {
  @apply text-body-sm text-muted-foreground leading-relaxed;
}
.case-study__outcomes {
  @apply space-y-element-sm;
}
.case-study__outcome {
  @apply flex items-start gap-element-sm text-body-sm text-foreground;
}
.case-study__outcome-marker {
  @apply text-secondary font-bold;
}
```

---

## Part 3: Optional Sections

### A. Blog/Philosophy Link Section

Add a compact "Thoughts" or "Writing" section between Portfolio and Experience:

```typescript
const blogLinks = [
  {
    title: "The Ethics of AI Automation",
    platform: "Medium",
    url: "https://medium.com/@...",
    icon: faPenToSquare
  },
  // Add more as needed
];
```

If no links exist yet, show a placeholder with a future link to Substack/Medium.

### B. Testimonials (Optional)

Add testimonial capability to project cards:

```typescript
testimonial?: {
  quote: string;
  author: string;
  role: string;
}
```

Display as a collapsible or hover-revealed quote within the card.

### C. Visual Timeline Enhancement

The Experience section already has a timeline. Optionally add a compact "Project Timeline" view showing project dates chronologically.

---

## Files to be Modified

| File                           | Changes                    |
| ------------------------------ | -------------------------- |
| `src/global.css`               | Add case study BEM classes |
| `src/components/About.tsx`     | Apply BEM classes          |
| `src/components/Skills.tsx`    | Apply BEM classes          |
| `src/components/Contact.tsx`   | Apply BEM classes          |
| `src/components/Portfolio.tsx` | Full case study refactor   |

---

## Technical Details

### New CSS Classes (global.css)

```css
/* Case Study Component */
.case-study {
  @apply flex flex-col h-full;
}
.case-study__section {
  @apply mb-element;
}
.case-study__label {
  @apply text-overline uppercase text-accent font-semibold mb-1 tracking-wide;
  font-size: 0.65rem;
}
.case-study__text {
  @apply text-body-sm text-muted-foreground leading-relaxed;
}
.case-study__outcomes {
  @apply space-y-element-sm;
}
.case-study__outcome {
  @apply flex items-start gap-element-sm text-body-sm text-foreground;
}
.case-study__outcome-marker {
  @apply text-secondary font-bold flex-shrink-0;
}

/* Blog/Writing Section */
.writing-link {
  @apply flex items-center gap-element p-card-sm rounded-lg glass;
  @apply hover:bg-primary/5 transition-colors;
}
.writing-link__icon {
  @apply text-primary;
}
.writing-link__title {
  @apply text-body-sm font-medium text-foreground;
}
.writing-link__platform {
  @apply text-caption text-muted-foreground;
}

/* Testimonial */
.testimonial {
  @apply mt-element pt-element border-t border-border/50;
}
.testimonial__quote {
  @apply text-caption italic text-muted-foreground leading-relaxed;
}
.testimonial__author {
  @apply text-caption font-medium text-foreground mt-element-sm;
}
.testimonial__role {
  @apply text-caption text-muted-foreground;
}
```

### Updated ProjectData Interface

```typescript
interface ProjectData {
  title: string;
  // Case Study
  problem: string;
  approach: string;
  outcomes: string[];
  // Media
  image: string;
  tags: string[];
  icon: typeof faChartLine;
  // Links
  github?: string;
  live?: string;
  // Optional
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}
```

### Sample Case Study Card JSX Structure

```tsx
<div className="case-study card__content">
  <h3 className="text-subheading font-display font-semibold mb-element">
    {project.title}
  </h3>

  {/* Problem */}
  <div className="case-study__section">
    <p className="case-study__label">The Challenge</p>
    <p className="case-study__text">{project.problem}</p>
  </div>

  {/* Approach */}
  <div className="case-study__section">
    <p className="case-study__label">The Approach</p>
    <p className="case-study__text">{project.approach}</p>
  </div>

  {/* Outcomes */}
  <div className="case-study__section">
    <p className="case-study__label">Impact</p>
    <ul className="case-study__outcomes">
      {project.outcomes.map((outcome, i) => (
        <li key={i} className="case-study__outcome">
          <span className="case-study__outcome-marker">+</span>
          <span>{outcome}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Tags */}
  <div className="flex flex-wrap gap-element-sm mt-auto pt-element">
    {project.tags.map((tag) => (
      <Tag key={tag} variant="default" size="sm">{tag}</Tag>
    ))}
  </div>
</div>
```

---

## Expected Outcome

- **Consistent BEM architecture** across all sections matching Portfolio and Experience
- **Portfolio transformed into case studies** with clear problem/approach/outcomes structure
- **Measurable metrics** demonstrating real impact (e.g., "Reduced bias by 25%")
- **Professional credibility** through structured, scannable content
- **Distinct identity** tailored to AI ethics audience, not a generic portfolio
- **Optional extensibility** for blog links and testimonials when content is available
