import React, { useEffect } from 'react'
import PromptQuestion from './PromptQuestion'
import GoalGrid from './GoalGrid'
import Button from './Button'

const GoalSelection = ({ selectedGoal, onGoalSelect, onGenerate, onReset, animationPhase }) => {
  const goals = [
    {
      id: 'feel_closer',
      title: 'Feel Closer',
      description: 'Build deeper connections between team members'
    },
    {
      id: 'warm_up',
      title: 'Warm Up',
      description: 'Get energy flowing and create a fun, engaging atmosphere'
    },
    {
      id: 'align',
      title: 'Align',
      description: 'Align your team on goals, values, or direction'
    }
  ]

  // Add keyboard support for Enter key
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && selectedGoal) {
        onGenerate()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedGoal, onGenerate])

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center" style={{ paddingTop: '68px' }}>
      {/* Floating Card Container - 40px margins, 8px from topbar */}
      <div 
        className="bg-white relative z-10 flex flex-col flex-1 overflow-hidden"
        style={{ 
          boxShadow: '0 0 16px rgba(0, 0, 0, 0.05)',
          width: 'calc(100vw - 80px)', // 40px margins on each side
          marginLeft: '40px',
          marginRight: '40px',
          marginTop: '24px',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px'
        }}
      >
        {/* Blue Elliptical Glow - Bottom of card, clipped by container */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 transition-all duration-1000 ease-in-out"
          style={{ 
            width: '1727px', // Match Figma width
            height: '507px', // Match Figma height
            backgroundColor: animationPhase === 'glowAnimation' ? '#FFD857' : 'rgba(83, 181, 255, 0.5)', // Animate color change
            borderRadius: '50%', // Make it elliptical
            filter: 'blur(150px)', // 150px blur from Figma
            transform: `translateX(-50%) translateY(calc(50% + ${
              animationPhase === 'glowAnimation' ? '50px' : '100px'
            }))`, // Move up during animation
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='${animationPhase === 'glowAnimation' ? '%23EED566' : '%23FFFFFF'}' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundBlendMode: 'overlay',
            transition: 'all 1s ease-in-out'
          }}
        />
        {/* Stepper - Inside Card */}
        <div className="flex items-center justify-center pt-8 pb-4">
          <div className="flex items-center space-x-2">
            <div className="h-1 w-10 bg-black rounded-full"></div>
            <div className="h-1 w-10 bg-gray-300 opacity-60 rounded-full"></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div 
          className="flex-1 flex flex-col items-center justify-center px-16 py-8 transition-opacity duration-500"
          style={{
            opacity: animationPhase === 'fadeOut' || animationPhase === 'glowAnimation' ? 0 : 1
          }}
        >
          {/* Question */}
          <PromptQuestion />

          {/* Goal Selection Cards */}
          <GoalGrid 
            goals={goals}
            selectedGoal={selectedGoal}
            onGoalSelect={onGoalSelect}
          />
        </div>

        {/* Button Area - Inside Card */}
        <div className="flex justify-center pb-24">
          <Button
            onClick={onGenerate}
            disabled={!selectedGoal}
            variant="primary"
            icon={
              <div className="bg-white/20 rounded px-2 py-1 text-xs font-medium">
                ↵
              </div>
            }
          >
            {selectedGoal ? 'Create activity' : 'Select a goal first'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GoalSelection