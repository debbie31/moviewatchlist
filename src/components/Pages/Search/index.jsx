import SearchOutlined from '@mui/icons-material/SearchOutlined';
import {
  Button,
  createTheme,
  Tabs,
  Tab,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SingleContent from '../../SingleContent';
import CustomPagination from '../../CustomPagination';
import style from './style.module.css';
import axios from 'axios';

const API_KEY = '87b8b75ac124397ba90935e5580b950c';

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className={style.search}>
          <TextField
            style={{ flex: 1, backgroundColor: '#b1b6ba', color: 'white' }}
            className='searchBox'
            label='Search'
            variant='filled'
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant='contained'
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchOutlined fontSize='large' 
            style={{ color: 'black' }}/>
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab style={{ width: '100%' }} label='Search Movies' />
        </Tabs>
      </ThemeProvider>
      <div className={style.search}>
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
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
