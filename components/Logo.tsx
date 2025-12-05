'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  showFullName?: boolean
}

export default function Logo({ className = '', showFullName = true }: LogoProps) {
  return (
    <motion.a
      href="#home"
      className={`flex items-center gap-3 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* S Letter Logo */}
      <motion.div
        className="relative w-12 h-12 flex items-center justify-center"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {/* Background circle with gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 via-purple-600 to-pink-500 opacity-90 blur-sm" />
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
          {/* S Letter */}
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <motion.path
              d="M8 8C8 6.895 8.895 6 10 6h4c1.105 0 2 .895 2 2 0 1.105-.895 2-2 2h-4c-1.105 0-2 .895-2 2 0 1.105.895 2 2 2h4c1.105 0 2 .895 2 2 0 1.105-.895 2-2 2h-4c-1.105 0-2-.895-2-2"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.svg>
        </div>
      </motion.div>

      {/* Name */}
      {showFullName && (
        <div className="flex flex-col">
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent leading-tight">
            Sravan Kumar
          </span>
          <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 leading-tight">
            Bodakonda
          </span>
        </div>
      )}
    </motion.a>
  )
}

