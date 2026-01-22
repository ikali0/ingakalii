import { useEffect, useRef, forwardRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
interface EntropyBackgroundProps {
  className?: string;
}

// Mobile-first: detect if mobile for reduced particle count
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 640;
export const EntropyBackground = forwardRef<HTMLDivElement, EntropyBackgroundProps>(({
  className = ""
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Mobile-first: reduce particles on small screens
    const mobile = isMobile();
    const gridSize = mobile ? 18 : 30;
    const connectionDistance = mobile ? 100 : 150;
    const lineDistance = mobile ? 60 : 80;
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR for performance
      const width = rect.width;
      const height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      return {
        width,
        height
      };
    };
    let {
      width,
      height
    } = resizeCanvas();

    // Enhanced color palette with more vibrant tones
    const pinkColor = '#d04f99';
    const pinkGlow = '#ff6bc2';
    const tealColor = '#8acfd1';
    const tealGlow = '#5de8eb';
    const accentColor = '#e670ab';
    const lineColor = '#50afb6';
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      order: boolean;
      velocity: {
        x: number;
        y: number;
      };
      originalX: number;
      originalY: number;
      influence: number;
      neighbors: Particle[];
      pulsePhase: number;
      glowIntensity: number;
      constructor(x: number, y: number, order: boolean) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.baseSize = mobile ? 1.5 : 2.5;
        this.size = this.baseSize;
        this.order = order;
        this.velocity = {
          x: (Math.random() - 0.5) * (mobile ? 1.5 : 2.5),
          y: (Math.random() - 0.5) * (mobile ? 1.5 : 2.5)
        };
        this.influence = 0;
        this.neighbors = [];
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.glowIntensity = 0.3 + Math.random() * 0.4;
      }
      update(w: number, h: number, time: number) {
        // Pulsing size effect
        this.size = this.baseSize + Math.sin(time * 0.05 + this.pulsePhase) * 0.5;
        if (this.order) {
          const dx = this.originalX - this.x;
          const dy = this.originalY - this.y;
          const chaosInfluence = {
            x: 0,
            y: 0
          };
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y);
              const strength = Math.max(0, 1 - distance / connectionDistance);
              chaosInfluence.x += neighbor.velocity.x * strength * 1.2;
              chaosInfluence.y += neighbor.velocity.y * strength * 1.2;
              this.influence = Math.max(this.influence, strength);
            }
          });
          this.x += dx * 0.06 * (1 - this.influence) + chaosInfluence.x * this.influence;
          this.y += dy * 0.06 * (1 - this.influence) + chaosInfluence.y * this.influence;
          this.influence *= 0.98;
        } else {
          // More dynamic chaos movement
          this.velocity.x += (Math.random() - 0.5) * 0.6;
          this.velocity.y += (Math.random() - 0.5) * 0.6;
          this.velocity.x *= 0.94;
          this.velocity.y *= 0.94;
          this.x += this.velocity.x;
          this.y += this.velocity.y;
          if (this.x < w / 2 || this.x > w) this.velocity.x *= -1;
          if (this.y < 0 || this.y > h) this.velocity.y *= -1;
          this.x = Math.max(w / 2, Math.min(w, this.x));
          this.y = Math.max(0, Math.min(h, this.y));
        }
      }
      draw(ctx: CanvasRenderingContext2D, time: number) {
        const baseAlpha = this.order ? 0.8 - this.influence * 0.3 : 0.9;
        const pulseAlpha = baseAlpha + Math.sin(time * 0.03 + this.pulsePhase) * 0.15;
        const color = this.order ? tealColor : pinkColor;
        const glowColor = this.order ? tealGlow : pinkGlow;

        // Outer glow
        const glowSize = this.size * 2.5;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
        gradient.addColorStop(0, glowColor + Math.round(this.glowIntensity * pulseAlpha * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.5, color + Math.round(pulseAlpha * 0.4 * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = color + Math.round(pulseAlpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particle grid
    const particles: Particle[] = [];
    const spacingX = width / gridSize;
    const spacingY = height / gridSize;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacingX * i + spacingX / 2;
        const y = spacingY * j + spacingY / 2;
        const order = x < width / 2;
        particles.push(new Particle(x, y, order));
      }
    }
    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false;
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          return distance < connectionDistance;
        });
      });
    }
    let time = 0;
    let animationId: number;
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Update neighbors less frequently on mobile
      if (time % (mobile ? 45 : 30) === 0) {
        updateNeighbors();
      }

      // Draw connection lines first (behind particles)
      particles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y);
          if (distance < lineDistance) {
            const alpha = 0.25 * (1 - distance / lineDistance);
            const pulseAlpha = alpha * (0.8 + Math.sin(time * 0.02) * 0.2);
            const connectionColor = particle.order && neighbor.order ? tealColor : !particle.order && !neighbor.order ? accentColor : lineColor;
            ctx.strokeStyle = connectionColor + Math.round(pulseAlpha * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = mobile ? 0.5 : 0.8;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(width, height, time);
        particle.draw(ctx, time);
      });

      // Enhanced animated pulsing divider line with glow
      const pulseAlpha = 0.4 + Math.sin(time * 0.025) * 0.2;
      const pulseWidth = mobile ? 1.5 : 2 + Math.sin(time * 0.02) * 0.8;

      // Outer glow for divider
      const glowGradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);
      glowGradient.addColorStop(0, `${tealGlow}00`);
      glowGradient.addColorStop(0.3, tealGlow + Math.round(pulseAlpha * 0.3 * 255).toString(16).padStart(2, '0'));
      glowGradient.addColorStop(0.5, pinkGlow + Math.round(pulseAlpha * 0.4 * 255).toString(16).padStart(2, '0'));
      glowGradient.addColorStop(0.7, tealGlow + Math.round(pulseAlpha * 0.3 * 255).toString(16).padStart(2, '0'));
      glowGradient.addColorStop(1, `${pinkGlow}00`);
      ctx.strokeStyle = glowGradient;
      ctx.lineWidth = pulseWidth * 4;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Core divider line
      const gradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);
      gradient.addColorStop(0, `${tealColor}00`);
      gradient.addColorStop(0.2, tealColor + Math.round(pulseAlpha * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(0.5, pinkColor + Math.round(pulseAlpha * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(0.8, tealColor + Math.round(pulseAlpha * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, `${pinkColor}00`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = pulseWidth;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      time++;
      animationId = requestAnimationFrame(animate);
    }
    animate();
    const handleResize = () => {
      const dims = resizeCanvas();
      width = dims.width;
      height = dims.height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <div ref={containerRef} className={cn("absolute inset-0 bg-background", className)}>
      <canvas ref={canvasRef} className="<div class=\"absolute inset-0 size-full shadow-md sm:shadow-sm\"></div>" />
    </div>;
});
EntropyBackground.displayName = "EntropyBackground";
export default EntropyBackground;