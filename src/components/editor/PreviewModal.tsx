import React, { useState } from 'react';
import { X, Clock, Download } from 'lucide-react';
import { ISubtitle } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
// import { shiftSubtitleTime } from '../../utils/subtitleEditor'; // الدالة التي بنيناها سابقاً

interface Props {
  subtitle: ISubtitle;
  onClose: () => void;
}

export const PreviewModal = ({ subtitle, onClose }: Props) => {
  const [timeShift, setTimeShift] = useState(0);

  // دالة محاكاة لتنزيل الترجمة
  const handleDownload = () => {
    alert(`جاري تنزيل ${subtitle.title} مع تأخير قدره ${timeShift} ملي ثانية`);
    // هنا يتم تطبيق دالة shiftSubtitleTime على محتوى الملف ثم تحميله كـ Blob
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">معاينة الترجمة</h2>
              <p className="text-sm text-slate-500 dir-ltr">{subtitle.releaseName}</p>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition">
              <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {/* Preview Content (Mock) */}
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 min-h-[200px] max-h-[300px] overflow-y-auto text-center flex flex-col gap-4 text-slate-700 dark:text-slate-300 font-mono text-sm" dir="ltr">
            <p>1<br/>00:00:01,000 --&gt; 00:00:04,000<br/>مرحباً بك في أداة SubNirvana</p>
            <p>2<br/>00:00:05,000 --&gt; 00:00:08,000<br/>هذه معاينة وهمية للنص قبل التحميل.</p>
          </div>

          {/* Sync Tool & Footer */}
          <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Clock className="w-5 h-5 text-indigo-500" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-bold mb-1">مزامنة التوقيت (ملي ثانية)</span>
                <input 
                  type="number" 
                  value={timeShift}
                  onChange={(e) => setTimeShift(Number(e.target.value))}
                  className="w-24 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 outline-none text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            <button 
              onClick={handleDownload}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30"
            >
              <Download className="w-5 h-5" /> تنزيل الآن
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
