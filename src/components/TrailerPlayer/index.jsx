import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import style from './style.module.css';

function TrailerPlayer({ trailerKey, title, onClose }) {
  return (
    <Modal open onClose={onClose} className={style.backdrop}>
      <div className={style.player}>
        <button
          type="button"
          className={style.close}
          onClick={onClose}
          aria-label="Close trailer"
        >
          <CloseRoundedIcon />
        </button>
        <iframe
          className={style.frame}
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
          title={`${title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Modal>
  );
}

TrailerPlayer.propTypes = {
  trailerKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TrailerPlayer;
