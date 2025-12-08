'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastProps {
  toast: Toast
  onClose: (id: string) => void
}

const ToastComponent = ({ toast, onClose }: ToastProps) => {
  const onCloseRef = useRef(onClose)
  
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const duration = toast.duration || 5000
    if (duration > 0) {
      const timer = setTimeout(() => {
        onCloseRef.current(toast.id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration])

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const colors = {
    success: 'from-green-500 to-emerald-600',
    error: 'from-red-500 to-rose-600',
    warning: 'from-yellow-500 to-amber-600',
    info: 'from-blue-500 to-cyan-600',
  }

  const bgColors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  }

  const Icon = icons[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8, x: 100 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`relative flex items-center gap-4 p-4 rounded-xl shadow-2xl border-2 ${bgColors[toast.type]} backdrop-blur-sm w-full sm:min-w-[300px] sm:max-w-md`}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${colors[toast.type]} opacity-10 rounded-xl`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Icon with pulse animation */}
      <motion.div
        className={`relative p-2 rounded-full bg-gradient-to-r ${colors[toast.type]} text-white`}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="w-5 h-5" />
      </motion.div>

      {/* Message */}
      <div className="flex-1 relative z-10">
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          {toast.message}
        </p>
      </div>

      {/* Close button */}
      <motion.button
        onClick={() => onClose(toast.id)}
        className="relative z-10 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </motion.button>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-b-xl overflow-hidden"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ 
          duration: (toast.duration || 5000) / 1000, 
          ease: 'linear' 
        }}
      />
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onClose: (id: string) => void
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null
  
  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto z-[9999] flex flex-col gap-3 pointer-events-none max-w-md sm:max-w-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastComponent toast={toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

