// src/adapters/BaseAdapter.ts
import { ISubtitle, SearchParams } from '../types';

export interface SubtitleSourceAdapter {
  sourceName: string;
  isReady: boolean; // هل يحتاج لإعدادات خارجية أو جاهز للعمل
  search(params: SearchParams): Promise<ISubtitle[]>;
  getDownloadUrl?(id: string): Promise<string>; // لبعض المصادر التي تخفي الرابط المباشر
}
