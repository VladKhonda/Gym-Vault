# GymVault

A comprehensive fitness & bodybuilding knowledge vault with workout builder, journal, and progress tracking.

## Features

- **Knowledge Base**: Exercise library with detailed information (technique, mistakes, muscle groups)
- **Workout Builder**: Create custom workout plans with sets, reps, and rest periods
- **Workout Execution**: Track workouts in real-time with set-by-set logging
- **Journal**: Log workouts with notes on fatigue, pain, sleep, and mood
- **Progress Tracking**: Visualize physical measurements with radar charts (6 measurements)
- **AI Trainer**: Generate workout plans using AI prompts (no API integration required)
- **Multi-language**: English and Ukrainian support
- **Themes**: Colorful, Light, and Dark themes
- **Units**: Support for cm and inches with automatic conversion
- **Local Storage**: All data persisted in browser localStorage

## Tech Stack

- Vite
- React
- JavaScript (no TypeScript)
- CSS Modules
- Chart.js (for radar charts)
- React Router

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## First Launch

On first launch, you'll be guided through an onboarding wizard to set up your profile, preferences, and goals.

## Project Structure

```
src/
  components/     # Reusable components
  pages/          # Page components
  utils/          # Utilities (storage, themes, translations, units)
  styles/         # Global styles
```

## Data Persistence

All data is stored in browser localStorage. To reset demo data, go to Settings and click "Reset Demo Data".

## License

MIT

