import { getTranslation } from '../utils/translations'
import styles from './Onboarding.module.css'
import '../styles/index.css'

const OnboardingStep1 = ({ data, updateData, language }) => {
  const lang = language || 'en'

  return (
    <div className={styles.welcomeScreen}>
      <div className={styles.logo}>💪 GymVault</div>
      <h2>{getTranslation('onboarding', lang)}</h2>
      <div className={styles.languageOptions}>
        <button
          className={`option-button ${data.language === 'en' ? 'active' : ''}`}
          onClick={() => updateData('language', 'en')}
        >
          English
        </button>
        <button
          className={`option-button ${data.language === 'ua' ? 'active' : ''}`}
          onClick={() => updateData('language', 'ua')}
        >
          Українська
        </button>
      </div>
      <button
        className={styles.demoButton}
        onClick={() => {
          // Demo mode will be handled in parent component
          updateData('demoMode', true)
        }}
      >
        {getTranslation('demoMode', lang) || 'Demo Mode'}
      </button>
      <p style={{ opacity: 0.6, fontSize: '0.875rem' }}>
        {getTranslation('loginDisabled', lang) || 'Login feature coming soon'}
      </p>
    </div>
  )
}

export default OnboardingStep1

