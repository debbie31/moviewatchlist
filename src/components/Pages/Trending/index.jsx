import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomPagination from '../../CustomPagination';
import SingleContent from '../../SingleContent';
import style from './style.module.css';

const API_KEY = '87b8b75ac124397ba90935e5580b950c';

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    );

    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className='pageTitle'>Trending Now</span>
      <div className={style.trending}>
        {content &&
          content.map((c) => (
            <SingleContent
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type='movie'
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
