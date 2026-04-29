import React, { useMemo } from 'react'

const PARTICLE_COUNT = 80
const MOBILE_PARTICLE_COUNT = 20

function generateParticles() {
  const particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100 - 12,
      coldWidth: 3 + Math.random() * 8,
      coldHeight: 1.5 + Math.random() * 3,
      warmWidth: 12 + Math.random() * 14,
      warmHeight: 7 + Math.random() * 8,
      coldRotate: 20 + Math.random() * 15,
      warmRotate: -35 + Math.random() * 70,
      coldOpacity: 0.2 + Math.random() * 0.45,
      warmOpacity: 0.25 + Math.random() * 0.45,
      duration: 8 + Math.random() * 10,
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30" aria-hidden>
      {visibleParticles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `seasonal-fall ${p.duration}s linear ${p.delay}s infinite`,
            '--particle-drift-x': `${p.driftX}vw`,
          }}
        >
          <div
            className="transition-all duration-1000 ease-in-out"
            style={{
              width: `${isWarm ? p.warmWidth : p.coldWidth}px`,
              height: `${isWarm ? p.warmHeight : p.coldHeight}px`,
              opacity: isWarm ? p.warmOpacity : p.coldOpacity,
              transform: `rotate(${isWarm ? p.warmRotate : p.coldRotate}deg)`,
              borderRadius: isWarm ? '60% 40% 65% 35% / 65% 35% 65% 35%' : '999px',
              background: isWarm
                ? 'linear-gradient(135deg, rgba(255, 138, 122, 0.68), rgba(255, 109, 80, 0.42))'
                : 'rgba(255, 255, 255, 0.95)',
              boxShadow: shouldReduceEffects
                ? 'none'
                : isWarm
                ? '0 0 8px rgba(255, 109, 80, 0.24)'
                : '0 0 5px rgba(255, 255, 255, 0.45)',
            }}
          />
        </div>
      ))}
    </div>
  )
}
