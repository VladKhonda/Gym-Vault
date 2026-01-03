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
- React Context API (for state management)

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

## Onboarding

On first launch, you'll be guided through a 6-step onboarding wizard:

1. **Welcome Screen**: Choose your language and access demo mode
2. **Name & Units**: Enter your name and select measurement units (cm/kg or inches/lbs)
3. **Profile**: Enter your height, weight, age, and gender
4. **Fitness Goals**: Select your primary fitness goal (muscle gain, fat loss, strength, etc.)
5. **AI Trainer**: Choose your trainer type (AI Trainer available, Human Trainer coming soon)
6. **Theme**: Select your preferred theme (Colorful, Light, or Dark)

### Demo Mode

During onboarding, you can click "Demo Mode" on the welcome screen to automatically populate the app with sample exercises and data. This is useful for exploring the app's features without manual data entry.

## Project Structure

```
src/
  components/     # Reusable components
    OnboardingStep1-6.jsx  # Individual onboarding steps
  pages/          # Page components
  contexts/       # React Context providers
  utils/          # Utilities (storage, themes, translations, units)
  styles/         # Global styles and CSS Modules
```

## Data Persistence

All data is stored in browser localStorage. To reset demo data, go to Settings and click "Reset Demo Data".

## Development Notes

- The app uses React Context API for managing profile, settings, language, and units
- Onboarding is accessible via `/onboarding` route
- Common styles (buttons, inputs, etc.) are defined in `styles/index.css`
- Component-specific styles use CSS Modules (`.module.css`)
- Demo data is only initialized when "Demo Mode" is selected during onboarding

## License

MIT
