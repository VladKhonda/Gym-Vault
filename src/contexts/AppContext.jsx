import { createContext, useContext, useState, useEffect } from 'react'
import { getStorage, setStorage, STORAGE_KEYS } from '../utils/storage'
import { applyTheme } from '../utils/themes'

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(null)
  const [settings, setSettings] = useState({
    theme: 'colorful',
    language: 'en',
    units: 'cm',
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load data from localStorage
    const savedProfile = getStorage(STORAGE_KEYS.PROFILE)
    const savedSettings = getStorage(STORAGE_KEYS.SETTINGS, {
      theme: 'colorful',
      language: 'en',
      units: 'cm',
    })

    if (savedProfile) {
      setProfile(savedProfile)
    }

    if (savedSettings) {
      setSettings(savedSettings)
      applyTheme(savedSettings.theme || 'colorful')
    }

    setIsLoading(false)
  }, [])

  const updateProfile = (newProfile) => {
    setProfile(newProfile)
    setStorage(STORAGE_KEYS.PROFILE, newProfile)
  }

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    setStorage(STORAGE_KEYS.SETTINGS, updatedSettings)
    
    if (newSettings.theme) {
      applyTheme(newSettings.theme)
    }
  }

  const completeOnboarding = (onboardingData) => {
    const newProfile = {
      name: onboardingData.name || '',
      height: onboardingData.height || '',
      weight: onboardingData.weight || '',
      age: onboardingData.age || '',
      gender: onboardingData.gender || '',
      goal: onboardingData.goal || '',
    }

    const newSettings = {
      theme: onboardingData.theme || 'colorful',
      language: onboardingData.language || 'en',
      units: onboardingData.units || 'cm',
    }

    setProfile(newProfile)
    setSettings(newSettings)

    setStorage(STORAGE_KEYS.ONBOARDING, { ...onboardingData, completed: true })
    setStorage(STORAGE_KEYS.PROFILE, newProfile)
    setStorage(STORAGE_KEYS.SETTINGS, newSettings)

    applyTheme(newSettings.theme)
    
    // Reload page to apply all changes
    setTimeout(() => window.location.href = '/', 100)
  }

  const value = {
    profile,
    settings,
    isLoading,
    updateProfile,
    updateSettings,
    completeOnboarding,
    language: settings.language,
    units: settings.units,
    theme: settings.theme,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

