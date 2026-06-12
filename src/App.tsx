import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSearch } from './components/search/HeroSearch';
import { FilterPanel } from './components/search/FilterPanel';
import { SubtitleList } from './components/subtitles/SubtitleList';
import { Footer } from './components/layout/Footer';
import { useAppStore } from './store/useAppStore';

function App() {
  const { results, isLoading } = useAppStore();
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSearch />
        
        <div className="max-w-7xl mx-auto px-4 py-8 w-full flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 flex-shrink-0 z-10">
            <FilterPanel activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </aside>

          <div className="flex-grow">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : results.length > 0 ? (
              <SubtitleList filter={activeFilter} />
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400">
                  لا توجد نتائج حالياً. ابدأ البحث من الأعلى!
                </h3>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;