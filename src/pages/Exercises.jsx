import { useState, useEffect } from 'react'
import { getStorage, setStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import ExerciseCard from '../components/ExerciseCard'
import ExerciseModal from '../components/ExerciseModal'
import './Exercises.css'

const Exercises = () => {
  const [exercises, setExercises] = useState([])
  const [filter, setFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingExercise, setEditingExercise] = useState(null)
  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en' })
  const lang = settings.language || 'en'

  useEffect(() => {
    loadExercises()
  }, [])

  const loadExercises = () => {
    const stored = getStorage(STORAGE_KEYS.EXERCISES, [])
    setExercises(stored)
  }

  const handleAdd = () => {
    setEditingExercise(null)
    setShowModal(true)
  }

  const handleEdit = (exercise) => {
    setEditingExercise(exercise)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm(getTranslation('delete', lang) + '?')) {
      const updated = exercises.filter((e) => e.id !== id)
      setExercises(updated)
      setStorage(STORAGE_KEYS.EXERCISES, updated)
    }
  }

  const handleSave = (exerciseData) => {
    let updated
    if (editingExercise) {
      updated = exercises.map((e) =>
        e.id === editingExercise.id ? { ...exerciseData, id: editingExercise.id } : e
      )
    } else {
      const newExercise = {
        ...exerciseData,
        id: Date.now().toString(),
      }
      updated = [...exercises, newExercise]
    }
    setExercises(updated)
    setStorage(STORAGE_KEYS.EXERCISES, updated)
    setShowModal(false)
    setEditingExercise(null)
  }

  const filteredExercises = exercises.filter((exercise) => {
    if (!filter) return true
    const searchTerm = filter.toLowerCase()
    return (
      exercise.name.toLowerCase().includes(searchTerm) ||
      exercise.muscleGroups.some((mg) => mg.toLowerCase().includes(searchTerm)) ||
      exercise.equipment.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <div className="exercises">
      <div className="exercises-header">
        <h1>{getTranslation('exercises', lang)}</h1>
        <button onClick={handleAdd} className="btn-primary">
          {getTranslation('addExercise', lang)}
        </button>
      </div>

      <div className="exercises-filter">
        <input
          type="text"
          placeholder={getTranslation('filterByTag', lang)}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="exercises-grid">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onEdit={() => handleEdit(exercise)}
            onDelete={() => handleDelete(exercise.id)}
          />
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="empty-state">
          <p>{filter ? 'No exercises found' : 'No exercises yet. Add your first exercise!'}</p>
        </div>
      )}

      {showModal && (
        <ExerciseModal
          exercise={editingExercise}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingExercise(null)
          }}
        />
      )}
    </div>
  )
}

export default Exercises

