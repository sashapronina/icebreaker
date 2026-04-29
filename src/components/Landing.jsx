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
    <>
    <div
      className="min-h-screen relative px-4 sm:px-6 transition-opacity duration-500"
      style={{
        paddingTop: 'clamp(60px, 12vw, 88px)',
        opacity: animationPhase === 'fadeOut' || animationPhase === 'glowAnimation' ? 0 : 1,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">
        <h1
          className="text-[40px] md:text-[48px] font-heading font-bold text-center mb-8 sm:mb-10 max-w-3xl leading-tight transition-all duration-500 ease-out"
          style={{
            color: '#1F9DFF',
            transform: isExiting ? 'translateY(-24px)' : 'translateY(0)',
            opacity: isExiting ? 0 : 1,
          }}
        >
          It&apos;s a little cold in here. Find an icebreaker for the team.
        </h1>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 pb-12 sm:pb-20 md:pb-24 px-4 sm:px-6 w-full max-w-xl mx-auto">
        <Button onClick={onGenerate} variant="primary" primaryColor="#1F9DFF" showEnterHint className="w-full sm:w-auto">
          Generate
        </Button>
        <div className="h-9" aria-hidden />
      </div>
    </div>
    </>
  )
}

export default Landing
