import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import CustomPagination from '../../CustomPagination';
import SingleContent from '../../SingleContent';
import style from './style.module.css';

const API_KEY = '87b8b75ac124397ba90935e5580b950c';
const BASE_URL = 'https://api.themoviedb.org/3';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            page: page,
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
      <span className='pageTitle'>Movies</span>
      {loading && <p>Loading...</p>}
      {error && <p className={style.error}>{error}</p>}
      <div className={style.movies}>
        {content.map((movie) => (
          <SingleContent
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            date={movie.release_date}
            media_type='movie'
          />
        ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Movies;
