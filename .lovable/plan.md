

# Wave Background Implementation Plan

## Overview
Add an animated wave background component using simplex-noise that responds to mouse/touch movement. The background will be applied site-wide behind all content, creating an immersive, AI-native visual experience.

## Implementation Steps

### 1. Install Dependency
Add the `simplex-noise` package for generating procedural wave animations.

### 2. Create Wave Background Component
Create `src/components/ui/wave-background.tsx` with the provided code, adapted for the project:
- TypeScript-compatible component using React hooks
- Canvas-based SVG rendering for smooth wave lines
- Mouse/touch interaction for responsive deformation
- Theme-aware stroke colors (adapts to light/dark mode)
- Performance optimizations with `requestAnimationFrame`

### 3. Update Main Layout (Index.tsx)
Integrate the wave background at the root level:
- Add `Waves` component as a fixed, full-screen background layer
- Position it behind all content with `z-index: 0`
- Ensure existing content layers above with proper z-index hierarchy
- Configure colors to match the AI-native palette (violet/teal strokes on background)

### 4. Theme Integration
Configure the wave component to use CSS variables for theme-awareness:
- **Light mode**: Subtle blue/violet strokes on light background
- **Dark mode**: Softer violet/teal strokes on dark background
- Pointer glow effect matching accent color

### 5. Performance Considerations
- Use `will-change: transform` for GPU acceleration
- Implement proper cleanup in useEffect return
- Reduce line density on mobile devices
- Respect `prefers-reduced-motion` media query

---

## Technical Details

### File Changes

| File | Action |
|------|--------|
| `package.json` | Add `simplex-noise` dependency |
| `src/components/ui/wave-background.tsx` | Create new component |
| `src/pages/Index.tsx` | Import and render Waves as background layer |
| `src/global.css` | Add wave-specific utility classes if needed |

### Component Props
```text
interface WavesProps {
  className?: string
  strokeColor?: string      // Line color
  backgroundColor?: string  // Canvas background
  pointerSize?: number      // Mouse influence radius
}
```

### Z-Index Hierarchy
```text
Wave Background:  z-0  (fixed, behind everything)
CRT Scanlines:    z-[9999] (overlay, above everything)
Main Content:     z-10-20 (between)
Navbar:           z-50 (sticky header)
```

### Responsive Behavior
- Full viewport coverage on all screen sizes
- Touch interaction support for mobile
- Reduced animation intensity on smaller screens

