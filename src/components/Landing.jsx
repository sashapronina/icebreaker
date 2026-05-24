import React, { useEffect } from 'react'
import Button from './Button'

const Landing = ({ onGenerate, animationPhase }) => {
  const isExiting = animationPhase === 'fadeOut' || animationPhase === 'glowAnimation'

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        onGenerate()
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onGenerate])

  return (
    <div
      className="min-h-screen relative z-10 px-4 sm:px-6 transition-opacity duration-700 ease-in-out"
      style={{
        paddingTop: 'clamp(60px, 12vw, 88px)',
        opacity: animationPhase === 'glowAnimation' ? 0 : 1,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">
        <div
          className="cold-content-exit flex flex-col items-center w-full max-w-sm"
          style={{
            gap: '32px',
            transform: isExiting ? 'translateY(-24px)' : 'translateY(0)',
            opacity: isExiting ? 0 : 1,
          }}
        >
          <h1 className="main-text cold-text-rise text-center">
            It&apos;s a little cold in here.
          </h1>
          <Button
            onClick={onGenerate}
            variant="frosted"
            showEnterHint
            className="w-full sm:w-auto"
          >
            Break the ice
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Landing
