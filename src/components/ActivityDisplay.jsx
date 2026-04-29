import React, { useEffect } from 'react'
import Button from './Button'

const ActivityDisplay = ({ activity, onReset, onNewActivity, animationPhase, isRegenerating }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      const target = event.target
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (isInput) return
      if (event.key === 'Enter') {
        onNewActivity()
      }
      if (event.key === 'r' || event.key === 'R') {
        onReset()
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onNewActivity, onReset])

  return (
    <div
      className="min-h-screen relative px-4 sm:px-6 transition-opacity duration-500"
      style={{
        paddingTop: 'clamp(60px, 12vw, 88px)',
        opacity: animationPhase === 'fadeIn' || animationPhase === 'idle' ? 1 : 0,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">
        <h1
          key={activity.id ?? activity.name}
          className="question-soft-fall text-[40px] md:text-[48px] font-heading font-bold text-center mb-8 sm:mb-12 max-w-4xl leading-tight"
          style={{ color: '#FF6D50' }}
        >
          {activity.name}
        </h1>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 pb-12 sm:pb-20 md:pb-24 px-4 sm:px-6 w-full max-w-xl mx-auto">
        <Button
          onClick={onNewActivity}
          variant="primary"
          primaryColor="#FF6D50"
          showEnterHint
          className="w-full sm:w-auto"
        >
          Regenerate
        </Button>
        <Button
          onClick={onReset}
          variant="secondary"
          primaryColor="#FF6D50"
          shortcutKey="R"
          className="font-body hover:opacity-80 w-full sm:w-auto text-base"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default ActivityDisplay
