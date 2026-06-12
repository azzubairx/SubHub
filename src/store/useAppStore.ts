import { create } from 'zustand';
import { ISubtitle, SearchParams } from '../types';

interface AppState {
  results: ISubtitle[];
  isLoading: boolean;
  searchHistory: SearchParams[];
  favorites: ISubtitle[];
  performSearch: (params: SearchParams) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  results: [],
  isLoading: false,
  searchHistory: [],
  favorites: [],

  performSearch: async (params: SearchParams) => {
    set({ isLoading: true, results: [] });
    
    // محاكاة جلب البيانات الوهمية (Mock) لتجربة الواجهة بأمان
    setTimeout(() => {
      const mockResults: ISubtitle[] = [
        {
          id: '1',
          title: params.query || 'Inception',
          language: 'Arabic',
          source: 'OpenSubtitles',
          releaseName: 'Inception.2010.1080p.BluRay.x264',
          fileType: 'srt',
          downloads: 15420,
          subtitleUrl: '#',
          pageUrl: '#'
        },
        {
          id: '2',
          title: params.query || 'Inception',
          language: 'English',
          source: 'Subscene',
          releaseName: 'Inception.2010.720p.WEBRip.x264',
          fileType: 'vtt',
          downloads: 8500,
          subtitleUrl: '#',
          pageUrl: '#'
        }
      ];

      set({ results: mockResults, isLoading: false });
    }, 1000);
  }
}));