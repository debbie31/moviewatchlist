import axios from 'axios';
import { API_KEY, BASE_URL, getWatchRegion } from './config';

// Authenticated API client for our backend (JWT attached automatically)
export const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('mw_token');
  if (token) cfg.headers.set('Authorization', `Bearer ${token}`);
  return cfg;
});

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

// Direct search links for known free providers (TMDB does not expose
// provider-specific title URLs, so we deep-link to their search page).
const FREE_PROVIDER_LINKS = {
  73: (q) => `https://tubitv.com/search/${q}`, // Tubi
  207: (q) => `https://therokuchannel.roku.com/search?query=${q}`, // The Roku Channel
  235: (q) => `https://www.youtube.com/results?search_query=${q}`, // YouTube Free
  300: (q) => `https://pluto.tv/us/search/?query=${q}`, // Pluto TV
  538: (q) => `https://watch.plex.tv/search?q=${q}`, // Plex
};

export const directFreeLink = (providerId, title) => {
  const build = FREE_PROVIDER_LINKS[providerId];
  return build ? build(encodeURIComponent(title || '')) : null;
};

// Returns the best link to watch a movie for free: a direct provider link
// when we know one, else TMDB's "where to watch" page. Null if it isn't
// free/ad-supported in the user's region.
export const fetchFreeWatchLink = async (movie) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movie.id}/watch/providers`, {
      params: { api_key: API_KEY },
    });
    const watch = data.results?.[getWatchRegion()];
    const freeProviders = [...(watch?.free || []), ...(watch?.ads || [])];
    if (!freeProviders.length) return null;
    const title = movie.title || movie.name || '';
    const direct = freeProviders
      .map((p) => directFreeLink(p.provider_id, title))
      .find(Boolean);
    return direct || watch.link || null;
  } catch {
    return null;
  }
};
