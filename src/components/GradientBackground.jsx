import React from 'react'

const GradientBackground = ({ isActivityScreen = false, animationPhase = 'idle', isRegenerating = false }) => {
  const isWarm = isActivityScreen || animationPhase === 'glowAnimation'
  const shouldPulseWarmGlow = isActivityScreen && isRegenerating
  const translateY = isWarm ? '50px' : '100px'

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated elliptical glow: blue (landing) → warm (activity / transition) */}
      <div
        className="absolute bottom-0 left-1/2 z-0 transition-all duration-1000 ease-in-out"
        style={{
          width: '1727px',
          maxWidth: '120vw',
          height: '507px',
          backgroundColor: isWarm ? 'rgba(255, 109, 80, 0.5)' : 'rgba(31, 157, 255, 0.5)',
          borderRadius: '50%',
          filter: 'blur(150px)',
          transform: `translate(-50%, calc(50% + ${translateY}))`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='${isWarm ? '%23FF6D50' : '%23FFFFFF'}' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundBlendMode: 'overlay',
          opacity: isWarm ? 0.9 : 1,
          animation: shouldPulseWarmGlow ? 'warm-glow-pulse 1.2s ease-in-out' : undefined,
        }}
      />
      {isActivityScreen && (
        <>
          {/* Additional warm glows in activity state */}
          <div
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-40 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(255, 109, 80, 0.5) 0%, rgba(255, 109, 80, 0.2) 50%, transparent 100%)',
              filter: 'blur(150px)',
            }}
          />
          <div
            className="absolute top-20 -right-20 w-64 h-64 rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(255, 109, 80, 0.4) 0%, rgba(255, 109, 80, 0.1) 50%, transparent 100%)',
              filter: 'blur(70px)',
            }}
          />
        </>
      )}
      
      {/* Noise overlay effect - reduced opacity */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }}
      />
    </div>
  )
}

export default GradientBackground
