import axios from 'axios';
import { API_KEY, BASE_URL } from './config';

const pickTrailer = (videos) => {
  const youtube = (videos || []).filter((v) => v.site === 'YouTube');
  return (
    youtube.find((v) => v.type === 'Trailer' && v.official)
    || youtube.find((v) => v.type === 'Trailer')
    || youtube.find((v) => v.type === 'Teaser')
    || youtube[0]
  );
};

export const fetchTrailerKey = async (movieId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: { api_key: API_KEY, language: 'en-US' },
    });
    return pickTrailer(data.results)?.key || null;
  } catch {
    return null;
  }
};

export const trailerKeyFromDetails = (details) => {
  const trailer = pickTrailer(details?.videos?.results);
  return trailer ? trailer.key : null;
};
