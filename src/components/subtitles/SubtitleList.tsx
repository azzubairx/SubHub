import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SubtitleCard } from './SubtitleCard';
import { PreviewModal } from '../editor/PreviewModal';
import { ISubtitle } from '../../types';

export const SubtitleList = ({ filter }: { filter: string }) => {
  const results = useAppStore(state => state.results);
  const [selectedSub, setSelectedSub] = useState<ISubtitle | null>(null);

  // منطق التصفية البسيط
  const filteredResults = results.filter(sub => {
    if (filter === 'all') return true;
    if (filter === 'srt') return sub.fileType === 'srt';
    if (filter === 'vtt') return sub.fileType === 'vtt';
    if (filter === 'OpenSubtitles') return sub.source === 'OpenSubtitles';
    return true;
  });

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredResults.map(sub => (
          <div key={sub.id} onClick={() => setSelectedSub(sub)}>
            <SubtitleCard subtitle={sub} />
          </div>
        ))}
        {filteredResults.length === 0 && (
          <div className="col-span-full text-center py-10 text-slate-500">
            لا توجد نتائج تطابق هذا الفلتر.
          </div>
        )}
      </div>

      {/* مودال المعاينة وتعديل التوقيت يفتح عند الضغط على الكارت */}
      {selectedSub && (
        <PreviewModal subtitle={selectedSub} onClose={() => setSelectedSub(null)} />
      )}
    </>
  );
};
