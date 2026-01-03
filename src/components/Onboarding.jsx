import { useState } from 'react'
import { getTranslation } from '../utils/translations'
import { initDemoData } from '../utils/storage'
import OnboardingStep1 from './OnboardingStep1'
import OnboardingStep2 from './OnboardingStep2'
import OnboardingStep3 from './OnboardingStep3'
import OnboardingStep4 from './OnboardingStep4'
import OnboardingStep5 from './OnboardingStep5'
import OnboardingStep6 from './OnboardingStep6'
import styles from './Onboarding.module.css'
import '../styles/index.css'

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    name: '',
    height: '',
    weight: '',
    age: '',
    gender: '',
    goal: '',
    units: 'cm',
    language: 'en',
    theme: 'colorful',
    trainer: 'ai',
    demoMode: false,
  })

  const totalSteps = 6

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    // If demo mode was selected, initialize demo data
    if (data.demoMode) {
      initDemoData()
    }
    onComplete(data)
  }

  const updateData = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const lang = data.language || 'en'

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingStep1
            data={data}
            updateData={updateData}
            language={lang}
          />
        )
      case 2:
        return (
          <OnboardingStep2
            data={data}
            updateData={updateData}
            language={lang}
          />
        )
      case 3:
        return (
          <OnboardingStep3
            data={data}
            updateData={updateData}
            language={lang}
            units={data.units}
          />
        )
      case 4:
        return (
          <OnboardingStep4
            data={data}
            updateData={updateData}
            language={lang}
          />
        )
      case 5:
        return (
          <OnboardingStep5
            data={data}
            updateData={updateData}
            language={lang}
          />
        )
      case 6:
        return (
          <OnboardingStep6
            data={data}
            updateData={updateData}
            language={lang}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.onboarding}>
      <div className={styles.container}>
        <div className={styles.progress}>
          <div
            className={styles.progressBar}
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className={styles.content}>{renderStep()}</div>

        <div className={styles.actions}>
          {step > 1 && (
            <button
              onClick={handleBack}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              {getTranslation('back', lang)}
            </button>
          )}
          <button
            onClick={handleNext}
            className={`${styles.button} ${styles.buttonPrimary}`}
            disabled={step === 2 && !data.name}
          >
            {step === totalSteps
              ? getTranslation('finish', lang)
              : getTranslation('next', lang)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
