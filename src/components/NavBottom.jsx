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
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: '#202828',
        boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
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
          style={{ color: 'rgb(39, 170, 180)' }}
          label='Trending'
          icon={<WhatshotOutlinedIcon />}
        />
        <BottomNavigationAction
          style={{ color: 'rgb(39, 170, 180)' }}
          label='Movies'
          icon={<MovieOutlinedIcon />}
        />
        <BottomNavigationAction
          style={{ color: 'rgb(39, 170, 180)' }}
          label='Search'
          icon={<SearchOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}