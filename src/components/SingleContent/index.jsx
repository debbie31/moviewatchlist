import { img_300 } from '../../config';
import style from './style.module.css';

const SingleContent = ({
  poster,
  title,
  date,
  media_type,
}) => {
  return (
    <div className={style.content}>
      <img className={style.poster} src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <b className={style.title}>{title}</b>
      <span className={style.subTitle}>
        {media_type === 'tv' ? 'TV Series' : 'Movie'}
        <span className={style.subTitle}>{date}</span>
      </span>
    </div>
  );
};

export default SingleContent;
