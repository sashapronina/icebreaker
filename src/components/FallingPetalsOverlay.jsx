import React, { useMemo } from 'react'

const PETAL_COUNT = 26

function generatePetals() {
  const petals = []
  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 60 - 65,
      width: 14 + Math.random() * 16,
      height: 8 + Math.random() * 8,
      rotate: -35 + Math.random() * 70,
      opacity: 0.25 + Math.random() * 0.45,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * -14,
      swayDuration: 2.4 + Math.random() * 2.2,
    })
  }
  return petals
}

export default function FallingPetalsOverlay() {
  const petals = useMemo(() => generatePetals(), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30" aria-hidden>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: `${petal.top}%`,
            animation: `petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          <div
            className="rounded-[60%_40%_65%_35%/65%_35%_65%_35%]"
            style={{
              width: `${petal.width}px`,
              height: `${petal.height}px`,
              transform: `rotate(${petal.rotate}deg)`,
              opacity: petal.opacity,
              background: 'linear-gradient(135deg, rgba(255, 138, 122, 0.65), rgba(255, 109, 80, 0.42))',
              boxShadow: '0 0 8px rgba(255, 109, 80, 0.24)',
              animation: `petal-sway ${petal.swayDuration}s ease-in-out infinite`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
