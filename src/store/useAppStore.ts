import { create } from 'zustand';
import { ISubtitle, SearchParams } from '../types';
import { MockAdapter } from '../adapters/MockAdapter';

interface AppState {
  results: ISubtitle[];
  isLoading: boolean;
  searchHistory: SearchParams[];
  favorites: ISubtitle[];
  performSearch: (params: SearchParams) => Promise<void>;
  toggleFavorite: (sub: ISubtitle) => void;
}

// يمكنك لاحقاً إضافة باقي الـ adapters هنا
const activeAdapters = [new MockAdapter()]; 

export const useAppStore = create<AppState>((set, get) => ({
  results: [],
  isLoading: false,
  searchHistory: JSON.parse(localStorage.getItem('sub_history') || '[]'),
  favorites: JSON.parse(localStorage.getItem('sub_favs') || '[]'),

  performSearch: async (params: SearchParams) => {
    set({ isLoading: true, results: [] });
    
    try {
      // جلب النتائج من جميع المصادر بالتوازي
      const promises = activeAdapters
        .filter(a => a.isReady)
        .map(adapter => adapter.search(params).catch(() => [])); // تجاهل المصدر الذي يفشل
      
      const resultsArrays = await Promise.all(promises);
      const combinedResults = resultsArrays.flat();
      
      // هنا نقوم بحساب التطابق إذا أدخل المستخدم اسم الملف
      if (params.fileName) {
         // Logic inside calculateMatchScore...
      }

      set({ results: combinedResults, isLoading: false });
      
      // حفظ السجل
      const newHistory = [params, ...get().searchHistory].slice(0, 10);
      set({ searchHistory: newHistory });
      localStorage.setItem('sub_history', JSON.stringify(newHistory));

    } catch (error) {
      set({ isLoading: false });
    }
  },

  toggleFavorite: (sub: ISubtitle) => {
    const favs = get().favorites;
    const exists = favs.find(f => f.id === sub.id);
    const newFavs = exists ? favs.filter(f => f.id !== sub.id) : [...favs, sub];
    set({ favorites: newFavs });
    localStorage.setItem('sub_favs', JSON.stringify(newFavs));
  }
}));
