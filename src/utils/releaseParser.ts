export const parseReleaseName = (filename: string) => {
  const yearMatch = filename.match(/(19|20)\d{2}/);
  const resolutionMatch = filename.match(/(720p|1080p|2160p|4k|480p)/i);
  const sourceMatch = filename.match(/(bluray|web-dl|webrip|hdtv|cam|ts)/i);
  const codecMatch = filename.match(/(x264|x265|hevc|h264)/i);
  
  // استخراج مجموعة الرفع (غالباً ما تكون في نهاية الاسم بعد شرطة)
  const groupMatch = filename.match(/-([a-zA-Z0-9]+)(\.[a-z]{3})?$/i);

  return {
    year: yearMatch ? parseInt(yearMatch[0]) : null,
    resolution: resolutionMatch ? resolutionMatch[0].toLowerCase() : null,
    source: sourceMatch ? sourceMatch[0].toLowerCase() : null,
    codec: codecMatch ? codecMatch[0].toLowerCase() : null,
    group: groupMatch ? groupMatch[1].toLowerCase() : null,
  };
};

export const calculateMatchScore = (userFile: string, subRelease: string): number => {
  if (!userFile) return 0;
  
  const userParams = parseReleaseName(userFile);
  const subParams = parseReleaseName(subRelease);
  
  let score = 0;
  if (userParams.resolution === subParams.resolution) score += 25;
  if (userParams.source === subParams.source) score += 25;
  if (userParams.group === subParams.group) score += 30;
  if (userParams.codec === subParams.codec) score += 20;

  return score;
};
