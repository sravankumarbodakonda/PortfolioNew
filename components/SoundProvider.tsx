'use client'

import { createContext, useContext, useState, useEffect, useRef } from 'react'

interface SoundContextType {
  soundsEnabled: boolean
  toggleSounds: () => void
  playSound: (soundType: 'click' | 'hover' | 'success' | 'error' | 'whoosh' | 'pop') => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundsEnabled, setSoundsEnabled] = useState(false) // Default to off
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize AudioContext on user interaction (browser requirement)
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
    }

    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      initAudio()
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

  const generateTone = (
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume: number = 0.1
  ) => {
    if (!soundsEnabled || !audioContextRef.current) return

    try {
      const audioContext = audioContextRef.current
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    } catch (error) {
      console.warn('Sound playback failed:', error)
    }
  }

  const playSound = (soundType: 'click' | 'hover' | 'success' | 'error' | 'whoosh' | 'pop') => {
    if (!soundsEnabled) return

    switch (soundType) {
      case 'click':
        generateTone(800, 0.1, 'sine', 0.15)
        break
      case 'hover':
        generateTone(600, 0.05, 'sine', 0.08)
        break
      case 'success':
        generateTone(523, 0.1, 'sine', 0.2)
        setTimeout(() => generateTone(659, 0.1, 'sine', 0.2), 100)
        setTimeout(() => generateTone(784, 0.2, 'sine', 0.2), 200)
        break
      case 'error':
        generateTone(200, 0.3, 'sawtooth', 0.2)
        break
      case 'whoosh':
        generateTone(400, 0.2, 'sine', 0.1)
        break
      case 'pop':
        generateTone(1000, 0.08, 'square', 0.12)
        break
    }
  }

  const toggleSounds = () => {
    setSoundsEnabled((prev) => !prev)
    if (!soundsEnabled) {
      // Play a test sound when enabling
      setTimeout(() => playSound('success'), 100)
    }
  }

  return (
    <SoundContext.Provider value={{ soundsEnabled, toggleSounds, playSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}

