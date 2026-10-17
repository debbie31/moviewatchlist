import PropTypes from 'prop-types';
import { createTheme, Pagination, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914',
    },
  },
});

function CustomPagination({ setPage, numOfPages = 10, currentPage }) {
  // Handle page change
  const handlePageChange = (event, page) => {
    setPage(page); // Update the page in the parent component
    window.scroll(0, 0); // Scroll to top when the page changes
  };

  return (
    <div className="pagination-container">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={handlePageChange} // Use the event and the page number
          count={numOfPages} // Number of pages available
          page={currentPage} // Current active page to show
          color="primary"
          siblingCount={1} // Number of sibling pages to show on each side
          boundaryCount={2} // Number of pages to show at the beginning and end
          showFirstButton
          showLastButton
          size="large"
        />
      </ThemeProvider>
    </div>
  );
}

CustomPagination.propTypes = {
  setPage: PropTypes.func.isRequired,
  numOfPages: PropTypes.number,
  currentPage: PropTypes.number,
};

CustomPagination.defaultProps = {
  numOfPages: 10,
  currentPage: 1,
};

export default CustomPagination;
