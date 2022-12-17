import style from './style.module.css';

const NavBar = () => {
  return (

    <div onClick={() => window.scroll(0,0)} className={style.navheader}>Movie Watchlist</div>
  );
};

export default NavBar;
