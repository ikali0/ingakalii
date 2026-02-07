/**
 * Entropy Background Component
 * Animated 3D particle system with vibrant colors and depth
 */
import { useEffect, useRef } from 'react'

interface EntropyProps {
  className?: string
  width?: number
  height?: number
}

// Vibrant color palette
const COLORS = {
  purple: { h: 280, s: 70, l: 60 },
  teal: { h: 175, s: 70, l: 50 },
  lime: { h: 85, s: 70, l: 55 },
  pink: { h: 330, s: 75, l: 60 },
  blue: { h: 220, s: 80, l: 60 },
}

const COLOR_ARRAY = Object.values(COLORS)

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

    // Mouse tracking
    let mouseX = -1000
    let mouseY = -1000
    const mouseRadius = 150

    class Particle {
      x: number
      y: number
      z: number // 3D depth
      baseSize: number
      size: number
      order: boolean
      velocity: { x: number; y: number; z: number }
      originalX: number
      originalY: number
      originalZ: number
      influence: number
      neighbors: Particle[]
      color: { h: number; s: number; l: number }
      glowIntensity: number

      constructor(x: number, y: number, order: boolean, colorIndex: number) {
        this.x = x
        this.y = y
        this.z = Math.random() * 200 - 100 // Depth from -100 to 100
        this.originalX = x
        this.originalY = y
        this.originalZ = this.z
        this.baseSize = 2 + Math.random() * 2
        this.size = this.baseSize
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 0.5
        }
        this.influence = 0
        this.neighbors = []
        this.color = COLOR_ARRAY[colorIndex % COLOR_ARRAY.length]
        this.glowIntensity = 0.5 + Math.random() * 0.5
      }

      update(width: number, height: number, mx: number, my: number, mRadius: number, time: number) {
        // Gentle Z oscillation for 3D effect
        this.z = this.originalZ + Math.sin(time * 0.02 + this.originalX * 0.01) * 20

        // Calculate 3D scale based on Z depth
        const perspective = 400
        const scale = perspective / (perspective + this.z)
        this.size = this.baseSize * scale

        // Mouse repulsion with 3D consideration
        const distToMouse = Math.hypot(this.x - mx, this.y - my)
        if (distToMouse < mRadius && distToMouse > 0) {
          const force = (mRadius - distToMouse) / mRadius
          const angle = Math.atan2(this.y - my, this.x - mx)
          const pushX = Math.cos(angle) * force * 12
          const pushY = Math.sin(angle) * force * 12
          this.x += pushX
          this.y += pushY
          this.z += force * 30 // Push particles forward on hover
          this.glowIntensity = Math.min(1, this.glowIntensity + force * 0.3)
        } else {
          this.glowIntensity = Math.max(0.5, this.glowIntensity - 0.02)
        }

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

          if (this.x < 0 || this.x > width) this.velocity.x *= -1
          if (this.y < 0 || this.y > height) this.velocity.y *= -1
          this.x = Math.max(0, Math.min(width, this.x))
          this.y = Math.max(0, Math.min(height, this.y))
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const { h, s, l } = this.color
        const alpha = this.order ? 0.9 - this.influence * 0.3 : 0.85
        
        // Calculate 3D position offset based on Z
        const perspective = 400
        const scale = perspective / (perspective + this.z)
        const centerX = ctx.canvas.width / (2 * (window.devicePixelRatio || 1))
        const centerY = ctx.canvas.height / (2 * (window.devicePixelRatio || 1))
        const drawX = centerX + (this.x - centerX) * scale
        const drawY = centerY + (this.y - centerY) * scale

        // Glow effect
        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, this.size * 3)
        gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l + 20}%, ${alpha * this.glowIntensity})`)
        gradient.addColorStop(0.4, `hsla(${h}, ${s}%, ${l}%, ${alpha * 0.6 * this.glowIntensity})`)
        gradient.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(drawX, drawY, this.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.fillStyle = `hsla(${h}, ${s}%, ${l + 10}%, ${alpha})`
        ctx.beginPath()
        ctx.arc(drawX, drawY, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Bright center highlight
        ctx.fillStyle = `hsla(${h}, ${s - 20}%, ${l + 30}%, ${alpha * 0.8})`
        ctx.beginPath()
        ctx.arc(drawX - this.size * 0.3, drawY - this.size * 0.3, this.size * 0.4, 0, Math.PI * 2)
        ctx.fill()
      }

      getDrawPosition() {
        const perspective = 400
        const scale = perspective / (perspective + this.z)
        return { scale, z: this.z }
      }
    }

    // Create particle grid with more particles
    const particles: Particle[] = []
    const gridSize = 25
    const spacingX = canvasWidth / gridSize
    const spacingY = canvasHeight / gridSize

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacingX * i + spacingX / 2 + (Math.random() - 0.5) * spacingX * 0.5
        const y = spacingY * j + spacingY / 2 + (Math.random() - 0.5) * spacingY * 0.5
        const order = Math.random() > 0.4 // Mix of ordered and chaotic
        const colorIndex = Math.floor(Math.random() * COLOR_ARRAY.length)
        particles.push(new Particle(x, y, order, colorIndex))
      }
    }

    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < 100
        })
      })
    }

    let time = 0
    let animationId: number
    const context = ctx

    function animate() {
      // Clear with slight fade for trail effect
      context.fillStyle = 'rgba(0, 0, 0, 0.05)'
      context.fillRect(0, 0, canvasWidth, canvasHeight)
      context.clearRect(0, 0, canvasWidth, canvasHeight)

      if (time % 30 === 0) {
        updateNeighbors()
      }

      // Sort particles by Z for proper 3D layering
      const sortedParticles = [...particles].sort((a, b) => b.z - a.z)

      sortedParticles.forEach(particle => {
        particle.update(canvasWidth, canvasHeight, mouseX, mouseY, mouseRadius, time)
      })

      // Draw connections first (behind particles)
      sortedParticles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < 60) {
            const alpha = 0.3 * (1 - distance / 60)
            const avgZ = (particle.z + neighbor.z) / 2
            const perspective = 400
            const scale = perspective / (perspective + avgZ)
            
            // Blend colors for connection
            const h = (particle.color.h + neighbor.color.h) / 2
            const s = (particle.color.s + neighbor.color.s) / 2
            const l = (particle.color.l + neighbor.color.l) / 2
            
            context.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${alpha * scale})`
            context.lineWidth = 1 * scale
            
            const centerX = canvasWidth / 2
            const centerY = canvasHeight / 2
            const p1Scale = perspective / (perspective + particle.z)
            const p2Scale = perspective / (perspective + neighbor.z)
            
            context.beginPath()
            context.moveTo(
              centerX + (particle.x - centerX) * p1Scale,
              centerY + (particle.y - centerY) * p1Scale
            )
            context.lineTo(
              centerX + (neighbor.x - centerX) * p2Scale,
              centerY + (neighbor.y - centerY) * p2Scale
            )
            context.stroke()
          }
        })
      })

      // Draw particles (sorted by depth)
      sortedParticles.forEach(particle => {
        particle.draw(context)
      })

      time++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      updateSize()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    window.addEventListener('resize', handleResize)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
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
