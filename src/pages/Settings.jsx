import { useAppContext } from '../contexts/AppContext'
import { getTranslation } from '../utils/translations'
import { removeStorage, STORAGE_KEYS, initDemoData } from '../utils/storage'
import './Settings.css'

const Settings = () => {
  const { profile, settings, updateProfile, updateSettings } = useAppContext()
  const lang = settings.language || 'en'

  const handleProfileChange = (key, value) => {
    updateProfile({ ...profile, [key]: value })
  }

  const handleSettingChange = (key, value) => {
    updateSettings({ [key]: value })
    
    // Reload page to apply language changes
    if (key === 'language') {
      setTimeout(() => window.location.reload(), 100)
    }
  }

  const handleResetDemoData = () => {
    if (window.confirm('Are you sure you want to reset all demo data? This cannot be undone.')) {
      // Clear all storage
      Object.values(STORAGE_KEYS).forEach((key) => removeStorage(key))
      // Reinitialize demo data
      initDemoData()
      // Reload page
      window.location.reload()
    }
  }

  return (
    <div className="settings">
      <h1>{getTranslation('settings', lang)}</h1>

      <div className="settings-section">
        <h2>{getTranslation('profile', lang)}</h2>
        <div className="settings-form">
          <div className="form-group">
            <label>{getTranslation('name', lang)}</label>
            <input
              type="text"
              value={profile?.name || ''}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>{getTranslation('height', lang)}</label>
            <input
              type="number"
              value={profile?.height || ''}
              onChange={(e) => handleProfileChange('height', e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>{getTranslation('weight', lang)}</label>
            <input
              type="number"
              value={profile?.weight || ''}
              onChange={(e) => handleProfileChange('weight', e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>{getTranslation('age', lang)}</label>
            <input
              type="number"
              value={profile?.age || ''}
              onChange={(e) => handleProfileChange('age', e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>{getTranslation('gender', lang)}</label>
            <select
              value={profile?.gender || ''}
              onChange={(e) => handleProfileChange('gender', e.target.value)}
              className="form-input"
            >
              <option value="">-</option>
              <option value="male">{getTranslation('male', lang)}</option>
              <option value="female">{getTranslation('female', lang)}</option>
              <option value="other">{getTranslation('other', lang)}</option>
            </select>
          </div>
          <div className="form-group">
            <label>{getTranslation('goal', lang)}</label>
            <select
              value={profile?.goal || ''}
              onChange={(e) => handleProfileChange('goal', e.target.value)}
              className="form-input"
            >
              <option value="">-</option>
              <option value="muscleGain">{getTranslation('muscleGain', lang)}</option>
              <option value="fatLoss">{getTranslation('fatLoss', lang)}</option>
              <option value="strength">{getTranslation('strength', lang)}</option>
              <option value="maintenance">{getTranslation('maintenance', lang)}</option>
              <option value="custom">{getTranslation('custom', lang)}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2>{getTranslation('language', lang)}</h2>
        <div className="settings-options">
          <button
            className={settings.language === 'en' ? 'active' : ''}
            onClick={() => handleSettingChange('language', 'en')}
          >
            English
          </button>
          <button
            className={settings.language === 'ua' ? 'active' : ''}
            onClick={() => handleSettingChange('language', 'ua')}
          >
            Українська
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2>{getTranslation('units', lang)}</h2>
        <div className="settings-options">
          <button
            className={settings.units === 'cm' ? 'active' : ''}
            onClick={() => handleSettingChange('units', 'cm')}
          >
            cm
          </button>
          <button
            className={settings.units === 'inches' ? 'active' : ''}
            onClick={() => handleSettingChange('units', 'inches')}
          >
            inches
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2>{getTranslation('theme', lang)}</h2>
        <div className="settings-options">
          {['colorful', 'light', 'dark'].map((theme) => (
            <button
              key={theme}
              className={settings.theme === theme ? 'active' : ''}
              onClick={() => handleSettingChange('theme', theme)}
            >
              {getTranslation(theme, lang)}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2>Data</h2>
        <button onClick={handleResetDemoData} className="btn-danger">
          {getTranslation('resetDemoData', lang)}
        </button>
      </div>
    </div>
  )
}

export default Settings
