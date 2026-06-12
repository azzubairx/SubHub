# SubHub 🎬

A modern, fast, and unified web application to search, fetch, and manage subtitles from multiple sources.

## 🌟 Features

- **Unified Search:** Search across multiple subtitle sources (OpenSubtitles, Subscene, etc.) from one clean UI.
- **Smart Matching:** Paste your release filename, and SubHub will parse it to find the highest matching subtitle score.
- **In-Browser Sync Tool:** Shift subtitle timing (delay/forward) directly in the browser before downloading.
- **Modern UI:** Built with React, TailwindCSS, and Framer Motion for a smooth, premium feel. Dark/Light mode support with persistence.
- **Frontend Only & PWA Ready:** Deployable to GitHub pages instantly.
- **Favorites System:** Save your favorite subtitles for quick access.
- **Search History:** Keep track of your recent searches.

## 🚀 How it Works (Architecture)

SubHub uses an **Adapter Pattern**. Every subtitle website has its own quirks. We map them to a single `ISubtitle` model.
If a source requires an API Key or has strict CORS policies (preventing frontend scraping), the adapter acts as a placeholder that can easily be connected to a backend proxy later.

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite
- Zustand (State Management)
- Tailwind CSS
- Framer Motion
- Lucide React (Icons)

## 💻 Local Development

1. Clone the repo: `git clone https://github.com/azzubairx/SubHub.git`
2. Install dependencies: `npm install` or `pnpm install`
3. Run dev server: `npm run dev`
4. Open http://localhost:5173 in your browser

## 🏗️ Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## 🌐 Deploying to GitHub Pages

Since this is a Vite project:

1. Set the `base` in `vite.config.ts` to `'/SubHub/'`.
2. Run `npm run build`.
3. Push the `dist` folder to your `gh-pages` branch (or use GitHub Actions).

## 🧩 Adding a New Source

To add a new source, simply create a new adapter in `src/adapters/`:

```typescript
import { SubtitleSourceAdapter } from './BaseAdapter';
import { ISubtitle, SearchParams } from '../types';

export class MyNewSourceAdapter implements SubtitleSourceAdapter {
  sourceName = 'MyNewSource';
  isReady = true; // Set to false if it needs backend setup
  
  async search(params: SearchParams): Promise<ISubtitle[]> {
    // Fetch logic here...
    return mappedResults;
  }
}
```

Then add it to the `activeAdapters` array in `src/store/useAppStore.ts`.

## 📝 Features Breakdown

### Search Functionality
- Query-based search with optional filename matching
- Parallel search across all active adapters
- Automatic scoring based on release name matching
- Results sorted by match score when filename is provided

### Subtitle Management
- Download subtitles with optional time synchronization
- Add/remove favorites
- View search history
- Preview subtitles before downloading

### Theme Support
- Dark/Light mode toggle
- Persistent theme preference
- System preference detection as fallback

## 🐛 Bug Fixes & Improvements

### Recent Fixes
- ✅ Fixed duplicate code in adapter modules
- ✅ Removed unused imports (TypeScript strict mode compliance)
- ✅ Implemented functional download buttons
- ✅ Added favorite system with visual feedback
- ✅ Implemented dark mode persistence
- ✅ Fixed localStorage usage with proper error handling
- ✅ Completed subtitle sync functionality
- ✅ Added match score display in results
- ✅ Improved form validation and error handling

## 📦 Project Structure

```
src/
├── adapters/           # Subtitle source adapters
├── components/         # React components
│   ├── editor/        # Subtitle editing components
│   ├── layout/        # Layout components
│   ├── search/        # Search components
│   └── subtitles/     # Subtitle display components
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── App.tsx            # Main app component
├── index.css          # Global styles
└── main.tsx           # App entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev/)
- Animation library by [Framer Motion](https://www.framer.com/motion/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)
