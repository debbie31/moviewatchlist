import PropTypes from 'prop-types';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { img300, unavailable } from '../../config';
import { useMyList } from '../../context/MyListContext';
import style from './style.module.css';

function SingleContent({
  poster,
  title,
  date,
  vote,
  item,
  onClick,
  onPlay,
}) {
  const year = date ? date.slice(0, 4) : '';
  const { isInList, toggleInList } = useMyList();

  const handleAction = (e, action) => {
    e.stopPropagation();
    action();
  };

  const handleActionKey = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
      action();
    }
  };

  return (
    <button type="button" className={style.content} onClick={onClick}>
      <div className={style.posterWrap}>
        <img
          className={style.poster}
          src={poster ? `${img300}/${poster}` : unavailable}
          alt={title}
          loading="lazy"
        />
        {vote > 0 && (
          <span className={style.badge}>
            <StarRoundedIcon fontSize="inherit" />
            {vote.toFixed(1)}
          </span>
        )}
        {onPlay && (
          <span
            className={style.playBtn}
            role="button"
            tabIndex={-1}
            aria-label={`Play ${title} trailer`}
            onClick={(e) => handleAction(e, onPlay)}
            onKeyDown={(e) => handleActionKey(e, onPlay)}
          >
            <PlayArrowRoundedIcon fontSize="large" />
          </span>
        )}
        <div className={style.overlay}>
          <div className={style.actions}>
            {item && (
              <span
                className={style.iconBtn}
                role="button"
                tabIndex={-1}
                aria-label={isInList(item.id) ? `Remove ${title} from My List` : `Add ${title} to My List`}
                onClick={(e) => handleAction(e, () => toggleInList(item))}
                onKeyDown={(e) => handleActionKey(e, () => toggleInList(item))}
              >
                {isInList(item.id) ? <CheckRoundedIcon /> : <AddRoundedIcon />}
              </span>
            )}
            <span
              className={style.iconBtn}
              role="button"
              tabIndex={-1}
              aria-label={`More info about ${title}`}
              onClick={(e) => handleAction(e, onClick)}
              onKeyDown={(e) => handleActionKey(e, onClick)}
            >
              <InfoOutlinedIcon />
            </span>
          </div>
          <b className={style.title}>{title}</b>
          {year && <span className={style.year}>{year}</span>}
        </div>
      </div>
    </button>
  );
}

SingleContent.propTypes = {
  poster: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  vote: PropTypes.number,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
  onPlay: PropTypes.func,
};

SingleContent.defaultProps = {
  poster: null,
  date: '',
  vote: 0,
  item: null,
  onPlay: undefined,
};

export default SingleContent;
