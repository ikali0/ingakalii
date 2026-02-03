
# Parallax Scrolling Effect for Abstract Shapes

## Overview

This plan adds parallax scrolling effects to the decorative background shapes across all sections. Parallax creates a sense of depth by moving background elements at different speeds relative to the foreground content as the user scrolls, making the site feel more dynamic and immersive.

---

## Technical Approach

### Using Framer Motion's `useScroll` and `useTransform`

Framer Motion provides built-in hooks for scroll-based animations:
- **`useScroll`**: Tracks scroll progress (0 to 1) of the viewport or a container
- **`useTransform`**: Maps scroll progress to animation values (position, rotation, opacity)

This approach is performant because it uses the browser's hardware acceleration and doesn't require manual scroll event listeners.

---

## Implementation Plan

### Phase 1: Create Parallax Wrapper Component

Create a new reusable `ParallaxShape` wrapper component that:
- Accepts speed multiplier (negative = slower, positive = faster)
- Accepts rotation offset for additional visual interest
- Uses `useScroll` and `useTransform` to animate based on scroll position
- Wraps any shape component to add parallax effect

```text
ParallaxShape props:
  - children: ReactNode (the shape to wrap)
  - speed: number (0.1 = subtle, 0.5 = dramatic)
  - rotateAmount: number (degrees to rotate as you scroll)
  - className: string (positioning classes)
```

### Phase 2: Update Abstract Shapes Component

Add the `ParallaxShape` wrapper to `abstract-shapes.tsx`:
- Export the wrapper alongside existing shapes
- Each existing shape remains unchanged (separation of concerns)
- Parallax behavior is opt-in via wrapper

### Phase 3: Update Section Components

Wrap the existing abstract shapes with the parallax wrapper in each section:

| Section | Shapes | Parallax Config |
|---------|--------|-----------------|
| **About** | BlobShape, SparkleShape (x2) | Blob: slow (0.15), Sparkles: medium (0.25) |
| **Skills** | CircleShape, RingShape, DotsPattern, SparkleShape | Circle: slow (0.1), Ring: medium with rotation, Dots: subtle (0.08), Sparkle: fast (0.3) |
| **Portfolio** | GradientMesh, TriangleShape (x2), WavyLine | Triangles: medium with rotation (0.2), Wave: slow (0.1) |
| **Experience** | RingShape, DotsPattern | Ring: medium with rotation (0.2), Dots: slow (0.1) |
| **Contact** | BlobShape, CircleShape, SparkleShape (x2) | Blob: slow (0.15), Circle: medium (0.2), Sparkles: varied (0.25, 0.35) |

Different speeds create layered depth perception.

---

## Technical Details

### Files to Modify

1. **`src/components/ui/abstract-shapes.tsx`**
   - Add `ParallaxShape` wrapper component using `useScroll` and `useTransform`

2. **`src/components/About.tsx`**
   - Wrap BlobShape and SparkleShapes with ParallaxShape

3. **`src/components/Skills.tsx`**
   - Wrap CircleShape, RingShape, DotsPattern, SparkleShape with ParallaxShape

4. **`src/components/Portfolio.tsx`**
   - Wrap TriangleShapes and WavyLine with ParallaxShape
   - GradientMesh already has subtle motion, add scroll-based enhancement

5. **`src/components/Experience.tsx`**
   - Wrap RingShape and DotsPattern with ParallaxShape

6. **`src/components/Contact.tsx`**
   - Wrap BlobShape, CircleShape, SparkleShapes with ParallaxShape

### ParallaxShape Implementation

```text
Component behavior:
1. Uses useScroll() to get scrollYProgress (0-1 value)
2. Uses useTransform to map scroll to Y translation:
   - y = scrollYProgress * speed * windowHeight
3. Optionally applies rotation based on scroll
4. Applies to motion.div wrapper around children
```

### Speed Guidelines

| Speed | Effect | Use For |
|-------|--------|---------|
| `0.05-0.1` | Subtle, almost static | Large background blobs |
| `0.15-0.25` | Noticeable but smooth | Medium decorative shapes |
| `0.3-0.5` | Dramatic movement | Small accent elements like sparkles |

Negative speeds make elements scroll faster (foreground feel).
Positive speeds make elements scroll slower (background feel).

---

## Performance Considerations

- **GPU Acceleration**: Framer Motion uses `transform` properties which are GPU-accelerated
- **Will-change**: The motion components automatically apply `will-change: transform`
- **Reduced Motion**: The parallax will respect `prefers-reduced-motion` by reducing effect

---

## Expected Outcome

After implementation:
- Background shapes move at different speeds as you scroll
- Creates a layered, 3D-like depth effect
- Shapes further in the "background" move slower
- Sparkles and small accents move faster for visual interest
- Some shapes rotate subtly as you scroll for added dynamism
- Performance remains smooth (60fps) due to GPU-accelerated transforms

---

## Accessibility Note

For users who prefer reduced motion, the parallax effect will be minimized or disabled by checking `prefers-reduced-motion` media query in the component.
