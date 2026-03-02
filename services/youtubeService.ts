import { THUMBNAIL_QUALITIES } from '../constants';
import { ThumbnailOption, VideoMetadata } from '../types';

export function extractVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length === 11) {
    return match[7];
  }
  // Check for shorts
  if (url.includes('/shorts/')) {
    const parts = url.split('/shorts/');
    if (parts[1]) return parts[1].split(/[?#]/)[0];
  }
  return null;
}

export async function fetchVideoMetadata(videoId: string): Promise<VideoMetadata> {
  const thumbnails: ThumbnailOption[] = [];

  for (const q of THUMBNAIL_QUALITIES) {
    // JPG
    thumbnails.push({
      id: `${q.id}-jpg`,
      url: `https://i.ytimg.com/vi/${videoId}/${q.id}.jpg`,
      label: q.id, // Store ID to look up in translations
      width: q.width,
      height: q.height,
      format: 'JPG',
      quality: q.id
    });
    // WEBP
    thumbnails.push({
      id: `${q.id}-webp`,
      url: `https://i.ytimg.com/vi_webp/${videoId}/${q.id}.webp`,
      label: q.id, // Store ID to look up in translations
      width: q.width,
      height: q.height,
      format: 'WEBP',
      quality: q.id
    });
  }

  let title = 'YouTube Video';
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (res.ok) {
      const data = await res.json();
      title = data.title;
    }
  } catch (e) {
    console.error("Failed to fetch video title", e);
  }

  return {
    id: videoId,
    title,
    thumbnails
  };
}