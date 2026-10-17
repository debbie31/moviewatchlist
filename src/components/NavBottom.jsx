import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useNavigate, useLocation } from 'react-router-dom';

const ROUTES = ['/', '/movies', '/mylist', '/search'];

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const value = Math.max(ROUTES.indexOf(location.pathname), 0);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: '#141414',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.6)',
        display: { xs: 'block', md: 'none' },
      }}
    >
      <BottomNavigation
        style={{ backgroundColor: '#141414' }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          navigate(ROUTES[newValue]);
        }}
      >
        <BottomNavigationAction
          style={{ color: '#e5e5e5' }}
          label="Home"
          icon={<WhatshotOutlinedIcon />}
        />
        <BottomNavigationAction
          style={{ color: '#e5e5e5' }}
          label="Movies"
          icon={<MovieOutlinedIcon />}
        />
        <BottomNavigationAction
          style={{ color: '#e5e5e5' }}
          label="My List"
          icon={<BookmarkBorderOutlinedIcon />}
        />
        <BottomNavigationAction
          style={{ color: '#e5e5e5' }}
          label="Search"
          icon={<SearchOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
