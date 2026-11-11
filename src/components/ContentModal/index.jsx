import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {
  API_KEY,
  BASE_URL,
  getWatchRegion,
  imgOriginal,
  unavailableLandscape,
} from '../../config';
import { directFreeLink, trailerKeyFromDetails } from '../../api';
import { useMyList } from '../../context/MyListContext';
import TrailerPlayer from '../TrailerPlayer';
import style from './style.module.css';

function ContentModal({ item, onClose }) {
  const [details, setDetails] = useState(null);
  const [providers, setProviders] = useState(null);
  const [playing, setPlaying] = useState(false);
  const { isInList, toggleInList } = useMyList();

  const title = item.title || item.name;
  const year = (item.first_air_date || item.release_date || '').slice(0, 4);
  const inList = isInList(item.id);

  useEffect(() => {
    let cancelled = false;

    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/movie/${item.id}`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            append_to_response: 'credits,videos',
          },
        });
        if (!cancelled) setDetails(data);
      } catch {
        if (!cancelled) setDetails(null);
      }
    };

    const fetchProviders = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/movie/${item.id}/watch/providers`,
          { params: { api_key: API_KEY } }
        );
        if (!cancelled) setProviders(data.results || null);
      } catch {
        if (!cancelled) setProviders(null);
      }
    };

    fetchDetails();
    fetchProviders();
    return () => {
      cancelled = true;
    };
  }, [item.id]);

  const imagePath = item.backdrop_path || item.poster_path;
  const imageSrc = imagePath
    ? `${imgOriginal}${imagePath}`
    : unavailableLandscape;
  const cast = details?.credits?.cast
    ?.slice(0, 5)
    .map((c) => c.name)
    .join(', ');
  const trailerKey = trailerKeyFromDetails(details);

  const region = getWatchRegion();
  const watch = providers?.[region];
  const freeProviders = [...(watch?.free || []), ...(watch?.ads || [])];
  const firstDirect = freeProviders
    .map((p) => ({ provider: p, url: directFreeLink(p.provider_id, title) }))
    .find((x) => x.url);
  const freeWatchLink = firstDirect?.url || (freeProviders.length ? watch.link : null);
  const watchGroups = [
    { label: 'Free', list: watch?.free },
    { label: 'Free (ads)', list: watch?.ads },
    { label: 'Stream', list: watch?.flatrate },
    { label: 'Rent', list: watch?.rent },
    { label: 'Buy', list: watch?.buy },
  ].filter((g) => g.list?.length);

  return (
    <>
      <Modal open onClose={onClose} className={style.backdrop}>
        <div className={style.modal}>
          <div className={style.imageWrap}>
            <img className={style.image} src={imageSrc} alt={title} />
            <div className={style.imageGradient} />
            <button
              type="button"
              className={style.close}
              onClick={onClose}
              aria-label="Close"
            >
              <CloseRoundedIcon />
            </button>
            <div className={style.titleBlock}>
              <h2 className={style.title}>{title}</h2>
              <div className={style.actions}>
                {freeWatchLink && (
                <a
                  className={style.freeButton}
                  href={freeWatchLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <OndemandVideoRoundedIcon />
                  {firstDirect ? `Watch Free on ${firstDirect.provider.provider_name}` : 'Watch Free'}
                </a>
                )}
                {trailerKey && (
                <button
                  type="button"
                  className={style.playButton}
                  onClick={() => setPlaying(true)}
                >
                  <PlayArrowRoundedIcon />
                  Play Trailer
                </button>
                )}
                <button
                  type="button"
                  className={style.listButton}
                  onClick={() => toggleInList(item)}
                >
                  {inList ? <CheckRoundedIcon /> : <AddRoundedIcon />}
                  {inList ? 'In My List' : 'Add to My List'}
                </button>
              </div>
            </div>
          </div>

          <div className={style.body}>
            <div className={style.meta}>
              {item.vote_average > 0 && (
              <span className={style.score}>
                <StarRoundedIcon fontSize="small" />
                {Math.round(item.vote_average * 10)}% Match
              </span>
              )}
              {year && <span>{year}</span>}
              {details?.runtime > 0 && <span>{details.runtime} min</span>}
              {details?.genres?.length > 0 && (
              <span className={style.genres}>
                {details.genres.map((g) => g.name).join(' • ')}
              </span>
              )}
            </div>
            <p className={style.overview}>
              {item.overview || 'No overview available.'}
            </p>
            {cast && (
            <p className={style.cast}>
              <span>Cast:</span> {cast}
            </p>
            )}
            {watchGroups.length > 0 && (
              <div className={style.watch}>
                <h3 className={style.watchTitle}>Where to watch</h3>
                {watchGroups.map((group) => (
                  <div key={group.label} className={style.watchRow}>
                    <span className={style.watchLabel}>{group.label}</span>
                    <div className={style.logos}>
                      {group.list.map((p) => (
                        <a
                          key={p.provider_id}
                          href={directFreeLink(p.provider_id, title) || watch.link}
                          target="_blank"
                          rel="noreferrer"
                          title={p.provider_name}
                        >
                          <img
                            className={style.logo}
                            src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                            alt={p.provider_name}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
      {playing && trailerKey && (
        <TrailerPlayer
          trailerKey={trailerKey}
          title={title}
          onClose={() => setPlaying(false)}
        />
      )}
    </>
  );
}

ContentModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
    vote_average: PropTypes.number,
    first_air_date: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ContentModal;
