import { useState } from 'react'
import { getTranslation } from '../utils/translations'
import './Onboarding.css'

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
  })

  const totalSteps = 7

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete(data)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const updateData = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const lang = data.language || 'en'

  return (
    <div className="onboarding">
      <div className="onboarding-container">
        <div className="onboarding-progress">
          <div
            className="progress-bar"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="onboarding-content">
          {step === 1 && (
            <div className="onboarding-step">
              <h2>{getTranslation('onboardingStep1', lang)}</h2>
              <input
                type="text"
                placeholder={getTranslation('name', lang)}
                value={data.name}
                onChange={(e) => updateData('name', e.target.value)}
                className="onboarding-input"
                autoFocus
              />
            </div>
          )}

          {step === 2 && (
            <div className="onboarding-step">
              <h2>{getTranslation('onboardingStep2', lang)}</h2>
              <input
                type="number"
                placeholder={getTranslation('height', lang)}
                value={data.height}
                onChange={(e) => updateData('height', e.target.value)}
                className="onboarding-input"
              />
              <input
                type="number"
                placeholder={getTranslation('weight', lang)}
                value={data.weight}
                onChange={(e) => updateData('weight', e.target.value)}
                className="onboarding-input"
              />
              <input
                type="number"
                placeholder={getTranslation('age', lang)}
                value={data.age}
                onChange={(e) => updateData('age', e.target.value)}
                className="onboarding-input"
              />
              <select
                value={data.gender}
                onChange={(e) => updateData('gender', e.target.value)}
                className="onboarding-input"
              >
                <option value="">{getTranslation('gender', lang)}</option>
                <option value="male">{getTranslation('male', lang)}</option>
                <option value="female">{getTranslation('female', lang)}</option>
                <option value="other">{getTranslation('other', lang)}</option>
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="onboarding-step">
              <h2>{getTranslation('onboardingStep3', lang)}</h2>
              <div className="onboarding-options">
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
          )}

          {step === 4 && (
            <div className="onboarding-step">
              <h2>{getTranslation('onboardingStep4', lang)}</h2>
              <div className="onboarding-options">
                <button
                  className={`option-button ${data.units === 'cm' ? 'active' : ''}`}
                  onClick={() => updateData('units', 'cm')}
                >
                  cm
                </button>
                <button
                  className={`option-button ${data.units === 'inches' ? 'active' : ''}`}
                  onClick={() => updateData('units', 'inches')}
                >
                  inches
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="onboarding-step">
              <h2>{getTranslation('onboardingStep5', lang)}</h2>
              <div className="onboarding-options">
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
            </div>
          )}

          {step === 6 && (
            <div className="onboarding-step">
              <h2>{getTranslation('onboardingStep6', lang)}</h2>
              <div className="onboarding-options">
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
            </div>
          )}

          {step === 7 && (
            <div className="onboarding-step">
              <h2>{getTranslation('onboardingStep7', lang)}</h2>
              <div className="onboarding-options">
                <button
                  className={`option-button ${data.trainer === 'human' ? 'active' : ''}`}
                  onClick={() => updateData('trainer', 'human')}
                >
                  {getTranslation('humanTrainer', lang)}
                </button>
                <button
                  className={`option-button ${data.trainer === 'ai' ? 'active' : ''}`}
                  onClick={() => updateData('trainer', 'ai')}
                >
                  {getTranslation('aiTrainer', lang)}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="onboarding-actions">
          {step > 1 && (
            <button onClick={handleBack} className="onboarding-button secondary">
              {getTranslation('back', lang)}
            </button>
          )}
          <button
            onClick={handleNext}
            className="onboarding-button primary"
            disabled={step === 1 && !data.name}
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

