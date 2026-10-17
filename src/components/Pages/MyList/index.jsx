import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyList } from '../../../context/MyListContext';
import { useTrailerPlayer } from '../../../hooks/useTrailerPlayer';
import SingleContent from '../../SingleContent';
import ContentModal from '../../ContentModal';
import style from './style.module.css';

function MyList() {
  const { myList } = useMyList();
  const [selected, setSelected] = useState(null);
  const { play, player } = useTrailerPlayer();
  const navigate = useNavigate();

  const handlePlay = async (movie) => {
    if (!(await play(movie))) setSelected(movie);
  };

  return (
    <div>
      <span className="pageTitle">My List</span>
      {myList.length === 0 ? (
        <div className={style.empty}>
          <p>Your list is empty.</p>
          <p className={style.hint}>
            Browse trending titles and hit “My List” to save movies here.
          </p>
          <button
            type="button"
            className={style.browse}
            onClick={() => navigate('/')}
          >
            Browse Trending
          </button>
        </div>
      ) : (
        <div className={style.grid}>
          {myList.map((m) => (
            <SingleContent
              key={m.id}
              poster={m.poster_path}
              title={m.title || m.name}
              date={m.first_air_date || m.release_date}
              vote={m.vote_average}
              item={m}
              onClick={() => setSelected(m)}
              onPlay={() => handlePlay(m)}
            />
          ))}
        </div>
      )}
      {selected && (
        <ContentModal item={selected} onClose={() => setSelected(null)} />
      )}
      {player}
    </div>
  );
}

export default MyList;
