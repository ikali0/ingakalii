/**
 * Entropy Background Component
 * Animated particle system showing order vs chaos dynamics
 */
import { useEffect, useRef } from 'react'

interface EntropyProps {
  className?: string
  width?: number
  height?: number
}

export function Entropy({ className = "", width = 800, height = 600 }: EntropyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let canvasWidth = 0
    let canvasHeight = 0

    // Get actual container size
    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const w = rect.width
      const h = rect.height
      
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      
      canvasWidth = w
      canvasHeight = h
    }

    updateSize()

    // Theme-aware colors
    const isDark = document.documentElement.classList.contains('dark')
    const particleColor = isDark ? '#ffffff' : '#000000'

    class Particle {
      x: number
      y: number
      size: number
      order: boolean
      velocity: { x: number; y: number }
      originalX: number
      originalY: number
      influence: number
      neighbors: Particle[]

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 1.5
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        }
        this.influence = 0
        this.neighbors = []
      }

      update(width: number, height: number) {
        if (this.order) {
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y

          const chaosInfluence = { x: 0, y: 0 }
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 100)
              chaosInfluence.x += (neighbor.velocity.x * strength)
              chaosInfluence.y += (neighbor.velocity.y * strength)
              this.influence = Math.max(this.influence, strength)
            }
          })

          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence
          this.influence *= 0.99
        } else {
          this.velocity.x += (Math.random() - 0.5) * 0.5
          this.velocity.y += (Math.random() - 0.5) * 0.5
          this.velocity.x *= 0.95
          this.velocity.y *= 0.95
          this.x += this.velocity.x
          this.y += this.velocity.y

          if (this.x < width / 2 || this.x > width) this.velocity.x *= -1
          if (this.y < 0 || this.y > height) this.velocity.y *= -1
          this.x = Math.max(width / 2, Math.min(width, this.x))
          this.y = Math.max(0, Math.min(height, this.y))
        }
      }

      draw(ctx: CanvasRenderingContext2D, color: string) {
        const alpha = this.order ? 0.6 - this.influence * 0.4 : 0.6
        ctx.fillStyle = `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particle grid
    const particles: Particle[] = []
    const gridSize = 20
    const spacingX = canvasWidth / gridSize
    const spacingY = canvasHeight / gridSize

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacingX * i + spacingX / 2
        const y = spacingY * j + spacingY / 2
        const order = x < canvasWidth / 2
        particles.push(new Particle(x, y, order))
      }
    }

    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < 80
        })
      })
    }

    let time = 0
    let animationId: number
    const context = ctx // Capture non-null ctx

    function animate() {
      context.clearRect(0, 0, canvasWidth, canvasHeight)

      if (time % 30 === 0) {
        updateNeighbors()
      }

      particles.forEach(particle => {
        particle.update(canvasWidth, canvasHeight)
        particle.draw(context, particleColor)

        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < 40) {
            const alpha = 0.15 * (1 - distance / 40)
            context.strokeStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
            context.lineWidth = 0.5
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(neighbor.x, neighbor.y)
            context.stroke()
          }
        })
      })

      // Subtle center divider
      context.strokeStyle = `${particleColor}1A`
      context.lineWidth = 0.5
      context.beginPath()
      context.moveTo(canvasWidth / 2, 0)
      context.lineTo(canvasWidth / 2, canvasHeight)
      context.stroke()

      time++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      updateSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [width, height])

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}

export default Entropy
