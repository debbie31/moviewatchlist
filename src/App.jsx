import './App.css';
import SimpleBottomNavigation from './components/NavBottom';
import NavBar from './components/NavHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Trending from './components/Pages/Trending';
import Movies from './components/Pages/Movies';
import Search from './components/Pages/Search';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='app'>
        <Container>
        <Routes>
            <Route path='/' element={<Trending />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;


