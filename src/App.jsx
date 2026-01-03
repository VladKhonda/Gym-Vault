import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useAppContext } from './contexts/AppContext'
import { getStorage, STORAGE_KEYS } from './utils/storage'
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

const AppRoutes = () => {
  const { isLoading, completeOnboarding } = useAppContext()

  useEffect(() => {
    // Load theme on mount
    const settings = getStorage(STORAGE_KEYS.SETTINGS, { theme: 'colorful' })
    applyTheme(settings.theme || 'colorful')
  }, [])

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  // Check if onboarding is completed
  const onboarding = getStorage(STORAGE_KEYS.ONBOARDING)
  const isOnboardingCompleted = onboarding && onboarding.completed

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/onboarding"
          element={
            isOnboardingCompleted ? (
              <Navigate to="/" replace />
            ) : (
              <Onboarding onComplete={completeOnboarding} />
            )
          }
        />
        <Route
          path="/*"
          element={
            isOnboardingCompleted ? (
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
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
