import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchFreeWatchLink } from '../../../api';
import { API_KEY, BASE_URL } from '../../../config';
import { useTrailerPlayer } from '../../../hooks/useTrailerPlayer';
import ROWS from '../../../rows';
import ContentModal from '../../ContentModal';
import Hero from '../../Hero';
import Row from '../../Row';
import style from './style.module.css';

function Trending() {
  const [featured, setFeatured] = useState(null);
  const [selected, setSelected] = useState(null);
  const { play, player } = useTrailerPlayer();

  useEffect(() => {
    let cancelled = false;

    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/trending/movie/week`, {
          params: { api_key: API_KEY, language: 'en-US' },
        });
        const withBackdrop = (data.results || []).filter((m) => m.backdrop_path);
        if (!cancelled && withBackdrop.length) {
          setFeatured(
            withBackdrop[Math.floor(Math.random() * Math.min(5, withBackdrop.length))]
          );
        }
      } catch {
        if (!cancelled) setFeatured(null);
      }
    };

    fetchFeatured();
    return () => {
      cancelled = true;
    };
  }, []);

  const handlePlay = async (movie) => {
    if (!(await play(movie))) setSelected(movie);
  };

  const handleWatchFree = async (movie) => {
    const win = window.open('', '_blank');
    const link = await fetchFreeWatchLink(movie);
    if (link) {
      if (win) win.location.href = link;
      else window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      win?.close();
      setSelected(movie);
    }
  };

  return (
    <div className={style.home}>
      <Hero movie={featured} onSelect={setSelected} onPlay={handlePlay} />
      <div className={style.rows}>
        {ROWS.map((row) => (
          <Row
            key={row.slug}
            title={row.title}
            path={row.path}
            params={row.params}
            slug={row.slug}
            free={row.free}
            onSelect={setSelected}
            onPlay={row.free ? handleWatchFree : handlePlay}
          />
        ))}
      </div>
      {selected && (
        <ContentModal item={selected} onClose={() => setSelected(null)} />
      )}
      {player}
    </div>
  );
}

export default Trending;
