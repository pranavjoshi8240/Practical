// src/services/api.ts
import axios from 'axios';
import { VideoItem } from '../types/VideoItem';

const BASE_URL = 'https://devapi.sociocircle.org/glimps/philosophy/684ee90a-6498-4c58-a425-bdbe93886eb7';

export const fetchVideos = async (cursor: string | null): Promise<{ videos: VideoItem[]; nextCursor: string | null }> => {
  try {
    let url = `${BASE_URL}?pageSize=5`;
    if (cursor) {
      url += `&cursor=${encodeURIComponent(cursor)}`;
    }
    const response = await axios.get(url);

    if (response.status === 200 && response.data) {
      const data = response.data.data;
      const videos: VideoItem[] = data.list || [];

      const pagination = data.pagination || {};
      const nextCursor = pagination.hasNext ? pagination.nextCursor : null;

      return {
        videos,
        nextCursor,
      };
    }

    return { videos: [], nextCursor: null };
  } catch (error) {
    console.error('Error fetching videos:', error);
    return { videos: [], nextCursor: null };
  }
};
