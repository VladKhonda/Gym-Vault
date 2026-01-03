import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en' })
  const lang = settings.language || 'en'

  const navItems = [
    { path: '/', label: 'home' },
    { path: '/exercises', label: 'exercises' },
    { path: '/workouts', label: 'workouts' },
    { path: '/journal', label: 'journal' },
    { path: '/progress', label: 'progress' },
    { path: '/ai-trainer', label: 'aiTrainer' },
    { path: '/settings', label: 'settings' },
  ]

  return (
    <div className="layout">
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>GymVault</h1>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {getTranslation(item.label, lang)}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout

