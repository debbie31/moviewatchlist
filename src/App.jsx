import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import SimpleBottomNavigation from './components/NavBottom';
import NavBar from './components/NavHeader';
import { AuthProvider } from './context/AuthContext';
import { MyListProvider } from './context/MyListContext';
import Trending from './components/Pages/Trending';
import Movies from './components/Pages/Movies';
import Search from './components/Pages/Search';
import MyList from './components/Pages/MyList';
import Category from './components/Pages/Category';
import Auth from './components/Pages/Auth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MyListProvider>
          <NavBar />
          <div className="app">
            <Routes>
              <Route path="/" element={<Trending />} />
              <Route path="/movies" element={<Container className="page"><Movies /></Container>} />
              <Route path="/mylist" element={<Container className="page"><MyList /></Container>} />
              <Route path="/search" element={<Container className="page"><Search /></Container>} />
              <Route path="/browse/:slug" element={<Container className="page"><Category /></Container>} />
              <Route path="/login" element={<Container className="page"><Auth mode="login" /></Container>} />
              <Route path="/signup" element={<Container className="page"><Auth mode="signup" /></Container>} />
            </Routes>
          </div>
          <SimpleBottomNavigation />
        </MyListProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
