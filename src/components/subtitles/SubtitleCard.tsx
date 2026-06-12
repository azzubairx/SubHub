import React from 'react';
import { Download, Heart, FileText, CheckCircle } from 'lucide-react';
import { ISubtitle } from '../../types';
import { motion } from 'framer-motion';

export const SubtitleCard = ({ subtitle }: { subtitle: ISubtitle }) => {
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
          <FileText className="w-3 h-3" /> {subtitle.fileType.toUpperCase()}
        </span>
        <span className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-600 dark:text-slate-300">
          {subtitle.language}
        </span>
        {subtitle.downloads > 0 && (
          <span className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-600 dark:text-slate-300">
            <Download className="w-3 h-3" /> {subtitle.downloads}
          </span>
        )}
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700 mt-2">
        <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
          <Download className="w-4 h-4" /> تنزيل
        </button>
        <button className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-500">
          <Heart className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
