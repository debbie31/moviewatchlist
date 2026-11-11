import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFreeWatchLink } from '../../../api';
import { API_KEY, BASE_URL } from '../../../config';
import { useTrailerPlayer } from '../../../hooks/useTrailerPlayer';
import ROWS from '../../../rows';
import ContentModal from '../../ContentModal';
import CustomPagination from '../../CustomPagination';
import SingleContent from '../../SingleContent';
import style from './style.module.css';

function Category() {
  const { slug } = useParams();
  const row = ROWS.find((r) => r.slug === slug);

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { play, player } = useTrailerPlayer();

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

  useEffect(() => {
    setPage(1);
    setContent([]);
  }, [slug]);

  useEffect(() => {
    if (!row) return undefined;

    let cancelled = false;
    window.scrollTo(0, 0);

    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`${BASE_URL}${row.path}`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page,
            ...row.params,
          },
        });
        if (!cancelled) {
          setContent(data.results || []);
          setNumOfPages(Math.min(data.total_pages || 1, 500));
        }
      } catch {
        if (!cancelled) setError('Failed to load movies. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCategory();
    return () => {
      cancelled = true;
    };
  }, [row, page]);

  if (!row) {
    return <p className={style.error}>Category not found.</p>;
  }

  return (
    <div>
      <span className="pageTitle">{row.title}</span>
      {loading && <p className={style.loading}>Loading...</p>}
      {error && <p className={style.error}>{error}</p>}
      <div className={style.grid}>
        {content.map((movie) => (
          <SingleContent
            key={movie.id}
            poster={movie.poster_path}
            title={movie.title || movie.name}
            date={movie.first_air_date || movie.release_date}
            vote={movie.vote_average}
            item={movie}
            free={row.free}
            onClick={() => setSelected(movie)}
            onPlay={() => (row.free ? handleWatchFree(movie) : handlePlay(movie))}
          />
        ))}
      </div>
      <CustomPagination
        setPage={setPage}
        numOfPages={numOfPages}
        currentPage={page}
      />
      {selected && (
        <ContentModal item={selected} onClose={() => setSelected(null)} />
      )}
      {player}
    </div>
  );
}

export default Category;
