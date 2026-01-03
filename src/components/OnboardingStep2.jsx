import { getTranslation } from '../utils/translations'
import styles from './Onboarding.module.css'

const OnboardingStep2 = ({ data, updateData, language }) => {
  const lang = language || 'en'

  return (
    <div className={styles.step}>
      <h2>{getTranslation('onboardingStep2', lang) || 'Tell us about yourself'}</h2>
      <input
        type="text"
        placeholder={getTranslation('name', lang)}
        value={data.name || ''}
        onChange={(e) => updateData('name', e.target.value)}
        className={styles.input}
        autoFocus
      />
      <div className={styles.options}>
        <button
          className={`option-button ${data.units === 'cm' ? 'active' : ''}`}
          onClick={() => updateData('units', 'cm')}
        >
          cm / kg
        </button>
        <button
          className={`option-button ${data.units === 'inches' ? 'active' : ''}`}
          onClick={() => updateData('units', 'inches')}
        >
          inches / lbs
        </button>
      </div>
    </div>
  )
}

export default OnboardingStep2

