

# About Section Redesign Plan

## Overview
Transform the current About section to match the reference design featuring a modern, two-column editorial layout with animated text reveals, professional statistics, and a call-to-action.

---

## Design Changes

### Current State
- Simple glassmorphism card container
- Three highlight cards with flip animations
- Basic paragraphs with inline links
- Abstract background shapes with parallax

### Target State
- Split-panel layout: left info column + right content column
- Animated text reveals using VerticalCutReveal component
- Professional statistics with scroll animations
- "Let's Collaborate" CTA button
- Social icons integrated into header area
- Profile image placeholder

---

## Implementation Steps

### Step 1: Create VerticalCutReveal Component
**File:** `src/components/ui/vertical-cut-reveal.tsx`

Create the animated text reveal component from the reference code:
- Supports character/word/line-based splitting
- Staggered reveal animations with blur effect
- Configurable timing and direction
- Framer Motion integration

### Step 2: Create TimelineContent Animation Wrapper
**File:** `src/components/ui/timeline-animation.tsx`

Create the scroll-triggered animation wrapper:
- Uses IntersectionObserver via framer-motion's whileInView
- Supports custom animation variants
- Handles viewport visibility for triggering

### Step 3: Redesign About Component
**File:** `src/components/About.tsx`

**Layout Structure:**
```text
+--------------------------------------------------+
|  [Header Bar]                                     |
|  WHO I AM label + social icons                   |
+--------------------------------------------------+
|                                                   |
|  [Stats Bar]                                      |
|  5+ years | 20+ publications | AI Ethics focus   |
|                                                   |
+-------------------------+-------------------------+
|                         |                         |
|  [Main Content]         |  [Right Panel]          |
|                         |                         |
|  Large animated title:  |  INGA KALII             |
|  "Examining AI's        |  AI Ethics Researcher   |
|   Real-World Impact"    |                         |
|                         |  Ready to connect?      |
|  Two columns of body    |                         |
|  text with scroll       |  [LET'S COLLABORATE]    |
|  reveal animations      |                         |
|                         |                         |
+-------------------------+-------------------------+
```

**Content Mapping (adapted for AI Ethics focus):**
- Header: "WHO I AM" with LinkedIn, Email, Substack, Ko-fi icons
- Stats: "5+ years experience" | "20+ articles" | "AI Ethics & Governance"
- Title: "Examining AI's Real-World Impact."
- Body paragraphs: Reuse existing 120-word about content, split into two columns
- Right panel: Name, title, CTA button linking to contact section

**Animation Details:**
- VerticalCutReveal on the main heading with staggered character reveal
- TimelineContent wrappers on body paragraphs for scroll-triggered fade/blur
- Framer Motion scale/opacity on stats elements

---

## Technical Details

### Dependencies
Already installed:
- `framer-motion` (v12.26.1)
- `lucide-react` (v0.462.0)

### New Components

**vertical-cut-reveal.tsx:**
- Props: `children`, `splitBy`, `staggerDuration`, `staggerFrom`, `transition`, `reverse`, `autoStart`
- Ref methods: `startAnimation()`, `reset()`
- Uses Intl.Segmenter for proper Unicode/emoji handling

**timeline-animation.tsx:**
- Simple wrapper using framer-motion's whileInView
- Accepts custom variants for visible/hidden states

### Style Integration
- Use existing Tailwind config tokens (spacing, typography)
- Apply BEM conventions from `global.css`
- Maintain glass/card effects from current design system
- Dark mode compatible using CSS variables

### Responsive Behavior
- Mobile: Single column stacked layout
- Tablet (md): Two-column grid begins
- Desktop (lg): Full split-panel layout

---

## Files Modified/Created

| File | Action |
|------|--------|
| `src/components/ui/vertical-cut-reveal.tsx` | Create |
| `src/components/ui/timeline-animation.tsx` | Create |
| `src/components/About.tsx` | Rewrite |

---

## Preserved Elements
- Substack link: https://substack.com/@ingakali
- Ko-fi link: https://ko-fi.com/ingakali
- LinkedIn and Email social links from Hero
- Core about me content (AI ethics, accountability, transparency themes)
- Section ID `#about` for navigation

