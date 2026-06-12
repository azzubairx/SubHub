import { SubtitleSourceAdapter } from './BaseAdapter';
import { ISubtitle, SearchParams } from '../types';

export class OpenSubtitlesAdapter implements SubtitleSourceAdapter {
  sourceName = 'OpenSubtitles';
  isReady = false; // يحتاج إلى API Key و إعداد لاحقاً

  async search(params: SearchParams): Promise<ISubtitle[]> {
    // TODO: Implement actual OpenSubtitles REST API logic here
    // Example: fetch(`https://api.opensubtitles.com/api/v1/subtitles?query=${params.query}`)
    
    console.warn('OpenSubtitles Adapter is not fully implemented yet.');
    return [];
  }
}
