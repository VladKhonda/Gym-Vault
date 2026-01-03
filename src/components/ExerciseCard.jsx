import { getStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import './ExerciseCard.css'

const ExerciseCard = ({ exercise, onEdit, onDelete }) => {
  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en' })
  const lang = settings.language || 'en'

  return (
    <div className="exercise-card">
      <div className="exercise-card-header">
        <h3>{exercise.name}</h3>
        <div className="exercise-card-actions">
          <button onClick={onEdit} className="icon-button" title={getTranslation('edit', lang)}>
            ✏️
          </button>
          <button onClick={onDelete} className="icon-button" title={getTranslation('delete', lang)}>
            🗑️
          </button>
        </div>
      </div>
      <div className="exercise-card-body">
        <div className="exercise-tags">
          {exercise.muscleGroups.map((mg, idx) => (
            <span key={idx} className="tag">
              {mg}
            </span>
          ))}
        </div>
        <p className="exercise-equipment">
          <strong>{getTranslation('equipment', lang)}:</strong> {exercise.equipment}
        </p>
        <p className="exercise-description">{exercise.description}</p>
        {exercise.technique && (
          <div className="exercise-section">
            <strong>{getTranslation('technique', lang)}:</strong>
            <p>{exercise.technique}</p>
          </div>
        )}
        {exercise.mistakes && (
          <div className="exercise-section">
            <strong>{getTranslation('mistakes', lang)}:</strong>
            <p>{exercise.mistakes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExerciseCard

