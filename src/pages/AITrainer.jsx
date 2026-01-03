import { useState, useEffect } from 'react'
import { getStorage, setStorage, STORAGE_KEYS } from '../utils/storage'
import { getTranslation } from '../utils/translations'
import './AITrainer.css'

const AITrainer = () => {
  const [prompt, setPrompt] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [parsedWorkouts, setParsedWorkouts] = useState([])
  const [error, setError] = useState('')
  const settings = getStorage(STORAGE_KEYS.SETTINGS, { language: 'en' })
  const lang = settings.language || 'en'

  useEffect(() => {
    generatePrompt()
  }, [])

  const generatePrompt = () => {
    const profile = getStorage(STORAGE_KEYS.PROFILE, {})
    const exercises = getStorage(STORAGE_KEYS.EXERCISES, [])
    
    const promptText = `You are an expert fitness trainer. Create a personalized workout plan for the following user:

USER PROFILE:
- Name: ${profile.name || 'User'}
- Age: ${profile.age || 'N/A'}
- Gender: ${profile.gender || 'N/A'}
- Height: ${profile.height || 'N/A'} cm
- Weight: ${profile.weight || 'N/A'} kg
- Goal: ${profile.goal || 'N/A'}

AVAILABLE EXERCISES:
${exercises.map((ex) => `- ${ex.name} (${ex.muscleGroups.join(', ')})`).join('\n')}

Please create a workout plan in JSON format following this exact schema:

{
  "workouts": [
    {
      "name": "Workout Name",
      "exercises": [
        {
          "exerciseName": "Exercise Name",
          "sets": 3,
          "reps": 10,
          "rest": 60,
          "notes": "Optional notes"
        }
      ]
    }
  ]
}

Return ONLY valid JSON, no additional text.`

    setPrompt(promptText)
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt)
    alert('Prompt copied to clipboard!')
  }

  const handleParseResponse = () => {
    try {
      setError('')
      // Try to extract JSON from response (in case AI adds extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      
      const parsed = JSON.parse(jsonMatch[0])
      
      if (!parsed.workouts || !Array.isArray(parsed.workouts)) {
        throw new Error('Invalid JSON structure: missing workouts array')
      }

      setParsedWorkouts(parsed.workouts)
    } catch (err) {
      setError(`Error parsing JSON: ${err.message}`)
      setParsedWorkouts([])
    }
  }

  const handleSaveWorkouts = () => {
    const exercises = getStorage(STORAGE_KEYS.EXERCISES, [])
    const existingWorkouts = getStorage(STORAGE_KEYS.WORKOUTS, [])

    const newWorkouts = parsedWorkouts.map((workout) => {
      const workoutExercises = workout.exercises.map((ex) => {
        // Find matching exercise by name
        const exercise = exercises.find((e) => 
          e.name.toLowerCase() === ex.exerciseName.toLowerCase()
        )
        
        return {
          exerciseId: exercise?.id || Date.now().toString(),
          exerciseName: ex.exerciseName,
          sets: ex.sets || 3,
          reps: ex.reps || 10,
          rest: ex.rest || 60,
          weight: 0,
          notes: ex.notes || '',
        }
      })

      return {
        id: Date.now().toString() + Math.random(),
        name: workout.name,
        exercises: workoutExercises,
      }
    })

    const updated = [...existingWorkouts, ...newWorkouts]
    setStorage(STORAGE_KEYS.WORKOUTS, updated)
    alert(`Saved ${newWorkouts.length} workout(s)!`)
    setParsedWorkouts([])
    setAiResponse('')
  }

  const exampleResponse = {
    workouts: [
      {
        name: 'Upper Body Strength',
        exercises: [
          {
            exerciseName: 'Bench Press',
            sets: 4,
            reps: 8,
            rest: 90,
            notes: 'Focus on controlled movement',
          },
          {
            exerciseName: 'Squat',
            sets: 3,
            reps: 10,
            rest: 60,
          },
        ],
      },
    ],
  }

  return (
    <div className="ai-trainer">
      <h1>{getTranslation('aiTrainer', lang)}</h1>

      <div className="ai-trainer-section">
        <h2>Step 1: Generate AI Prompt</h2>
        <p className="section-description">
          This prompt contains your profile and available exercises. Copy it and paste into your
          preferred AI assistant (ChatGPT, Claude, etc.).
        </p>
        <div className="prompt-container">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="prompt-textarea"
            rows="15"
          />
          <button onClick={handleCopyPrompt} className="btn-primary">
            Copy Prompt
          </button>
        </div>
      </div>

      <div className="ai-trainer-section">
        <h2>Step 2: Paste AI Response</h2>
        <p className="section-description">
          Paste the JSON response from your AI assistant here. The app will parse it and create
          workout plans automatically.
        </p>
        <div className="response-container">
          <textarea
            value={aiResponse}
            onChange={(e) => setAiResponse(e.target.value)}
            placeholder="Paste AI response here..."
            className="response-textarea"
            rows="10"
          />
          <button onClick={handleParseResponse} className="btn-primary">
            Parse Response
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>

      {parsedWorkouts.length > 0 && (
        <div className="ai-trainer-section">
          <h2>Step 3: Review & Save Workouts</h2>
          <p className="section-description">
            Review the parsed workouts below. Click "Save All Workouts" to add them to your
            workout library.
          </p>
          <div className="parsed-workouts">
            {parsedWorkouts.map((workout, idx) => (
              <div key={idx} className="parsed-workout">
                <h3>{workout.name}</h3>
                <ul>
                  {workout.exercises.map((ex, exIdx) => (
                    <li key={exIdx}>
                      {ex.exerciseName} - {ex.sets} sets × {ex.reps} reps (rest: {ex.rest}s)
                      {ex.notes && <span className="exercise-note"> - {ex.notes}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={handleSaveWorkouts} className="btn-primary large">
            Save All Workouts
          </button>
        </div>
      )}

      <div className="ai-trainer-section">
        <h2>Example JSON Schema</h2>
        <p className="section-description">
          Here's an example of the expected JSON format:
        </p>
        <pre className="json-example">
          {JSON.stringify(exampleResponse, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default AITrainer

