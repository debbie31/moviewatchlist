import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate('/');
    else if (value === 1) navigate('/movies');
    else if (value === 2) navigate('/search');
  }, [value, navigate]);

  return (
    <Box
      sx={{
        color: 'white',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'rgb(28, 33, 33)',
        zIndex: 100,
      }}
    >
      <BottomNavigation
        style={{ backgroundColor: '#202828' }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ color: 'white' }}
          label='Trending'
          icon={<WhatshotOutlinedIcon />}
        />
        <BottomNavigationAction
          style={{ color: 'white' }}
          label='Movies'
          icon={<MovieOutlinedIcon />}
        />
        <BottomNavigationAction
          style={{ color: 'white' }}
          label='Search'
          icon={<SearchOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
