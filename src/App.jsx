import React, { useState, useEffect } from 'react'
import icebreakersData from './data/icebreakers.json'
import Landing from './components/Landing'
import ActivityDisplay from './components/ActivityDisplay'
import Topbar from './components/Topbar'
import AboutPage from './components/AboutPage'
import MorphingParticlesOverlay from './components/MorphingParticlesOverlay'
import SceneBackground from './components/SceneBackground'
import TreeScenery from './components/TreeScenery'

function App() {
  const [generatedActivity, setGeneratedActivity] = useState(null)
  const [usedActivities, setUsedActivities] = useState([])
  const [showAbout, setShowAbout] = useState(false)

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [animationPhase, setAnimationPhase] = useState('idle')
  const [isRegenerating, setIsRegenerating] = useState(false)
  const isWarmState = !!generatedActivity
  const isWarmVisualState = isWarmState || animationPhase === 'glowAnimation'

  useEffect(() => {
    const saved = localStorage.getItem('usedActivities')
    if (saved) {
      setUsedActivities(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('usedActivities', JSON.stringify(usedActivities))
  }, [usedActivities])

  const getRandomActivity = () => {
    const available = icebreakersData.icebreakers.filter(
      (a) => !usedActivities.includes(a.id)
    )
    const pool = available.length > 0 ? available : icebreakersData.icebreakers
    return pool[Math.floor(Math.random() * pool.length)]
  }

  const handleGenerate = () => {
    if (isTransitioning) return

    const selectedActivity = getRandomActivity()
    if (!selectedActivity) return

    setUsedActivities((prev) => [...prev, selectedActivity.id])
    setIsTransitioning(true)
    setAnimationPhase('fadeOut')

    setTimeout(() => setAnimationPhase('glowAnimation'), 500)
    setTimeout(() => {
      setGeneratedActivity(selectedActivity)
      setAnimationPhase('fadeIn')
    }, 1500)
    setTimeout(() => {
      setAnimationPhase('idle')
      setIsTransitioning(false)
    }, 2000)
  }

  const handleReset = () => {
    setGeneratedActivity(null)
  }

  const handleNewActivity = () => {
    if (isRegenerating) return

    const selectedActivity = getRandomActivity()
    if (!selectedActivity) return

    setIsRegenerating(true)
    setTimeout(() => {
      setGeneratedActivity(selectedActivity)
      setUsedActivities((prev) => [...prev, selectedActivity.id])
    }, 200)
    setTimeout(() => setIsRegenerating(false), 1200)
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: isWarmVisualState ? '#FFEAEC' : '#EAF2FB' }}
    >
      <SceneBackground isWarm={isWarmVisualState} />
      <TreeScenery isWarm={isWarmVisualState} />
      <MorphingParticlesOverlay isWarm={isWarmVisualState} />
      <Topbar
        onLogoClick={handleReset}
        onAboutClick={() => setShowAbout(true)}
        theme={isWarmVisualState ? 'warm' : 'cold'}
      />

      {showAbout && (
        <AboutPage onClose={() => setShowAbout(false)} />
      )}

      {!generatedActivity ? (
        <Landing onGenerate={handleGenerate} animationPhase={animationPhase} />
      ) : (
        <ActivityDisplay
          activity={generatedActivity}
          onReset={handleReset}
          onNewActivity={handleNewActivity}
          animationPhase={animationPhase}
          isRegenerating={isRegenerating}
        />
      )}
    </div>
  )
}

export default App
