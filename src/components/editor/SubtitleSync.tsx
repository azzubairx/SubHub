import React, { useState } from 'react';
import { Clock, Save } from 'lucide-react';

interface Props {
  onSync: (shiftMs: number) => void;
}

export const SubtitleSync = ({ onSync }: Props) => {
  const [shift, setShift] = useState(0);

  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-indigo-500" />
        <h4 className="font-bold text-slate-800 dark:text-white">مزامنة سريعة</h4>
      </div>
      <p className="text-xs text-slate-500 mb-4">أدخل القيمة بالملي ثانية. (مثال: 1000 = تقديم ثانية، -1000 = تأخير ثانية).</p>
      
      <div className="flex gap-2">
        <input 
          type="number" 
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-white"
          dir="ltr"
        />
        <button 
          onClick={() => onSync(shift)}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" /> تطبيق
        </button>
      </div>
    </div>
  );
};
