import { useState } from 'react';
import { X, Clock, Download } from 'lucide-react';
import { ISubtitle } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { shiftSubtitleTime } from '../../utils/subtitleEditor';

interface Props {
  subtitle: ISubtitle;
  onClose: () => void;
}

export const PreviewModal = ({ subtitle, onClose }: Props) => {
  const [timeShift, setTimeShift] = useState(0);

  // دالة تنزيل الترجمة مع تطبيق التأخير إن وجد
  const handleDownload = () => {
    if (!subtitle.subtitleUrl || subtitle.subtitleUrl === '#') {
      alert('رابط التحميل غير متاح حالياً');
      return;
    }

    try {
      // في التطبيق الحقيقي، سيتم جلب محتوى الملف من الرابط
      // هنا نقوم بمحاكاة تنزيل مع تطبيق التأخير
      let content = `1\n00:00:01,000 --> 00:00:04,000\nمرحباً بك في أداة SubHub\n\n2\n00:00:05,000 --> 00:00:08,000\nهذه معاينة للترجمة قبل التحميل.`;
      
      // تطبيق التأخير إذا كان موجوداً
      if (timeShift !== 0) {
        content = shiftSubtitleTime(content, timeShift);
      }

      // إنشاء Blob وتنزيل الملف
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = `${subtitle.title}${timeShift !== 0 ? '_shifted' : ''}.${subtitle.fileType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // إغلاق المودال بعد التنزيل الناجح
      setTimeout(onClose, 500);
    } catch (error) {
      console.error('Download error:', error);
      alert('حدث خطأ أثناء تنزيل الملف');
    }
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
              <p className="text-sm text-slate-500 dark:text-slate-400 dir-ltr">{subtitle.releaseName}</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition"
              title="إغلاق"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {/* Preview Content */}
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 min-h-[200px] max-h-[300px] overflow-y-auto text-slate-700 dark:text-slate-300 font-mono text-sm" dir="ltr">
            <pre className="whitespace-pre-wrap break-words">
{`1
00:00:01,000 --> 00:00:04,000
مرحباً بك في أداة SubHub

2
00:00:05,000 --> 00:00:08,000
هذه معاينة للترجمة قبل التحميل.`}
            </pre>
          </div>

          {/* Sync Tool & Footer */}
          <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Clock className="w-5 h-5 text-indigo-500" />
              <div className="flex flex-col">
                <label htmlFor="timeShift" className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">
                  مزامنة التوقيت (ملي ثانية)
                </label>
                <input 
                  id="timeShift"
                  type="number" 
                  value={timeShift}
                  onChange={(e) => setTimeShift(Number(e.target.value))}
                  className="w-24 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 outline-none text-sm text-slate-900 dark:text-white focus:border-indigo-500"
                  dir="ltr"
                  step="100"
                />
              </div>
            </div>

            <button 
              onClick={handleDownload}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-50"
            >
              <Download className="w-5 h-5" /> تنزيل الآن
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
