# Icebreaker Picker

A simple team icebreaker activity picker that helps teams choose the right activity based on their goals.

## Features

- **Goal Selection**: Choose from "Feel Closer", "Warm Up", or "Align" goals
- **Smart Activity Generation**: Randomly selects activities based on your chosen goal
- **Activity Tracking**: Remembers used activities to avoid repeats (stored in browser localStorage)
- **Rich Activity Details**: Shows duration, people count, energy level, difficulty, and detailed instructions
- **Responsive Design**: Works on desktop and mobile devices

## Database

The app includes 10 sample activities:
- 4 "Feel Closer" activities
- 4 "Warm Up" activities  
- 2 "Align" activities

Each activity includes:
- Goal category
- Type (around_room, activity, discussion)
- Duration (5-25 minutes)
- People count range
- Energy level (low, medium, high)
- Difficulty (easy, medium, hard)
- Comfort level
- Description and detailed instructions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser to `http://localhost:3000`

## Building for Production

```bash
npm run build
```

## Technology Stack

- React 18
- Create React App (build tool)
- Tailwind CSS (via CDN)
- Local JSON database
- Browser localStorage (activity tracking)

## Future Enhancements

- Easy migration to SQLite or Supabase
- More activity categories
- User preferences
- Activity rating system
- Export/import functionality
