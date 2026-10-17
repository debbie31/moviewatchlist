import PropTypes from 'prop-types';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { imgOriginal } from '../../config';
import { useMyList } from '../../context/MyListContext';
import style from './style.module.css';

function Hero({ movie, onSelect, onPlay }) {
  const { isInList, toggleInList } = useMyList();

  if (!movie) return null;

  const title = movie.title || movie.name;
  const inList = isInList(movie.id);

  return (
    <header className={style.hero}>
      <img
        className={style.backdrop}
        src={`${imgOriginal}${movie.backdrop_path || movie.poster_path}`}
        alt={title}
      />
      <div className={style.gradient} />
      <div className={style.contents}>
        <h1 className={style.title}>{title}</h1>
        <p className={style.overview}>{movie.overview}</p>
        <div className={style.buttons}>
          <button
            type="button"
            className={`${style.button} ${style.play}`}
            onClick={() => onPlay(movie)}
          >
            <PlayArrowRoundedIcon />
            Play Trailer
          </button>
          <button
            type="button"
            className={`${style.button} ${style.secondary}`}
            onClick={() => toggleInList(movie)}
          >
            {inList ? <CheckRoundedIcon /> : <AddRoundedIcon />}
            {inList ? 'In My List' : 'My List'}
          </button>
          <button
            type="button"
            className={`${style.button} ${style.secondary}`}
            onClick={() => onSelect(movie)}
          >
            <InfoOutlinedIcon />
            More Info
          </button>
        </div>
      </div>
    </header>
  );
}

Hero.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
  }),
  onSelect: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
};

Hero.defaultProps = {
  movie: null,
};

export default Hero;
