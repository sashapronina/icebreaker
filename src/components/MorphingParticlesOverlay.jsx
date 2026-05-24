import React, { useMemo } from 'react'

const PARTICLE_COUNT = 150
const MOBILE_PARTICLE_COUNT = 45

function generateParticles() {
  const particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100 - 12,
      coldWidth: 4 + Math.random() * 9,
      coldHeight: 2 + Math.random() * 3.5,
      warmWidth: 12 + Math.random() * 14,
      warmHeight: 7 + Math.random() * 8,
      coldRotate: 20 + Math.random() * 15,
      warmRotate: -35 + Math.random() * 70,
      coldOpacity: 0.75 + Math.random() * 0.25,
      warmOpacity: 0.12 + Math.random() * 0.2,
      duration: 8 + Math.random() * 10,
      warmDuration: 14 + Math.random() * 10,
      delay: Math.random() * -16,
      driftX: 7 + Math.random() * 12,
    })
  }
  return particles
}

function isLowPerfMode() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return (
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function MorphingParticlesOverlay({ isWarm = false, lowPerfMode = false }) {
  const particles = useMemo(() => generateParticles(), [])
  const shouldReduceEffects = lowPerfMode || isLowPerfMode()
  const visibleParticles = shouldReduceEffects ? particles.slice(0, MOBILE_PARTICLE_COUNT) : particles

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[30]" aria-hidden>
      {visibleParticles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `seasonal-fall ${isWarm ? p.warmDuration : p.duration}s linear ${p.delay}s infinite`,
            '--particle-drift-x': `${p.driftX}vw`,
          }}
        >
          <div
            className="particle-morph"
            style={{
              width: `${isWarm ? p.warmWidth : p.coldWidth}px`,
              height: `${isWarm ? p.warmHeight : p.coldHeight}px`,
              opacity: isWarm ? p.warmOpacity : p.coldOpacity,
              transform: `rotate(${isWarm ? p.warmRotate : p.coldRotate}deg)`,
              borderRadius: isWarm ? '60% 40% 65% 35% / 65% 35% 65% 35%' : '999px',
              background: isWarm
                ? 'linear-gradient(135deg, rgba(255, 138, 122, 0.68), rgba(255, 109, 80, 0.42))'
                : '#FFFFFF',
              boxShadow: shouldReduceEffects
                ? 'none'
                : isWarm
                ? '0 0 8px rgba(255, 109, 80, 0.24)'
                : '0 0 6px rgba(255, 255, 255, 0.85), 0 0 2px rgba(255, 255, 255, 1)',
            }}
          />
        </div>
      ))}
    </div>
  )
}
