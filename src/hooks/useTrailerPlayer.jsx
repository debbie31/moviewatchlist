import { useCallback, useState } from 'react';
import { fetchTrailerKey } from '../api';
import TrailerPlayer from '../components/TrailerPlayer';

export function useTrailerPlayer() {
  const [trailer, setTrailer] = useState(null);

  const play = useCallback(async (movie) => {
    const key = await fetchTrailerKey(movie.id);
    if (!key) return false;
    setTrailer({ key, title: movie.title || movie.name });
    return true;
  }, []);

  const player = trailer ? (
    <TrailerPlayer
      trailerKey={trailer.key}
      title={trailer.title}
      onClose={() => setTrailer(null)}
    />
  ) : null;

  return { play, player };
}

export default useTrailerPlayer;
