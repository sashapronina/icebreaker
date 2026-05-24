import React, { useState, useEffect } from 'react'
import icebreakersData from './data/icebreakers.json'
import Landing from './components/Landing'
import ActivityDisplay from './components/ActivityDisplay'
import Topbar from './components/Topbar'
import AboutPage from './components/AboutPage'
import MorphingParticlesOverlay from './components/MorphingParticlesOverlay'
import SceneBackground from './components/SceneBackground'
import TreeScenery from './components/TreeScenery'
import { COLD_BG, MOTION_MS, WARM_BG } from './theme'

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

    const { contentExit, scene, contentEnter } = MOTION_MS
    const sceneWarmAt = contentExit
    const showQuestionAt = contentExit + scene
    const transitionEnd = showQuestionAt + contentEnter

    setTimeout(() => setAnimationPhase('glowAnimation'), sceneWarmAt)
    setTimeout(() => {
      setGeneratedActivity(selectedActivity)
      setAnimationPhase('fadeIn')
    }, showQuestionAt)
    setTimeout(() => {
      setAnimationPhase('idle')
      setIsTransitioning(false)
    }, transitionEnd)
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
      className="motion-scene min-h-screen relative overflow-hidden"
      style={{ backgroundColor: isWarmVisualState ? WARM_BG : COLD_BG }}
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
        <AboutPage onClose={() => setShowAbout(false)} isWarm={isWarmVisualState} />
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
