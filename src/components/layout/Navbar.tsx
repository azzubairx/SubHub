import React, { useEffect, useState } from 'react';
import { Moon, Sun, Github, Subtitles } from 'lucide-react';

export const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  // Toggle Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Subtitles className="w-8 h-8" />
          <span className="font-bold text-xl tracking-wide text-slate-900 dark:text-white">
            SubNirvana
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/yourusername/subnirvana" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};
