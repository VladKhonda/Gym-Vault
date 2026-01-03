import { getTranslation } from '../utils/translations'
import styles from './Onboarding.module.css'

const OnboardingStep3 = ({ data, updateData, language, units }) => {
  const lang = language || 'en'
  const heightUnit = units === 'inches' ? 'inches' : 'cm'
  const weightUnit = units === 'inches' ? 'lbs' : 'kg'

  return (
    <div className={styles.step}>
      <h2>{getTranslation('onboardingStep2', lang) || 'Tell us about yourself'}</h2>
      <input
        type="number"
        placeholder={`${getTranslation('height', lang)} (${heightUnit})`}
        value={data.height || ''}
        onChange={(e) => updateData('height', e.target.value)}
        className={styles.input}
      />
      <input
        type="number"
        placeholder={`${getTranslation('weight', lang)} (${weightUnit})`}
        value={data.weight || ''}
        onChange={(e) => updateData('weight', e.target.value)}
        className={styles.input}
      />
      <input
        type="number"
        placeholder={getTranslation('age', lang)}
        value={data.age || ''}
        onChange={(e) => updateData('age', e.target.value)}
        className={styles.input}
      />
      <select
        value={data.gender || ''}
        onChange={(e) => updateData('gender', e.target.value)}
        className={styles.input}
      >
        <option value="">{getTranslation('gender', lang)}</option>
        <option value="male">{getTranslation('male', lang)}</option>
        <option value="female">{getTranslation('female', lang)}</option>
        <option value="other">{getTranslation('other', lang)}</option>
      </select>
    </div>
  )
}

export default OnboardingStep3

