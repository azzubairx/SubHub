import React from 'react';
import { Filter } from 'lucide-react';

interface Props {
  activeFilter: string;
  setActiveFilter: (val: string) => void;
}

export const FilterPanel = ({ activeFilter, setActiveFilter }: Props) => {
  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'srt', label: 'صيغة SRT' },
    { id: 'vtt', label: 'صيغة VTT' },
    { id: 'OpenSubtitles', label: 'OpenSubtitles' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 sticky top-24">
      <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-white font-bold">
        <Filter className="w-5 h-5" />
        <h2>تصفية النتائج</h2>
      </div>
      
      <div className="flex flex-col gap-2">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`text-right px-4 py-2 rounded-lg transition-colors ${
              activeFilter === filter.id 
                ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};
