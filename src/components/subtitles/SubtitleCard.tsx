import React from 'react';
import { Download, Heart } from 'lucide-react';
import { ISubtitle } from '../../types';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

export const SubtitleCard = ({ subtitle }: { subtitle: ISubtitle }) => {
  const { favorites, toggleFavorite } = useAppStore();
  const isFavorite = favorites.some(f => f.id === subtitle.id);

  const handleDownload = () => {
    if (subtitle.subtitleUrl && subtitle.subtitleUrl !== '#') {
      const link = document.createElement('a');
      link.href = subtitle.subtitleUrl;
      link.download = `${subtitle.title}.${subtitle.fileType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('رابط التحميل غير متاح حالياً');
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(subtitle);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 transition-all flex flex-col gap-4"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
            {subtitle.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-1 line-clamp-2" dir="ltr">
            {subtitle.releaseName}
          </p>
        </div>
        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full">
          {subtitle.source}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        <span className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-600 dark:text-slate-300">
          {subtitle.fileType.toUpperCase()}
        </span>
        <span className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-600 dark:text-slate-300">
          {subtitle.language}
        </span>
        {subtitle.downloads > 0 && (
          <span className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-600 dark:text-slate-300">
            <Download className="w-3 h-3" /> {subtitle.downloads}
          </span>
        )}
        {subtitle.matchScore !== undefined && (
          <span className="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-500/20 px-2 py-1 rounded-md text-green-700 dark:text-green-300 font-semibold">
            تطابق: {subtitle.matchScore}%
          </span>
        )}
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700 mt-2">
        <button 
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" /> تنزيل
        </button>
        <button 
          onClick={handleToggleFavorite}
          className={`p-2 border rounded-lg transition-colors ${
            isFavorite 
              ? 'bg-red-50 dark:bg-red-500/20 border-red-300 dark:border-red-600' 
              : 'border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
        </button>
      </div>
    </motion.div>
  );
};
