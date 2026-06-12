import React, { useState } from 'react';
import { Search, Settings2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { motion } from 'framer-motion';

export const HeroSearch = () => {
  const [query, setQuery] = useState('');
  const [fileName, setFileName] = useState('');
  const performSearch = useAppStore(state => state.performSearch);
  const isLoading = useAppStore(state => state.isLoading);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    performSearch({ query: query.trim(), language: 'Arabic', fileName: fileName.trim() || undefined });
  };

  return (
    <div className="w-full relative py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background blur effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 w-full max-w-4xl text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Sub<span className="text-indigo-400">Hub</span>
        </h1>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          محرك بحث شامل للترجمات. يبحث في مصادر متعددة ليعطيك أفضل تطابق لفيلمك أو مسلسلك.
        </p>

        <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto flex flex-col gap-4">
          <div className="relative flex items-center w-full h-16 rounded-2xl focus-within:shadow-lg focus-within:shadow-indigo-500/20 bg-slate-800/80 backdrop-blur-md border border-slate-700 overflow-hidden transition-all">
            <Search className="absolute left-4 text-slate-400 w-6 h-6" />
            <input 
              type="text"
              placeholder="ابحث باسم الفيلم أو المسلسل..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none pl-14 pr-4 text-lg text-white placeholder-slate-400"
              dir="auto"
            />
            <button 
              type="submit" 
              disabled={isLoading || !query.trim()}
              className="absolute right-2 h-12 px-6 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'جاري البحث...' : 'ابحث'}
            </button>
          </div>
          
          {/* Optional: Filename matching input */}
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="اسم الملف للبحث عن تطابق دقيق (اختياري)..."
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              dir="ltr"
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};
