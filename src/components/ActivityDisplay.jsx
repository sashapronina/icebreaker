import React, { useEffect } from 'react'
import Button from './Button'

const ActivityDisplay = ({ activity, onReset, onNewActivity, animationPhase, isRegenerating }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      const target = event.target
      const isInput =
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
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
      className="min-h-screen relative z-10 px-4 sm:px-6"
      style={{
        paddingTop: 'clamp(60px, 12vw, 88px)',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">
        <h1
          key={activity.id ?? activity.name}
          className="main-text question-soft-fall text-center mb-8 sm:mb-12"
        >
          {activity.name}
        </h1>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 pb-4 sm:pb-20 md:pb-24 px-4 sm:px-6 w-full max-w-xl mx-auto"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
      >
        <Button
          onClick={onNewActivity}
          variant="frosted"
          showEnterHint
          className="w-full sm:w-auto"
        >
          Try another
        </Button>
        <Button
          onClick={onReset}
          variant="secondary"
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
