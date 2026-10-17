import { NavLink } from 'react-router-dom';
import style from './style.module.css';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/movies', label: 'Movies' },
  { to: '/mylist', label: 'My List' },
  { to: '/search', label: 'Search' },
];

function NavBar() {
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
    </nav>
  );
}

export default NavBar;
