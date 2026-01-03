import { useState, useEffect } from 'react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { getStorage, setStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import { convertCmToInches, convertInchesToCm } from '../utils/units'
import './Progress.css'

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const Progress = () => {
  const [measurements, setMeasurements] = useState({
    neck: null,
    chest: null,
    bicepsRelaxed: null,
    bicepsFlexed: null,
    waist: null,
    hips: null,
    thigh: null,
  })
  const [startingValues, setStartingValues] = useState({
    neck: null,
    chest: null,
    bicepsRelaxed: null,
    bicepsFlexed: null,
    waist: null,
    hips: null,
    thigh: null,
  })
  const [targetValues, setTargetValues] = useState({
    neck: null,
    chest: null,
    bicepsRelaxed: null,
    bicepsFlexed: null,
    waist: null,
    hips: null,
    thigh: null,
  })
  const [showStarting, setShowStarting] = useState(false)
  const [showTarget, setShowTarget] = useState(false)
  const [bicepsMode, setBicepsMode] = useState('relaxed') // 'relaxed' or 'flexed'
  const [showInstructions, setShowInstructions] = useState(null)

  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en', units: 'cm' })
  const lang = settings.language || 'en'
  const units = settings.units || 'cm'

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = () => {
    const stored = getStorage(STORAGE_KEYS.PROGRESS, {
      measurements: {},
      startingValues: {},
      targetValues: {},
    })
    setMeasurements(stored.measurements || {})
    setStartingValues(stored.startingValues || {})
    setTargetValues(stored.targetValues || {})
  }

  const saveProgress = () => {
    setStorage(STORAGE_KEYS.PROGRESS, {
      measurements,
      startingValues,
      targetValues,
    })
  }

  const handleMeasurementChange = (key, value) => {
    // Convert to cm for storage (always store in cm)
    const numValue = value ? parseFloat(value) : null
    const cmValue = units === 'inches' && numValue ? convertInchesToCm(numValue) : numValue
    
    setMeasurements({
      ...measurements,
      [key]: cmValue,
    })
  }

  const handleStartingChange = (key, value) => {
    const numValue = value ? parseFloat(value) : null
    const cmValue = units === 'inches' && numValue ? convertInchesToCm(numValue) : numValue
    
    setStartingValues({
      ...startingValues,
      [key]: cmValue,
    })
  }

  const handleTargetChange = (key, value) => {
    const numValue = value ? parseFloat(value) : null
    const cmValue = units === 'inches' && numValue ? convertInchesToCm(numValue) : numValue
    
    setTargetValues({
      ...targetValues,
      [key]: cmValue,
    })
  }

  useEffect(() => {
    saveProgress()
  }, [measurements, startingValues, targetValues])

  // Convert measurements to display units
  const getDisplayValue = (value) => {
    if (!value) return ''
    const num = parseFloat(value)
    return units === 'inches' ? convertCmToInches(num) : num.toFixed(1)
  }

  // Get values for chart (normalize to 0-100 scale for visualization)
  const getChartData = () => {
    const labels = [
      getTranslation('neck', lang),
      getTranslation('chest', lang),
      getTranslation('biceps', lang),
      getTranslation('waist', lang),
      getTranslation('hips', lang),
      getTranslation('thigh', lang),
    ]

    // Use biceps mode to select which biceps value
    const bicepsKey = bicepsMode === 'flexed' ? 'bicepsFlexed' : 'bicepsRelaxed'

    const getValue = (key) => {
      if (key === 'biceps') {
        return measurements[bicepsKey] || 0
      }
      return measurements[key] || 0
    }

    const getStartingValue = (key) => {
      if (key === 'biceps') {
        return startingValues[bicepsKey] || 0
      }
      return startingValues[key] || 0
    }

    const getTargetValue = (key) => {
      if (key === 'biceps') {
        return targetValues[bicepsKey] || 0
      }
      return targetValues[key] || 0
    }

    // Normalize values (simple normalization - in real app, you'd want better scaling)
    const normalize = (value, max = 150) => {
      return value ? (value / max) * 100 : 0
    }

    const currentData = [
      normalize(getValue('neck')),
      normalize(getValue('chest')),
      normalize(getValue('biceps')),
      normalize(getValue('waist')),
      normalize(getValue('hips')),
      normalize(getValue('thigh')),
    ]

    const startingData = showStarting
      ? [
          normalize(getStartingValue('neck')),
          normalize(getStartingValue('chest')),
          normalize(getStartingValue('biceps')),
          normalize(getStartingValue('waist')),
          normalize(getStartingValue('hips')),
          normalize(getStartingValue('thigh')),
        ]
      : null

    const targetData = showTarget
      ? [
          normalize(getTargetValue('neck')),
          normalize(getTargetValue('chest')),
          normalize(getTargetValue('biceps')),
          normalize(getTargetValue('waist')),
          normalize(getTargetValue('hips')),
          normalize(getTargetValue('thigh')),
        ]
      : null

    const datasets = [
      {
        label: getTranslation('current', lang),
        data: currentData,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 2,
      },
    ]

    if (startingData) {
      datasets.push({
        label: getTranslation('starting', lang),
        data: startingData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
      })
    }

    if (targetData) {
      datasets.push({
        label: getTranslation('target', lang),
        data: targetData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        borderDash: [10, 5],
      })
    }

    return {
      labels,
      datasets,
    }
  }

  const measurementFields = [
    {
      key: 'neck',
      label: getTranslation('neck', lang),
      instructions: 'Measure around the middle of your neck, just below the larynx.',
    },
    {
      key: 'chest',
      label: getTranslation('chest', lang),
      instructions: 'Measure around the fullest part of your chest, typically at nipple level.',
    },
    {
      key: 'bicepsRelaxed',
      label: getTranslation('bicepsRelaxed', lang),
      instructions: 'Measure around the middle of your bicep with arm relaxed at your side.',
    },
    {
      key: 'bicepsFlexed',
      label: getTranslation('bicepsFlexed', lang),
      instructions: 'Measure around the middle of your bicep with arm flexed at 90 degrees.',
    },
    {
      key: 'waist',
      label: getTranslation('waist', lang),
      instructions: 'Measure around your natural waist, typically the narrowest point above your belly button.',
    },
    {
      key: 'hips',
      label: getTranslation('hips', lang),
      instructions: 'Measure around the fullest part of your hips/buttocks.',
    },
    {
      key: 'thigh',
      label: getTranslation('thigh', lang),
      instructions: 'Measure around the middle of your thigh, typically the largest part.',
    },
  ]

  return (
    <div className="progress">
      <h1>{getTranslation('myPhysicalProfile', lang)}</h1>

      <div className="progress-controls">
        <label className="toggle-control">
          <input
            type="checkbox"
            checked={showStarting}
            onChange={(e) => setShowStarting(e.target.checked)}
          />
          <span>{getTranslation('showStarting', lang)}</span>
        </label>
        <label className="toggle-control">
          <input
            type="checkbox"
            checked={showTarget}
            onChange={(e) => setShowTarget(e.target.checked)}
          />
          <span>{getTranslation('showTarget', lang)}</span>
        </label>
        <div className="biceps-toggle">
          <label>{getTranslation('biceps', lang)}:</label>
          <button
            className={bicepsMode === 'relaxed' ? 'active' : ''}
            onClick={() => setBicepsMode('relaxed')}
          >
            {getTranslation('bicepsRelaxed', lang)}
          </button>
          <button
            className={bicepsMode === 'flexed' ? 'active' : ''}
            onClick={() => setBicepsMode('flexed')}
          >
            {getTranslation('bicepsFlexed', lang)}
          </button>
        </div>
      </div>

      <div className="progress-chart-container">
        <Radar
          data={getChartData()}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
              },
            },
            plugins: {
              legend: {
                position: 'top',
              },
            },
          }}
        />
      </div>

      <div className="measurements-section">
        <h2>{getTranslation('measurements', lang)}</h2>
        <div className="measurements-grid">
          {measurementFields.map((field) => {
            // Skip the biceps field that's not in current mode
            if (field.key.includes('biceps')) {
              const isCurrentMode =
                (field.key === 'bicepsRelaxed' && bicepsMode === 'relaxed') ||
                (field.key === 'bicepsFlexed' && bicepsMode === 'flexed')
              if (!isCurrentMode) return null
            }

            return (
              <div key={field.key} className="measurement-item">
                <div className="measurement-header">
                  <label>{field.label}</label>
                  <button
                    className="info-button"
                    onClick={() =>
                      setShowInstructions(
                        showInstructions === field.key ? null : field.key
                      )
                    }
                  >
                    ℹ️
                  </button>
                </div>
                {showInstructions === field.key && (
                  <div className="measurement-instructions">
                    {field.instructions}
                  </div>
                )}
                <div className="measurement-inputs">
                  <div className="input-group">
                    <label>{getTranslation('current', lang)}</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder={units}
                      value={getDisplayValue(measurements[field.key])}
                      onChange={(e) =>
                        handleMeasurementChange(field.key, e.target.value)
                      }
                      className="measurement-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>{getTranslation('starting', lang)}</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder={units}
                      value={getDisplayValue(startingValues[field.key])}
                      onChange={(e) =>
                        handleStartingChange(field.key, e.target.value)
                      }
                      className="measurement-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>{getTranslation('target', lang)}</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder={units}
                      value={getDisplayValue(targetValues[field.key])}
                      onChange={(e) =>
                        handleTargetChange(field.key, e.target.value)
                      }
                      className="measurement-input"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Progress

