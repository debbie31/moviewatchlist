import { useEffect, useState } from 'react';
import { Button, createTheme, Tabs, Tab, TextField, ThemeProvider } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import axios from 'axios';
import SingleContent from '../../SingleContent';
import CustomPagination from '../../CustomPagination';
import style from './style.module.css';

const API_KEY = '87b8b75ac124397ba90935e5580b950c';

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });

  // Debounce function
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500); // Adjust the debounce delay as needed

    return () => clearTimeout(timer); // Clear the previous timeout if the user types again
  }, [searchText]);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${debouncedSearchText}&page=${page}&include_adult=false`
      );
      console.log('Fetched Data:', data); // Debugging: Check API response

      if (data.results && data.results.length > 0) {
        setContent(data.results);
        setNumOfPages(data.total_pages);
      } else {
        setContent([]); // Clear content if no results
        setNumOfPages(0);
      }
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };

  useEffect(() => {
    if (debouncedSearchText) {
      fetchSearch();
    }
  }, [debouncedSearchText, type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className={style.search}>
          <TextField
            style={{ flex: 1, backgroundColor: '#b1b6ba', color: 'white' }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchOutlined fontSize="large" style={{ color: 'black' }} />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab style={{ width: '100%' }} label="Search Movies" />
        </Tabs>
      </ThemeProvider>

      <div className={style.search}>
        {content.length === 0 ? (
          <p>No results found</p> // Display message when no results
        ) : (
          content.map((c) => (
            <SingleContent
              key={c.id} // Ensure you have a key for each item
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
            />
          ))
        )}
      </div>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
