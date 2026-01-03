import { getTranslation } from '../utils/translations'
import styles from './Onboarding.module.css'

const OnboardingStep5 = ({ data, updateData, language }) => {
  const lang = language || 'en'

  return (
    <div className={styles.step}>
      <h2>{getTranslation('onboardingStep7', lang) || 'Choose your trainer'}</h2>
      <div className={styles.options}>
        <button
          className={`option-button ${styles.disabled}`}
          disabled
          style={{ opacity: 0.5, cursor: 'not-allowed' }}
        >
          {getTranslation('humanTrainer', lang)} ({getTranslation('comingSoon', lang) || 'Coming Soon'})
        </button>
        <button
          className={`option-button ${data.trainer === 'ai' ? 'active' : ''}`}
          onClick={() => updateData('trainer', 'ai')}
        >
          {getTranslation('aiTrainer', lang)}
        </button>
      </div>
    </div>
  )
}

export default OnboardingStep5

