import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import './Home.css'

const Home = () => {
  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en' })
  const profile = getStorage(STORAGE_KEYS.PROFILE, {})
  const lang = settings.language || 'en'

  return (
    <div className="home">
      <h1>
        {getTranslation('home', lang)} - GymVault
      </h1>
      {profile.name && (
        <p className="welcome-message">
          Welcome back, {profile.name}!
        </p>
      )}
      <div className="home-grid">
        <Link to="/exercises" className="home-card">
          <h2>{getTranslation('exercises', lang)}</h2>
          <p>Build your exercise knowledge base</p>
        </Link>
        <Link to="/workouts" className="home-card">
          <h2>{getTranslation('workouts', lang)}</h2>
          <p>Create and execute workout plans</p>
        </Link>
        <Link to="/journal" className="home-card">
          <h2>{getTranslation('journal', lang)}</h2>
          <p>Track your training sessions</p>
        </Link>
        <Link to="/progress" className="home-card">
          <h2>{getTranslation('progress', lang)}</h2>
          <p>Visualize your physical profile</p>
        </Link>
      </div>
    </div>
  )
}

export default Home

