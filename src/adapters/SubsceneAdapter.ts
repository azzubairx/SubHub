import { SubtitleSourceAdapter } from './BaseAdapter';
import { ISubtitle, SearchParams } from '../types';

export class SubsceneAdapter implements SubtitleSourceAdapter {
  sourceName = 'Subscene';
  isReady = false; // يمنع Scraping المباشر من المتصفح (يحتاج Backend Proxy)

  async search(params: SearchParams): Promise<ISubtitle[]> {
    // TODO: Call your custom backend proxy that scrapes Subscene
    console.warn('Subscene Adapter requires a backend proxy due to CORS.');
    return [];
  }
}
