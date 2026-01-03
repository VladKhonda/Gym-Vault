import { useState, useEffect } from 'react'
import { getStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import './Journal.css'

const Journal = () => {
  const [entries, setEntries] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    workoutName: '',
    notes: '',
    fatigue: '',
    pain: '',
    sleep: '',
    mood: '',
  })
  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en' })
  const lang = settings.language || 'en'

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = () => {
    const stored = getStorage(STORAGE_KEYS.JOURNAL, [])
    // Sort by date, newest first
    const sorted = stored.sort((a, b) => new Date(b.date) - new Date(a.date))
    setEntries(sorted)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEntry = {
      ...formData,
      id: Date.now().toString(),
      date: new Date(formData.date).toISOString(),
    }
    const updated = [newEntry, ...entries]
    setEntries(updated)
    setStorage(STORAGE_KEYS.JOURNAL, updated)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      workoutName: '',
      notes: '',
      fatigue: '',
      pain: '',
      sleep: '',
      mood: '',
    })
    setShowAddForm(false)
  }

  const handleDelete = (id) => {
    if (window.confirm(getTranslation('delete', lang) + '?')) {
      const updated = entries.filter((e) => e.id !== id)
      setEntries(updated)
      setStorage(STORAGE_KEYS.JOURNAL, updated)
    }
  }

  return (
    <div className="journal">
      <div className="journal-header">
        <h1>{getTranslation('journal', lang)}</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary">
          {getTranslation('logWorkout', lang)}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="journal-form">
          <div className="form-group">
            <label>{getTranslation('date', lang)}</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>{getTranslation('workouts', lang)}</label>
            <input
              type="text"
              value={formData.workoutName}
              onChange={(e) => setFormData({ ...formData, workoutName: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>{getTranslation('notes', lang)}</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="4"
              className="form-input"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{getTranslation('fatigue', lang)}</label>
              <input
                type="text"
                value={formData.fatigue}
                onChange={(e) => setFormData({ ...formData, fatigue: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>{getTranslation('pain', lang)}</label>
              <input
                type="text"
                value={formData.pain}
                onChange={(e) => setFormData({ ...formData, pain: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>{getTranslation('sleep', lang)}</label>
              <input
                type="text"
                value={formData.sleep}
                onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>{getTranslation('mood', lang)}</label>
              <input
                type="text"
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">
              {getTranslation('cancel', lang)}
            </button>
            <button type="submit" className="btn-primary">
              {getTranslation('save', lang)}
            </button>
          </div>
        </form>
      )}

      <div className="journal-entries">
        {entries.map((entry) => (
          <div key={entry.id} className="journal-entry">
            <div className="entry-header">
              <h3>{new Date(entry.date).toLocaleDateString()}</h3>
              {entry.workoutName && <p className="entry-workout">{entry.workoutName}</p>}
              <button onClick={() => handleDelete(entry.id)} className="btn-remove">
                ×
              </button>
            </div>
            {entry.notes && <p className="entry-notes">{entry.notes}</p>}
            <div className="entry-meta">
              {entry.fatigue && (
                <span>
                  <strong>{getTranslation('fatigue', lang)}:</strong> {entry.fatigue}
                </span>
              )}
              {entry.pain && (
                <span>
                  <strong>{getTranslation('pain', lang)}:</strong> {entry.pain}
                </span>
              )}
              {entry.sleep && (
                <span>
                  <strong>{getTranslation('sleep', lang)}:</strong> {entry.sleep}
                </span>
              )}
              {entry.mood && (
                <span>
                  <strong>{getTranslation('mood', lang)}:</strong> {entry.mood}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="empty-state">
          <p>No journal entries yet. Log your first workout!</p>
        </div>
      )}
    </div>
  )
}

export default Journal

