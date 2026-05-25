import React, { useEffect } from 'react'
import Button from './Button'
import MobileCtaDock from './MobileCtaDock'

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
      className="min-h-screen relative z-40 px-4 sm:px-6"
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

      <MobileCtaDock>
        <Button
          onClick={onReset}
          variant="secondary"
          shortcutKey="R"
          className="font-body hover:opacity-80 text-base"
        >
          Reset
        </Button>
        <Button onClick={onNewActivity} variant="frosted" showEnterHint className="w-full">
          Try another
        </Button>
      </MobileCtaDock>

      <div className="hidden md:flex absolute bottom-0 left-0 right-0 flex-col items-center gap-4 pb-24 px-6 w-full max-w-xl mx-auto">
        <Button
          onClick={onReset}
          variant="secondary"
          shortcutKey="R"
          className="font-body hover:opacity-80 w-auto text-base"
        >
          Reset
        </Button>
        <Button onClick={onNewActivity} variant="frosted" showEnterHint className="w-auto">
          Try another
        </Button>
      </div>
    </div>
  )
}

export default ActivityDisplay
