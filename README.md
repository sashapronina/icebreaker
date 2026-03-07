# Icebreaker

Generate a random icebreaker question for your team. Go beyond small talk.

## Features

- **One-tap generate**: Get a random icebreaker question—no goals or categories to choose
- **Avoid repeats**: Remembers used prompts so you don’t see the same one twice (stored in browser localStorage)
- **Simple UI**: One question at a time, with Regenerate and Reset
- **Responsive**: Works on desktop and mobile
- **About**: Link to donate to Polar Bears International

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser to `http://localhost:3000` (or the port shown in the terminal, e.g. 8082 if you set `PORT=8082`)

## Building for Production

```bash
npm run build
```

The built files are in the `build/` folder, ready to deploy (e.g. GitHub Pages).

## Tech

- React 18
- Create React App
- Tailwind CSS
- Local JSON data (60 prompts)
