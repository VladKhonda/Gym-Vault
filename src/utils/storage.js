// localStorage utilities for data persistence

export const STORAGE_KEYS = {
  ONBOARDING: 'gymvault_onboarding',
  PROFILE: 'gymvault_profile',
  EXERCISES: 'gymvault_exercises',
  WORKOUTS: 'gymvault_workouts',
  JOURNAL: 'gymvault_journal',
  PROGRESS: 'gymvault_progress',
  SETTINGS: 'gymvault_settings',
}

export const getStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return defaultValue
  }
}

export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error)
  }
}

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
  }
}

// Initialize demo data if needed
export const initDemoData = () => {
  const onboarding = getStorage(STORAGE_KEYS.ONBOARDING)
  if (!onboarding) {
    // Demo exercises
    const demoExercises = [
      {
        id: '1',
        name: 'Bench Press',
        muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
        equipment: 'Barbell',
        description: 'A compound exercise targeting the chest, triceps, and anterior deltoids.',
        technique: 'Lie on bench, grip bar slightly wider than shoulders, lower to chest, press up.',
        mistakes: 'Bouncing bar off chest, arching back excessively, flaring elbows too wide.',
        videoLink: '',
      },
      {
        id: '2',
        name: 'Squat',
        muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
        equipment: 'Barbell',
        description: 'The king of leg exercises, targeting the entire lower body.',
        technique: 'Stand with feet shoulder-width, lower until thighs parallel, drive through heels.',
        mistakes: 'Knees caving in, not going deep enough, forward lean.',
        videoLink: '',
      },
      {
        id: '3',
        name: 'Deadlift',
        muscleGroups: ['Back', 'Hamstrings', 'Glutes'],
        equipment: 'Barbell',
        description: 'Full-body strength exercise targeting posterior chain.',
        technique: 'Hinge at hips, keep back straight, drive through heels, stand tall.',
        mistakes: 'Rounded back, bar too far from body, hyperextending at top.',
        videoLink: '',
      },
    ]

    setStorage(STORAGE_KEYS.EXERCISES, demoExercises)
    setStorage(STORAGE_KEYS.WORKOUTS, [])
    setStorage(STORAGE_KEYS.JOURNAL, [])
    setStorage(STORAGE_KEYS.PROGRESS, {
      measurements: {
        neck: null,
        chest: null,
        bicepsRelaxed: null,
        bicepsFlexed: null,
        waist: null,
        hips: null,
        thigh: null,
      },
      history: [],
    })
  }
}

