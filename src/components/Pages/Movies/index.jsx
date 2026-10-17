import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { API_KEY, BASE_URL } from '../../../config';
import { useTrailerPlayer } from '../../../hooks/useTrailerPlayer';
import ContentModal from '../../ContentModal';
import CustomPagination from '../../CustomPagination';
import SingleContent from '../../SingleContent';
import style from './style.module.css';

function Movies() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { play, player } = useTrailerPlayer();

  const handlePlay = async (movie) => {
    if (!(await play(movie))) setSelected(movie);
  };

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/discover/movie`,
        {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false,
            page,
          },
        }
      );
      setContent(data.results);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      {loading && <p className={style.loading}>Loading...</p>}
      {error && <p className={style.error}>{error}</p>}
      <div className={style.movies}>
        {content.map((movie) => (
          <SingleContent
            key={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            date={movie.release_date}
            vote={movie.vote_average}
            item={movie}
            onClick={() => setSelected(movie)}
            onPlay={() => handlePlay(movie)}
          />
        ))}
      </div>
      <CustomPagination setPage={setPage} currentPage={page} />
      {selected && (
        <ContentModal item={selected} onClose={() => setSelected(null)} />
      )}
      {player}
    </div>
  );
}

export default Movies;
