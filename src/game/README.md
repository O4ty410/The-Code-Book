# Launch Sequence — Game Module

A lightweight browser-based educational sci-fi game, isolated from the main Code Book platform.

## Structure

```
src/game/
├── components/        # Reusable UI (HUD, Button, Modal)
├── scenes/            # Full-screen game views (MainMenu, BriefingRoom, LaunchPad)
├── systems/           # Pure logic modules (progression, audio)
├── lessons/           # Educational content — one file per lesson
├── assets/
│   ├── images/        # Sprites, backgrounds, icons
│   ├── audio/         # Sound effects and music
│   └── fonts/         # Custom typefaces
├── hooks/             # Custom React hooks (usePlayerData, useScene)
├── Game.jsx           # Root component — owns scene routing and player state
├── index.jsx          # Entry point — mounts Game into #launch-sequence-root
└── package.json       # Standalone React + Vite setup
```

## Getting started

```bash
cd src/game
npm install
npm run dev
```

## Adding a new lesson

1. Create `lessons/lesson_XX_your_topic.js` following the existing lesson schema.
2. Import and add it to the `LESSONS` array in `lessons/index.js`.

## Adding a new scene

1. Create `scenes/YourScene.jsx`.
2. Export it from `scenes/index.js`.
3. Add a new scene key in `Game.jsx` and wire up navigation.
