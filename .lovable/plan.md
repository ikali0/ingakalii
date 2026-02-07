

# Plan: Theme-Aware Entropy Component Colors

## Overview

Update the Entropy component to dynamically read CSS variables from the document, ensuring colors adapt to both light and dark themes with complementary palettes.

## Current State Analysis

The Entropy component currently uses a hardcoded purple color:
```tsx
const particleColor = '#8b5cf6' // primary purple
```

This doesn't respond to theme changes and doesn't provide visual distinction between "order" (left side) and "chaos" (right side) particles.

## Proposed Color Scheme

### Light Mode (from CSS variables)
| Element | CSS Variable | Current Value | Hex Equivalent |
|---------|--------------|---------------|----------------|
| Order particles | `--neural` | `263 70% 58%` | ~#8b5cf6 (violet) |
| Chaos particles | `--accent` | `333 71% 51%` | ~#db2777 (pink) |
| Connection lines | `--primary` | `221 83% 53%` | ~#3b82f6 (blue) |
| Divider | `--muted-foreground` | `314 25% 37%` | Soft mauve |

### Dark Mode (complementary palette)
| Element | CSS Variable | Current Value | Hex Equivalent |
|---------|--------------|---------------|----------------|
| Order particles | `--neural` | `258 90% 76%` | ~#c4b5fd (light violet) |
| Chaos particles | `--accent-foreground` | `344 57% 70%` | ~#f472b6 (light pink) |
| Connection lines | `--primary` | `314 45% 92%` | ~#fce7f3 (pale rose) |
| Divider | `--muted-foreground` | `134 27% 75%` | Soft sage |

---

## Technical Implementation

### File: `src/components/ui/entropy.tsx`

**Changes Required:**

1. **Add theme detection** - Read computed CSS variables at runtime using `getComputedStyle`

2. **Helper function** - Convert HSL CSS variable values to hex for canvas rendering:
   ```tsx
   const getCSSColor = (varName: string): string => {
     const style = getComputedStyle(document.documentElement);
     const hslValue = style.getPropertyValue(varName).trim();
     // Parse "263 70% 58%" format and convert to hex
   };
   ```

3. **Theme change listener** - Add a MutationObserver to detect `.dark` class changes on `<html>` and update colors accordingly

4. **Dual-color particle system** - Order particles use one color (neural/violet), chaos particles use a complementary color (accent/pink)

5. **Connection line coloring** - Lines between same-type particles use that particle's color; cross-type connections use the primary color

6. **Divider line** - Use `--muted-foreground` for subtle contrast

### Detailed Code Changes

```tsx
// Inside useEffect, after canvas setup:

// Helper to parse CSS HSL variables and convert to hex
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const getCSSColor = (varName: string): string => {
  const style = getComputedStyle(document.documentElement);
  const hslValue = style.getPropertyValue(varName).trim();
  if (!hslValue) return '#8b5cf6'; // fallback
  const [h, s, l] = hslValue.split(' ').map(v => parseFloat(v));
  return hslToHex(h, s, l);
};

// Get theme colors
const orderColor = getCSSColor('--neural');      // violet for order
const chaosColor = getCSSColor('--accent');      // pink for chaos
const lineColor = getCSSColor('--primary');      // blue for connections
const dividerColor = getCSSColor('--muted-foreground'); // subtle divider
```

**Particle draw method update:**
```tsx
draw(ctx: CanvasRenderingContext2D) {
  const alpha = this.order ? 0.8 - this.influence * 0.5 : 0.8;
  const color = this.order ? orderColor : chaosColor;
  ctx.fillStyle = `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
  // ... rest of draw logic
}
```

**Connection lines update:**
```tsx
// When drawing connections between particles
const connectionLineColor = (particle.order === neighbor.order) 
  ? (particle.order ? orderColor : chaosColor) 
  : lineColor;
```

---

## Summary

| File | Changes |
|------|---------|
| `src/components/ui/entropy.tsx` | Add CSS variable parsing, dual-color system, theme reactivity |

## Expected Result

- **Light mode**: Violet order particles + pink chaos particles with blue connection lines
- **Dark mode**: Light violet order particles + light pink chaos particles with pale rose connections
- **Theme switching**: Colors update automatically when dark/light mode toggles
- **Visual clarity**: Order vs chaos now visually distinct with complementary colors

