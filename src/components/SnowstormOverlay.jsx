import React, { useMemo } from 'react'

const PARTICLE_COUNT = 100

function generateParticles() {
  const particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const size = 1 + Math.random() * 4
    const stretch = 1.2 + Math.random() * 2
    particles.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100 - 10,
      width: size * stretch,
      height: size,
      opacity: 0.2 + Math.random() * 0.5,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * -15,
      slow: Math.random() > 0.6,
    })
  }
  return particles
}

export default function SnowstormOverlay() {
  const particles = useMemo(() => generateParticles(), [])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-30"
      aria-hidden
    >
      {/* Dither / grain texture overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] mix-blend-overlay">
        <defs>
          <filter id="snow-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="white" filter="url(#snow-noise)" />
      </svg>

      {/* Animated snow particles - elongated ellipses (motion blur) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            opacity: p.opacity,
            transform: 'rotate(25deg)',
            animation: `${p.slow ? 'snowfall-slow' : 'snowfall'} ${p.duration}s linear ${p.delay}s infinite`,
            boxShadow: '0 0 6px rgba(255,255,255,0.5)',
          }}
        />
      ))}
    </div>
  )
}
