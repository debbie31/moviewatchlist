import { useEffect, useState } from 'react';
import { createTheme, TextField, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../../../config';
import { useTrailerPlayer } from '../../../hooks/useTrailerPlayer';
import ContentModal from '../../ContentModal';
import SingleContent from '../../SingleContent';
import CustomPagination from '../../CustomPagination';
import style from './style.module.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914',
    },
  },
});

function Search() {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selected, setSelected] = useState(null);
  const [searched, setSearched] = useState(false);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const { play, player } = useTrailerPlayer();

  const handlePlay = async (movie) => {
    if (!(await play(movie))) setSelected(movie);
  };

  // Debounce function
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500); // Adjust the debounce delay as needed

    return () => clearTimeout(timer); // Clear the previous timeout if the user types again
  }, [searchText]);

  useEffect(() => {
    if (!debouncedSearchText) {
      setContent([]);
      setSearched(false);
      return;
    }

    const fetchSearch = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            query: debouncedSearchText,
            page,
            include_adult: false,
          },
        });

        setContent(data.results || []);
        setNumOfPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching search data:', error);
      } finally {
        setSearched(true);
      }
    };

    fetchSearch();
  }, [debouncedSearchText, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className={style.search}>
          <TextField
            className={style.searchBox}
            label="Search for a movie"
            variant="filled"
            fullWidth
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </ThemeProvider>

      <div className={style.grid}>
        {content.map((c) => (
          <SingleContent
            key={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            vote={c.vote_average}
            item={c}
            onClick={() => setSelected(c)}
            onPlay={() => handlePlay(c)}
          />
        ))}
      </div>

      {searched && content.length === 0 && (
        <p className={style.empty}>No results found</p>
      )}

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} currentPage={page} />
      )}

      {selected && (
        <ContentModal item={selected} onClose={() => setSelected(null)} />
      )}
      {player}
    </div>
  );
}

export default Search;
