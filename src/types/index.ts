export interface ISubtitle {
  id: string;
  title: string;
  originalTitle?: string;
  season?: number;
  episode?: number;
  year?: number;
  language: string;
  source: string; // e.g., 'OpenSubtitles', 'Subscene'
  releaseName: string;
  fileType: 'srt' | 'vtt' | 'ass' | 'zip';
  downloads: number;
  rating?: number;
  matchScore?: number;
  subtitleUrl: string;
  pageUrl: string;
  uploader?: string;
  createdAt?: string;
  previewText?: string;
}

export interface SearchParams {
  query: string;
  imdbId?: string;
  season?: number;
  episode?: number;
  language?: string;
  fileName?: string;
}
