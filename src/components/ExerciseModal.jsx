import { useState, useEffect } from 'react'
import { getStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import './ExerciseModal.css'

const ExerciseModal = ({ exercise, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    muscleGroups: [],
    equipment: '',
    description: '',
    technique: '',
    mistakes: '',
    videoLink: '',
  })
  const [muscleGroupInput, setMuscleGroupInput] = useState('')
  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en' })
  const lang = settings.language || 'en'

  useEffect(() => {
    if (exercise) {
      setFormData({
        name: exercise.name || '',
        muscleGroups: exercise.muscleGroups || [],
        equipment: exercise.equipment || '',
        description: exercise.description || '',
        technique: exercise.technique || '',
        mistakes: exercise.mistakes || '',
        videoLink: exercise.videoLink || '',
      })
    }
  }, [exercise])

  const handleAddMuscleGroup = () => {
    if (muscleGroupInput.trim()) {
      setFormData({
        ...formData,
        muscleGroups: [...formData.muscleGroups, muscleGroupInput.trim()],
      })
      setMuscleGroupInput('')
    }
  }

  const handleRemoveMuscleGroup = (index) => {
    setFormData({
      ...formData,
      muscleGroups: formData.muscleGroups.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {exercise
              ? getTranslation('editExercise', lang)
              : getTranslation('addExercise', lang)}
          </h2>
          <button onClick={onClose} className="modal-close">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>{getTranslation('exerciseName', lang)}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>{getTranslation('muscleGroups', lang)}</label>
            <div className="tag-input-group">
              <input
                type="text"
                value={muscleGroupInput}
                onChange={(e) => setMuscleGroupInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddMuscleGroup()
                  }
                }}
                placeholder="Add muscle group"
              />
              <button type="button" onClick={handleAddMuscleGroup} className="btn-small">
                {getTranslation('add', lang)}
              </button>
            </div>
            <div className="tags-display">
              {formData.muscleGroups.map((mg, idx) => (
                <span key={idx} className="tag">
                  {mg}
                  <button
                    type="button"
                    onClick={() => handleRemoveMuscleGroup(idx)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>{getTranslation('equipment', lang)}</label>
            <input
              type="text"
              value={formData.equipment}
              onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>{getTranslation('description', lang)}</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>{getTranslation('technique', lang)}</label>
            <textarea
              value={formData.technique}
              onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>{getTranslation('mistakes', lang)}</label>
            <textarea
              value={formData.mistakes}
              onChange={(e) => setFormData({ ...formData, mistakes: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>{getTranslation('videoLink', lang)}</label>
            <input
              type="url"
              value={formData.videoLink}
              onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              {getTranslation('cancel', lang)}
            </button>
            <button type="submit" className="btn-primary">
              {getTranslation('save', lang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExerciseModal

