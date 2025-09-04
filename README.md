# Vocab Master - Vocabulary Learning PWA

A modern, production-ready Progressive Web App for learning vocabulary with interactive games and spaced repetition techniques.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)
- 🎮 Interactive vocabulary games
- 📚 Choose correct meaning game
- 🔤 Choose correct word game
- 💾 Local storage for learning progress
- 📱 Progressive Web App (PWA) support
- 🎯 Spaced repetition learning
- 📊 Learning statistics tracking

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## Game Modes

### Choose Correct Meaning Game

Players are shown a word and must select the correct meaning from multiple choice options. This helps reinforce vocabulary comprehension.

### Choose Correct Word Game

Players are shown a meaning and must select the correct word from multiple choice options. This helps improve word recognition and recall.

## Learning Features

- **Spaced Repetition**: Words are prioritized based on learning progress
- **Progress Tracking**: Local storage tracks learned words and correct answer counts
- **Adaptive Difficulty**: Games focus on unlearned words first
- **Visual Feedback**: Immediate feedback on correct/incorrect answers
- **Statistics**: Track learning progress and performance

---

Built with ❤️ using React Router.
# test-deploy-react-router
