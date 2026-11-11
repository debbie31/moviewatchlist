import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import style from './style.module.css';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/movies', label: 'Movies' },
  { to: '/browse/free', label: 'Free' },
  { to: '/mylist', label: 'My List' },
  { to: '/search', label: 'Search' },
];

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={style.navheader}>
      <NavLink to="/" className={style.logo}>
        Watchlist
      </NavLink>
      <ul className={style.links}>
        {LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) => `${style.link} ${isActive ? style.active : ''}`}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={style.account}>
        {user ? (
          <>
            <span className={style.username}>{user.username}</span>
            <button type="button" className={style.signin} onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <NavLink to="/login" className={style.signin}>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
