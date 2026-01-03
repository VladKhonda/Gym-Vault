import { useState, useEffect } from 'react'
import { getStorage, setStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import WorkoutBuilder from '../components/WorkoutBuilder'
import WorkoutExecution from '../components/WorkoutExecution'
import './Workouts.css'

const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [showBuilder, setShowBuilder] = useState(false)
  const [activeWorkout, setActiveWorkout] = useState(null)
  const [editingWorkout, setEditingWorkout] = useState(null)
  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en' })
  const lang = settings.language || 'en'

  useEffect(() => {
    loadWorkouts()
  }, [])

  const loadWorkouts = () => {
    const stored = getStorage(STORAGE_KEYS.WORKOUTS, [])
    setWorkouts(stored)
  }

  const handleCreateWorkout = () => {
    setEditingWorkout(null)
    setShowBuilder(true)
  }

  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout)
    setShowBuilder(true)
  }

  const handleDeleteWorkout = (id) => {
    if (window.confirm(getTranslation('delete', lang) + '?')) {
      const updated = workouts.filter((w) => w.id !== id)
      setWorkouts(updated)
      setStorage(STORAGE_KEYS.WORKOUTS, updated)
    }
  }

  const handleSaveWorkout = (workoutData) => {
    let updated
    if (editingWorkout) {
      updated = workouts.map((w) =>
        w.id === editingWorkout.id ? { ...workoutData, id: editingWorkout.id } : w
      )
    } else {
      const newWorkout = {
        ...workoutData,
        id: Date.now().toString(),
      }
      updated = [...workouts, newWorkout]
    }
    setWorkouts(updated)
    setStorage(STORAGE_KEYS.WORKOUTS, updated)
    setShowBuilder(false)
    setEditingWorkout(null)
  }

  const handleStartWorkout = (workout) => {
    setActiveWorkout(workout)
  }

  const handleFinishWorkout = (workoutLog) => {
    // Save to journal
    const journal = getStorage(STORAGE_KEYS.JOURNAL, [])
    journal.push({
      ...workoutLog,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    })
    setStorage(STORAGE_KEYS.JOURNAL, journal)
    setActiveWorkout(null)
  }

  if (activeWorkout) {
    return (
      <WorkoutExecution
        workout={activeWorkout}
        onFinish={handleFinishWorkout}
        onCancel={() => setActiveWorkout(null)}
      />
    )
  }

  if (showBuilder) {
    return (
      <WorkoutBuilder
        workout={editingWorkout}
        onSave={handleSaveWorkout}
        onCancel={() => {
          setShowBuilder(false)
          setEditingWorkout(null)
        }}
      />
    )
  }

  return (
    <div className="workouts">
      <div className="workouts-header">
        <h1>{getTranslation('workouts', lang)}</h1>
        <button onClick={handleCreateWorkout} className="btn-primary">
          {getTranslation('createWorkout', lang)}
        </button>
      </div>

      <div className="workouts-list">
        {workouts.map((workout) => (
          <div key={workout.id} className="workout-card">
            <h3>{workout.name}</h3>
            <p className="workout-exercises-count">
              {workout.exercises?.length || 0} {getTranslation('exercises', lang)}
            </p>
            <div className="workout-actions">
              <button
                onClick={() => handleStartWorkout(workout)}
                className="btn-primary"
              >
                {getTranslation('startWorkout', lang)}
              </button>
              <button
                onClick={() => handleEditWorkout(workout)}
                className="btn-secondary"
              >
                {getTranslation('edit', lang)}
              </button>
              <button
                onClick={() => handleDeleteWorkout(workout.id)}
                className="btn-secondary"
              >
                {getTranslation('delete', lang)}
              </button>
            </div>
          </div>
        ))}
      </div>

      {workouts.length === 0 && (
        <div className="empty-state">
          <p>No workouts yet. Create your first workout!</p>
        </div>
      )}
    </div>
  )
}

export default Workouts

