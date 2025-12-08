'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check for dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Particle[] = []
    const particleCount = 80

    // Create particles with varying properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 1,
        color: isDark ? '#3b82f6' : '#0ea5e9',
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const currentColor = isDark ? '#3b82f6' : '#0ea5e9'
      const secondaryColor = isDark ? '#8b5cf6' : '#a855f7'

      // Update and draw particles
      particles.forEach((particle) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx -= (dx / distance) * force * 0.02
          particle.vy -= (dy / distance) * force * 0.02
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Damping
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Wrap around edges
        if (particle.x < 0) {
          particle.x = canvas.width
          particle.vx *= -1
        }
        if (particle.x > canvas.width) {
          particle.x = 0
          particle.vx *= -1
        }
        if (particle.y < 0) {
          particle.y = canvas.height
          particle.vy *= -1
        }
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.vy *= -1
        }

        // Update color based on dark mode
        particle.color = currentColor

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 2
        )
        gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, `${particle.color}00`)

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw connections with gradient
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = 0.3 * (1 - distance / 150)
            const gradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              otherParticle.x,
              otherParticle.y
            )
            gradient.addColorStop(0, `${currentColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)
            gradient.addColorStop(1, `${secondaryColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

