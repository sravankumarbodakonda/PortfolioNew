'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full opacity-20 blur-xl"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            background: `linear-gradient(135deg, ${
              i % 2 === 0 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(139, 92, 246, 0.3)'
            }, ${
              i % 2 === 0 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(14, 165, 233, 0.3)'
            })`,
            left: `${10 + i * 15}%`,
            top: `${10 + i * 12}%`,
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute opacity-10"
          style={{
            width: '60px',
            height: '60px',
            background: `linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))`,
            clipPath: i % 2 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
            right: `${15 + i * 20}%`,
            bottom: `${10 + i * 15}%`,
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -40, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 1.2,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingElements

