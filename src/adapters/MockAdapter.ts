// src/adapters/MockAdapter.ts (لتجربة الواجهة)
import { SubtitleSourceAdapter } from './BaseAdapter';
import { ISubtitle, SearchParams } from '../types';

export class MockAdapter implements SubtitleSourceAdapter {
  sourceName = 'MockSource';
  isReady = true;

  async search(params: SearchParams): Promise<ISubtitle[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'mock-1',
            title: params.query || 'Inception',
            language: params.language || 'Arabic',
            source: this.sourceName,
            releaseName: 'Inception.2010.1080p.BluRay.x264-SPARKS',
            fileType: 'srt',
            downloads: 15420,
            rating: 4.8,
            subtitleUrl: '#',
            pageUrl: '#',
            year: 2010,
            createdAt: new Date().toISOString(),
          },
          {
            id: 'mock-2',
            title: params.query || 'Inception',
            language: params.language || 'Arabic',
            source: 'Subscene (Mock)',
            releaseName: 'Inception.2010.720p.WEBRip.x264-YTS',
            fileType: 'srt',
            downloads: 8500,
            subtitleUrl: '#',
            pageUrl: '#',
          }
        ]);
      }, 800); // محاكاة تأخير الشبكة
    });
  }
}
