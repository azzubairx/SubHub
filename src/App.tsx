import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSearch } from './components/search/HeroSearch';
import { FilterPanel } from './components/search/FilterPanel';
import { SubtitleList } from './components/subtitles/SubtitleList';
import { useAppStore } from './store/useAppStore';

function App() {
  const { results, isLoading } = useAppStore();
  
  // Local state for basic filtering
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSearch />
        
        {/* Content Section - Only shows clearly if there are results or loading */}
        <div className="max-w-7xl mx-auto px-4 py-8 w-full flex flex-col md:flex-row gap-6">
          
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <FilterPanel activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </aside>

          {/* Main Results Area */}
          <div className="flex-grow">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : results.length > 0 ? (
              <SubtitleList filter={activeFilter} />
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400">
                  لا توجد نتائج حالياً. ابدأ البحث من الأعلى!
                </h3>
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;
