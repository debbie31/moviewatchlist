import { createTheme, Pagination, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fff',
    },
  },
});

const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textcontent)}
          count={numberOfPages}
          color='primary'
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
