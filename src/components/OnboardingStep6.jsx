import { getTranslation } from '../utils/translations'
import styles from './Onboarding.module.css'

const OnboardingStep6 = ({ data, updateData, language }) => {
  const lang = language || 'en'

  return (
    <div className={styles.step}>
      <h2>{getTranslation('onboardingStep6', lang) || 'Choose your theme'}</h2>
      <div className={styles.options}>
        {['colorful', 'light', 'dark'].map((theme) => (
          <button
            key={theme}
            className={`option-button ${data.theme === theme ? 'active' : ''}`}
            onClick={() => updateData('theme', theme)}
          >
            {getTranslation(theme, lang)}
          </button>
        ))}
      </div>
      <p style={{ marginTop: '1rem', opacity: 0.6, fontSize: '0.875rem' }}>
        {/* TODO: Schedule feature coming soon */}
        {getTranslation('scheduleComingSoon', lang) || 'Schedule feature coming soon'}
      </p>
    </div>
  )
}

export default OnboardingStep6

