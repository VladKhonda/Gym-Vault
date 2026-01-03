import { useState, useEffect } from 'react'
import { getStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import './WorkoutBuilder.css'

const WorkoutBuilder = ({ workout, onSave, onCancel }) => {
  const [name, setName] = useState('')
  const [exercises, setExercises] = useState([])
  const [availableExercises, setAvailableExercises] = useState([])
  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en' })
  const lang = settings.language || 'en'

  useEffect(() => {
    const stored = getStorage(STORAGE_KEYS.EXERCISES, [])
    setAvailableExercises(stored)
    
    if (workout) {
      setName(workout.name || '')
      setExercises(workout.exercises || [])
    }
  }, [workout])

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        exerciseId: '',
        exerciseName: '',
        sets: 3,
        reps: 10,
        rest: 60,
        weight: 0,
      },
    ])
  }

  const handleRemoveExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const handleExerciseChange = (index, field, value) => {
    const updated = [...exercises]
    updated[index] = { ...updated[index], [field]: value }
    
    // If exerciseId changed, update exerciseName
    if (field === 'exerciseId') {
      const exercise = availableExercises.find((e) => e.id === value)
      if (exercise) {
        updated[index].exerciseName = exercise.name
      }
    }
    
    setExercises(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      name,
      exercises: exercises.filter((e) => e.exerciseId),
    })
  }

  return (
    <div className="workout-builder">
      <div className="workout-builder-header">
        <h1>{getTranslation('createWorkout', lang)}</h1>
        <button onClick={onCancel} className="btn-secondary">
          {getTranslation('cancel', lang)}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="workout-builder-form">
        <div className="form-group">
          <label>{getTranslation('workoutName', lang)}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>{getTranslation('selectExercises', lang)}</label>
          <button
            type="button"
            onClick={handleAddExercise}
            className="btn-primary"
          >
            {getTranslation('add', lang)} {getTranslation('exercises', lang)}
          </button>
        </div>

        <div className="exercises-list">
          {exercises.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <div className="exercise-item-header">
                <select
                  value={exercise.exerciseId}
                  onChange={(e) =>
                    handleExerciseChange(index, 'exerciseId', e.target.value)
                  }
                  required
                  className="form-input"
                >
                  <option value="">Select exercise</option>
                  {availableExercises.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveExercise(index)}
                  className="btn-remove"
                >
                  ×
                </button>
              </div>

              <div className="exercise-item-details">
                <div className="detail-group">
                  <label>{getTranslation('sets', lang)}</label>
                  <input
                    type="number"
                    min="1"
                    value={exercise.sets}
                    onChange={(e) =>
                      handleExerciseChange(index, 'sets', parseInt(e.target.value))
                    }
                    className="form-input small"
                  />
                </div>
                <div className="detail-group">
                  <label>{getTranslation('reps', lang)}</label>
                  <input
                    type="number"
                    min="1"
                    value={exercise.reps}
                    onChange={(e) =>
                      handleExerciseChange(index, 'reps', parseInt(e.target.value))
                    }
                    className="form-input small"
                  />
                </div>
                <div className="detail-group">
                  <label>{getTranslation('rest', lang)}</label>
                  <input
                    type="number"
                    min="0"
                    value={exercise.rest}
                    onChange={(e) =>
                      handleExerciseChange(index, 'rest', parseInt(e.target.value))
                    }
                    className="form-input small"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">
            {getTranslation('cancel', lang)}
          </button>
          <button type="submit" className="btn-primary">
            {getTranslation('save', lang)}
          </button>
        </div>
      </form>
    </div>
  )
}

export default WorkoutBuilder

