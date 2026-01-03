import { getTranslation } from '../utils/translations'
import styles from './Onboarding.module.css'

const OnboardingStep4 = ({ data, updateData, language }) => {
  const lang = language || 'en'

  return (
    <div className={styles.step}>
      <h2>{getTranslation('onboardingStep3', lang) || 'What are your fitness goals?'}</h2>
      <div className={styles.options}>
        {['muscleGain', 'fatLoss', 'strength', 'maintenance', 'custom'].map((goal) => (
          <button
            key={goal}
            className={`option-button ${data.goal === goal ? 'active' : ''}`}
            onClick={() => updateData('goal', goal)}
          >
            {getTranslation(goal, lang)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OnboardingStep4

