
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
        <p className="flex items-center gap-1">
          تم برمجته بحب <Heart className="w-4 h-4 text-red-500 fill-current" /> من أجل مجتمع المترجمين
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-indigo-500 transition-colors">سياسة الخصوصية</a>
          <a href="#" className="hover:text-indigo-500 transition-colors">شروط الاستخدام</a>
          <a href="#" className="hover:text-indigo-500 transition-colors">تواصل معنا</a>
        </div>
      </div>
    </footer>
  );
};
