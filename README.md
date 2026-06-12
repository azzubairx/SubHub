# SubHub
# SubNirvana 🎬
A modern, fast, and unified web application to search, fetch, and manage subtitles from multiple sources. 

## 🌟 Features
- **Unified Search:** Search across multiple subtitle sources (OpenSubtitles, Subscene*, etc.) from one clean UI.
- **Smart Matching:** Paste your release filename, and SubNirvana will parse it to find the highest matching subtitle score.
- **In-Browser Sync Tool:** Shift subtitle timing (delay/forward) directly in the browser before downloading.
- **Modern UI:** Built with React, TailwindCSS, and Framer Motion for a smooth, premium feel. Dark/Light mode support.
- **Frontend Only & PWA Ready:** Deployable to GitHub pages instantly.

## 🚀 How it Works (Architecture)
SubNirvana uses an **Adapter Pattern**. Every subtitle website has its own quirks. We map them to a single `ISubtitle` model.
If a source requires an API Key or has strict CORS policies (preventing frontend scraping), the adapter acts as a placeholder that can easily be connected to a backend proxy later.

## 🛠️ Tech Stack
- React 18 + TypeScript
- Vite
- Zustand (State Management)
- Tailwind CSS
- Framer Motion

## 💻 Local Development
1. Clone the repo: `git clone https://github.com/yourname/subnirvana.git`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

## 🌐 Deploying to GitHub Pages
Since this is a Vite project:
1. Set the `base` in `vite.config.ts` to `'/subnirvana/'`.
2. Run `npm run build`.
3. Push the `dist` folder to your `gh-pages` branch (or use GitHub Actions).

## 🧩 Adding a New Source
To add a new source, simply create a new adapter in `src/adapters/`:
```typescript
export class MyNewSourceAdapter implements SubtitleSourceAdapter {
  sourceName = 'MyNewSource';
  isReady = true;
  async search(params) {
    // Fetch logic here...
    return mappedResults;
  }
}