
# Mobile/Tablet UX Audit + React Runtime Error Fix

## Overview
This plan addresses two critical issues: a React runtime error causing blank screens and a comprehensive mobile/tablet UX audit to ensure the portfolio feels intentional and polished on all devices.

---

## Part 1: Fix React Runtime Error (Priority: Critical)

### Root Cause Analysis
The error `Cannot read properties of null (reading 'useEffect')` in `@tanstack/react-query` indicates a **duplicate React instance** being bundled by Vite. While `package.json` shows aligned React versions (18.3.1), the bundler may resolve React differently for different dependencies.

### Solution
Add React deduplication to `vite.config.ts`:

```text
File: vite.config.ts

Add resolve.dedupe configuration to force a single React instance:

resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  dedupe: ["react", "react-dom"],
},
```

This is a one-line addition that prevents Vite from bundling multiple React instances.

---

## Part 2: Mobile/Tablet UX Audit

### Issues Identified

#### A. Spacing & Typography Inconsistencies
| Issue | Location | Fix |
|-------|----------|-----|
| Hero section uses `min-h-[100svh]` but `pt-20` may clip content on short screens | `Hero.tsx` | Add responsive padding adjustment |
| Portfolio cards have inconsistent tap target sizes | `Portfolio.tsx` | Ensure all buttons meet 44px minimum |
| Bento grid cards collapse poorly on tablet (768-1024px) | `Skills.tsx` | Add `lg:` breakpoint adjustments |

#### B. Navigation & Tap Targets
| Issue | Location | Fix |
|-------|----------|-----|
| Mobile nav sheet close button is 16x16px (too small) | `sheet.tsx` | Increase to 44x44px tap area |
| Navbar hamburger icon container is 44px but visual target appears smaller | `Navbar.tsx` | Add visual padding/background |
| Start menu items already have `min-h-[44px]` (good) | `retro-taskbar.tsx` | Verified compliant |

#### C. Animation & Hover State Degradation
| Issue | Location | Fix |
|-------|----------|-----|
| 3D card hover effects use `@media (hover: hover)` (good) | `index.css` | Already handled |
| Framer Motion `whileHover` should pair with `whileTap` | Various | Add `whileTap` where missing |
| Portfolio card `whileHover={{ scale: 1.01 }}` has no `whileTap` fallback | `Portfolio.tsx` | Add `whileTap={{ scale: 0.99 }}` |

#### D. Overlapping/Clipped Elements
| Issue | Location | Fix |
|-------|----------|-----|
| Metric badge on portfolio cards may overflow on small screens | `Portfolio.tsx` | Add text truncation + responsive sizing |
| Career timeline nodes position may overlap on narrow screens | `project-timeline.tsx` | Review positioning |
| Contact section `pb-section` may conflict with taskbar | `Contact.tsx` | Adjust bottom padding |

#### E. Font Scaling Issues
| Issue | Location | Fix |
|-------|----------|-----|
| Display-XL (4.5rem) may be too large on mobile | `tailwind.config.ts` | Already has responsive classes |
| Overline text (0.6875rem) may be too small on mobile | Various | Add `sm:text-xs` fallback |

---

## Implementation Plan

### Step 1: Fix Vite Config (Critical)
Update `vite.config.ts` to dedupe React.

### Step 2: Improve Sheet Component Tap Targets
Update `sheet.tsx` close button from 16x16px to include a 44x44px touch target.

### Step 3: Enhance Mobile Navbar
- Add visual background to hamburger button on scroll
- Increase touch feedback visibility

### Step 4: Fix Portfolio Card Mobile Issues
- Add `whileTap` fallback to all cards
- Ensure metric badges truncate properly
- Add responsive text sizing for case study content

### Step 5: Improve Skills Bento Grid Tablet Layout
- Add intermediate breakpoint handling for 768-1024px screens
- Ensure tall cards don't create awkward gaps

### Step 6: Add Reduced Motion Support
Add `prefers-reduced-motion` media query to disable:
- CRT scanline effects
- Continuous flicker animations
- Complex parallax movements

### Step 7: Contact Section Spacing
- Verify bottom padding accounts for fixed taskbar on all screen sizes
- Add extra padding on mobile

---

## Files to Modify

1. **vite.config.ts** - Add React deduplication
2. **src/components/ui/sheet.tsx** - Increase close button tap target
3. **src/components/Navbar.tsx** - Enhance mobile hamburger visibility
4. **src/components/Portfolio.tsx** - Add whileTap, fix responsive sizing
5. **src/components/Skills.tsx** - Improve tablet grid layout
6. **src/index.css** - Add prefers-reduced-motion support
7. **src/components/Contact.tsx** - Adjust mobile bottom padding

---

## Technical Details

### Reduced Motion CSS Addition (index.css)
```css
@media (prefers-reduced-motion: reduce) {
  .crt-screen,
  .crt-flicker,
  .crt-scanlines {
    animation: none !important;
  }
  
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Sheet Close Button Enhancement
```tsx
// Current: w-4 h-4
// Updated: Add padding wrapper for 44x44 tap target
<SheetPrimitive.Close className="absolute right-4 top-4 p-2 -m-2 rounded-sm ...">
  <X className="h-4 w-4" />
</SheetPrimitive.Close>
```

### Portfolio whileTap Addition
```tsx
// Current
whileHover={{ scale: 1.01 }}
whileTap={{ scale: 0.99 }}

// All motion.article and motion.a elements get matching whileTap
```

---

## Success Criteria

1. No React runtime errors on page load
2. All interactive elements have minimum 44x44px tap targets
3. Smooth animations on touch devices with tap feedback
4. No overlapping elements on screens 320px-768px
5. Reduced motion support for accessibility
6. Consistent spacing using semantic tokens
7. Clean tablet (768-1024px) layouts without awkward gaps
