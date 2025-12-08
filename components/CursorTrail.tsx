'use client'

import { useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
  timestamp: number
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<TrailPoint[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      })

      // Keep only recent trail points (last 20)
      if (trailRef.current.length > 20) {
        trailRef.current.shift()
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const now = Date.now()
      const trail = trailRef.current.filter(
        (point) => now - point.timestamp < 500
      )

      trail.forEach((point, index) => {
        const age = now - point.timestamp
        const opacity = 1 - age / 500
        const size = 8 - (index * 0.3)

        if (opacity > 0 && size > 0) {
          ctx.beginPath()
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.3})`
          ctx.fill()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  )
}

