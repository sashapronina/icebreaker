import React, { useState, useEffect } from 'react'

const AnimatedShapes = ({ isAnimating, onAnimationComplete, isActivityScreen = false, isRegenerating = false }) => {
  const [animationPhase, setAnimationPhase] = useState('idle') // 'idle', 'covering', 'revealing'
  const [leftRotation, setLeftRotation] = useState(40) // Base rotation for left shape
  const [rightRotation, setRightRotation] = useState(-40) // Base rotation for right shape
  const [isRotatedForward, setIsRotatedForward] = useState(false) // Track rotation state

  useEffect(() => {
    if (isAnimating) {
      setAnimationPhase('covering')
      
      // After covering animation completes, start revealing
      setTimeout(() => {
        setAnimationPhase('revealing')
        
        // Call the completion callback immediately when revealing starts
        // This allows the activity to appear while shapes are still covering
        onAnimationComplete?.()
        
        // After revealing animation completes, reset to idle
        setTimeout(() => {
          setAnimationPhase('idle')
        }, 800) // Revealing animation duration
      }, 1500) // Longer covering duration to ensure full screen coverage
    }
  }, [isAnimating, onAnimationComplete])

  // Handle regeneration rotation
  useEffect(() => {
    if (isRegenerating && isActivityScreen) {
      if (isRotatedForward) {
        // Rotate back to original position
        setLeftRotation(40)
        setRightRotation(-40)
        setIsRotatedForward(false)
      } else {
        // Rotate forward by 20 degrees
        setLeftRotation(60) // 40 + 20
        setRightRotation(-60) // -40 - 20
        setIsRotatedForward(true)
      }
    }
  }, [isRegenerating, isActivityScreen]) // Removed isRotatedForward from dependencies

  const getShapeClasses = (position) => {
    // Different z-index based on animation phase
    const zIndex = animationPhase === 'covering' ? 'z-40' : 'z-10'
    const baseClasses = `absolute w-[500px] h-[500px] transition-all duration-1000 ease-in-out ${zIndex}`
    
    if (position === 'left') {
      switch (animationPhase) {
        case 'covering':
          return `${baseClasses} bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 scale-[8] rotate-12`
        case 'revealing':
          return `${baseClasses} bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 scale-100 ${isActivityScreen ? 'rotate-0' : 'rotate-0'}`
        default:
          return `${baseClasses} bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 scale-100 ${isActivityScreen ? 'rotate-0' : 'rotate-0'}`
      }
    } else {
      switch (animationPhase) {
        case 'covering':
          return `${baseClasses} bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 scale-[8] -rotate-12`
        case 'revealing':
          return `${baseClasses} bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 scale-100 ${isActivityScreen ? 'rotate-0' : 'rotate-0'}`
        default:
          return `${baseClasses} bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 scale-100 ${isActivityScreen ? 'rotate-0' : 'rotate-0'}`
      }
    }
  }

  const getShapeColors = () => {
    // Dynamic fill color that transitions from cool to warm background
    let fillColor = '#F7F9FF' // Default cool background
    
    if (isActivityScreen) {
      fillColor = '#FDF8F3' // Warm background for activity screen
    } else if (animationPhase === 'covering') {
      // During covering, transition from cool to warm
      fillColor = '#FDF8F3'
    }
    
    // Orange border during covering animation OR when on activity screen (warmed up!)
    const strokeColor = (animationPhase === 'covering' || isActivityScreen) ? '#FF5431' : '#3157FF'
    
    return { fillColor, strokeColor }
  }

  // Get inline style for regeneration rotation (applies during revealing and idle)
  const getRegenerationStyle = (position) => {
    if (animationPhase === 'covering' || !isActivityScreen) return {}
    
    if (position === 'left') {
      return { transform: `translate(-50%, 50%) scale(1) rotate(${leftRotation}deg)` }
    } else {
      return { transform: `translate(50%, 50%) scale(1) rotate(${rightRotation}deg)` }
    }
  }

  const { fillColor, strokeColor } = getShapeColors()

  return (
    <>
      {/* Left Shape */}
      <div className={getShapeClasses('left')} style={getRegenerationStyle('left')}>
        <svg
          width="869"
          height="926"
          viewBox="0 0 869 926"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M596.108 915.781C480.412 949.789 369.64 873.157 261.753 819.282C162.431 769.684 42.8089 728.258 8.8976 622.547C-24.1251 519.605 64.7832 426.208 103.248 325.174C145.234 214.891 132.521 60.7056 240.723 13.6151C349.259 -33.621 458.225 71.096 563.726 124.77C659.078 173.279 763.441 211.136 814.143 305.341C870.612 410.26 885.295 535.573 845.217 647.781C802.569 767.184 717.753 880.026 596.108 915.781Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2"
            style={{ 
              transition: 'fill 0.8s ease-in-out, stroke 0.8s ease-in-out'
            }}
          />
        </svg>
      </div>

      {/* Right Shape */}
      <div className={getShapeClasses('right')} style={getRegenerationStyle('right')}>
        <svg
          width="869"
          height="926"
          viewBox="0 0 869 926"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M596.108 915.781C480.412 949.789 369.64 873.157 261.753 819.282C162.431 769.684 42.8089 728.258 8.8976 622.547C-24.1251 519.605 64.7832 426.208 103.248 325.174C145.234 214.891 132.521 60.7056 240.723 13.6151C349.259 -33.621 458.225 71.096 563.726 124.77C659.078 173.279 763.441 211.136 814.143 305.341C870.612 410.26 885.295 535.573 845.217 647.781C802.569 767.184 717.753 880.026 596.108 915.781Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2"
            style={{ 
              transition: 'fill 0.8s ease-in-out, stroke 0.8s ease-in-out'
            }}
          />
        </svg>
      </div>
    </>
  )
}

export default AnimatedShapes