// دالة مبسطة لتقديم أو تأخير الترجمة
export const shiftSubtitleTime = (srtContent: string, shiftMs: number): string => {
  // Regex للبحث عن الطوابع الزمنية 00:00:00,000
  const timeRegex = /(\d{2}):(\d{2}):(\d{2}),(\d{3})/g;

  return srtContent.replace(timeRegex, (_match, h, m, s, ms) => {
    let totalMs = 
      parseInt(h) * 3600000 + 
      parseInt(m) * 60000 + 
      parseInt(s) * 1000 + 
      parseInt(ms) + shiftMs;

    if (totalMs < 0) totalMs = 0;

    const newH = Math.floor(totalMs / 3600000).toString().padStart(2, '0');
    totalMs %= 3600000;
    const newM = Math.floor(totalMs / 60000).toString().padStart(2, '0');
    totalMs %= 60000;
    const newS = Math.floor(totalMs / 1000).toString().padStart(2, '0');
    const newMs = (totalMs % 1000).toString().padStart(3, '0');

    return `${newH}:${newM}:${newS},${newMs}`;
  });
};
