import { useState } from 'react'
import { getStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import './WorkoutExecution.css'

const WorkoutExecution = ({ workout, onFinish, onCancel }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedSets, setCompletedSets] = useState({})
  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en' })
  const lang = settings.language || 'en'

  const currentExercise = workout.exercises[currentExerciseIndex]
  const exerciseKey = `${currentExercise.exerciseId}-${currentExerciseIndex}`
  const sets = completedSets[exerciseKey] || []

  const handleCompleteSet = (weight, reps) => {
    const newSets = [...sets, { weight, reps, completed: true }]
    setCompletedSets({
      ...completedSets,
      [exerciseKey]: newSets,
    })
  }

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    } else {
      // Finish workout
      const workoutLog = {
        workoutId: workout.id,
        workoutName: workout.name,
        exercises: workout.exercises.map((ex) => ({
          ...ex,
          completedSets: completedSets[`${ex.exerciseId}-${workout.exercises.indexOf(ex)}`] || [],
        })),
        date: new Date().toISOString(),
      }
      onFinish(workoutLog)
    }
  }

  const handleFinish = () => {
    const workoutLog = {
      workoutId: workout.id,
      workoutName: workout.name,
      exercises: workout.exercises.map((ex) => ({
        ...ex,
        completedSets: completedSets[`${ex.exerciseId}-${workout.exercises.indexOf(ex)}`] || [],
      })),
      date: new Date().toISOString(),
    }
    onFinish(workoutLog)
  }

  return (
    <div className="workout-execution">
      <div className="workout-execution-header">
        <h1>{workout.name}</h1>
        <button onClick={onCancel} className="btn-secondary">
          {getTranslation('cancel', lang)}
        </button>
      </div>

      <div className="workout-progress">
        Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
      </div>

      <div className="current-exercise">
        <h2>{currentExercise.exerciseName}</h2>
        <div className="exercise-target">
          Target: {currentExercise.sets} {getTranslation('sets', lang)} × {currentExercise.reps}{' '}
          {getTranslation('reps', lang)}
        </div>

        <div className="sets-list">
          {Array.from({ length: currentExercise.sets }).map((_, index) => {
            const set = sets[index]
            return (
              <div key={index} className="set-item">
                <div className="set-number">Set {index + 1}</div>
                {set ? (
                  <div className="set-completed">
                    {set.weight}kg × {set.reps} {getTranslation('reps', lang)}
                    <span className="checkmark">✓</span>
                  </div>
                ) : (
                  <SetInput
                    onComplete={(weight, reps) => handleCompleteSet(weight, reps)}
                    targetReps={currentExercise.reps}
                  />
                )}
              </div>
            )
          })}
        </div>

        {sets.length === currentExercise.sets && (
          <button onClick={handleNextExercise} className="btn-primary large">
            {currentExerciseIndex < workout.exercises.length - 1
              ? 'Next Exercise'
              : getTranslation('finish', lang)}
          </button>
        )}
      </div>

      <div className="workout-actions-bottom">
        <button onClick={handleFinish} className="btn-secondary">
          {getTranslation('finish', lang)} {getTranslation('workouts', lang)}
        </button>
      </div>
    </div>
  )
}

const SetInput = ({ onComplete, targetReps }) => {
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState(targetReps.toString())

  const handleSubmit = () => {
    if (weight && reps) {
      onComplete(parseFloat(weight), parseInt(reps))
      setWeight('')
      setReps(targetReps.toString())
    }
  }

  return (
    <div className="set-input">
      <input
        type="number"
        placeholder={getTranslation('weight', lang)}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="input-small"
      />
      <input
        type="number"
        placeholder={getTranslation('reps', lang)}
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className="input-small"
      />
      <button onClick={handleSubmit} className="btn-primary small">
        {getTranslation('completed', lang)}
      </button>
    </div>
  )
}

export default WorkoutExecution

