import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Ambient() {
  const particles = Array.from({ length: 18 })

  // Cursor trail handled separately to avoid blocking interactions
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0" aria-hidden>
        <motion.div
          className="absolute -inset-1/2 rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 50%, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.2) 30%, transparent 70%)',
          }}
          animate={{ rotate: [0, 15, -10, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -inset-1/2 rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 50%, rgba(14,165,233,0.2) 0%, rgba(99,102,241,0.15) 40%, transparent 75%)',
          }}
          animate={{ rotate: [0, -20, 10, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Spline scene as subtle hero background */}
      <div className="absolute inset-x-0 top-0 h-[40vh] md:h-[50vh] lg:h-[55vh] pointer-events-auto">
        <Spline scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Gradient overlay to blend with dark theme */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0A0A0F]/20 to-[#0A0A0F]" />
      </div>

      {/* Floating speck particles */}
      <div className="absolute inset-0" aria-hidden>
        {particles.map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-white/20 shadow-[0_0_8px_rgba(99,102,241,0.35)]"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -15, 0],
              x: [0, 5, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
          />
        ))}
      </div>
    </div>
  )
}
