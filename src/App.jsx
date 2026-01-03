import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getStorage, setStorage, STORAGE_KEYS, initDemoData } from './utils/storage'
import { applyTheme } from './utils/themes'
import Onboarding from './components/Onboarding'
import Layout from './components/Layout'
import Home from './pages/Home'
import Exercises from './pages/Exercises'
import Workouts from './pages/Workouts'
import Journal from './pages/Journal'
import Progress from './pages/Progress'
import Settings from './pages/Settings'
import AITrainer from './pages/AITrainer'
import './styles/App.css'

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize demo data
    initDemoData()

    // Check if onboarding is completed
    const onboarding = getStorage(STORAGE_KEYS.ONBOARDING)
    if (!onboarding || !onboarding.completed) {
      setShowOnboarding(true)
    }

    // Load theme
    const settings = getStorage(STORAGE_KEYS.SETTINGS, { theme: 'colorful' })
    applyTheme(settings.theme || 'colorful')

    setIsLoading(false)
  }, [])

  const handleOnboardingComplete = (data) => {
    setStorage(STORAGE_KEYS.ONBOARDING, { ...data, completed: true })
    setStorage(STORAGE_KEYS.PROFILE, data)
    setStorage(STORAGE_KEYS.SETTINGS, {
      theme: data.theme || 'colorful',
      language: data.language || 'en',
      units: data.units || 'cm',
    })
    applyTheme(data.theme || 'colorful')
    setShowOnboarding(false)
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai-trainer" element={<AITrainer />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

