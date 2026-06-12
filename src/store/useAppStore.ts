import { create } from 'zustand';
import { ISubtitle, SearchParams } from '../types';
import { MockAdapter } from '../adapters/MockAdapter';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { calculateMatchScore } from '../utils/releaseParser';

interface AppState {
  results: ISubtitle[];
  isLoading: boolean;
  searchHistory: SearchParams[];
  favorites: ISubtitle[];
  performSearch: (params: SearchParams) => Promise<void>;
  toggleFavorite: (sub: ISubtitle) => void;
  clearHistory: () => void;
}

// يمكنك لاحقاً إضافة باقي الـ adapters هنا
const activeAdapters = [new MockAdapter()];

export const useAppStore = create<AppState>((set, get) => ({
  results: [],
  isLoading: false,
  searchHistory: getStorageItem<SearchParams[]>('sub_history', []),
  favorites: getStorageItem<ISubtitle[]>('sub_favs', []),

  performSearch: async (params: SearchParams) => {
    set({ isLoading: true, results: [] });

    try {
      // جلب النتائج من جميع المصادر بالتوازي
      const promises = activeAdapters
        .filter(a => a.isReady)
        .map(adapter => adapter.search(params).catch(() => [])); // تجاهل المصدر الذي يفشل

      const resultsArrays = await Promise.all(promises);
      let combinedResults = resultsArrays.flat();

      // حساب درجة التطابق إذا أدخل المستخدم اسم الملف
      if (params.fileName) {
        combinedResults = combinedResults.map(sub => ({
          ...sub,
          matchScore: calculateMatchScore(params.fileName || '', sub.releaseName)
        }));
        // ترتيب النتائج حسب درجة التطابق تنازلياً
        combinedResults = combinedResults.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      }

      set({ results: combinedResults, isLoading: false });

      // حفظ السجل
      const newHistory = [params, ...get().searchHistory].slice(0, 10);
      set({ searchHistory: newHistory });
      setStorageItem('sub_history', newHistory);

    } catch (error) {
      console.error('Search error:', error);
      set({ isLoading: false });
    }
  },

  toggleFavorite: (sub: ISubtitle) => {
    const favs = get().favorites;
    const exists = favs.find(f => f.id === sub.id);
    const newFavs = exists ? favs.filter(f => f.id !== sub.id) : [...favs, sub];
    set({ favorites: newFavs });
    setStorageItem('sub_favs', newFavs);
  },

  clearHistory: () => {
    set({ searchHistory: [] });
    setStorageItem('sub_history', []);
  }
}));
