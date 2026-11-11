import axios from 'axios';
import PropTypes from 'prop-types';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Link } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../../config';
import SingleContent from '../SingleContent';
import style from './style.module.css';

const MAX_PAGES = 10;

function Row({
  title, path, params, slug, free, onSelect, onPlay,
}) {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const sliderRef = useRef(null);

  const fetchPage = useCallback(
    async (pageNum) => {
      try {
        const { data } = await axios.get(`${BASE_URL}${path}`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page: pageNum,
            ...params,
          },
        });
        const results = data.results || [];
        setItems((prev) => {
          const seen = new Set(prev.map((i) => i.id));
          return [...prev, ...results.filter((i) => !seen.has(i.id))];
        });
        return pageNum < Math.min(data.total_pages || pageNum, MAX_PAGES);
      } catch {
        return false;
      }
    },
    [path, params]
  );

  useEffect(() => {
    let cancelled = false;

    const loadFirstPage = async () => {
      const more = await fetchPage(1);
      if (!cancelled) {
        pageRef.current = 2;
        setHasMore(more);
      }
    };

    loadFirstPage();
    return () => {
      cancelled = true;
    };
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    const more = await fetchPage(pageRef.current);
    pageRef.current += 1;
    setHasMore(more);
    loadingRef.current = false;
  }, [fetchPage, hasMore]);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 400) {
      loadMore();
    }
  };

  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollBy({
      left: direction * slider.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  if (!items.length) return null;

  return (
    <section className={style.row}>
      <h2 className={style.title}>
        <Link className={style.titleLink} to={`/browse/${slug}`}>
          {title}
          <span className={style.seeAll}>
            Explore All
            <ChevronRightRoundedIcon fontSize="small" />
          </span>
        </Link>
      </h2>
      <div className={style.sliderWrap}>
        <button
          type="button"
          className={`${style.arrow} ${style.left}`}
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
        >
          <ChevronLeftRoundedIcon fontSize="large" />
        </button>
        <div className={style.slider} ref={sliderRef} onScroll={handleScroll}>
          {items.map((item) => (
            <SingleContent
              key={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              vote={item.vote_average}
              item={item}
              free={free}
              onClick={() => onSelect(item)}
              onPlay={onPlay ? () => onPlay(item) : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          className={`${style.arrow} ${style.right}`}
          onClick={() => scroll(1)}
          aria-label="Scroll right"
        >
          <ChevronRightRoundedIcon fontSize="large" />
        </button>
      </div>
    </section>
  );
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  params: PropTypes.shape({}),
  slug: PropTypes.string.isRequired,
  free: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onPlay: PropTypes.func,
};

Row.defaultProps = {
  params: {},
  free: false,
  onPlay: undefined,
};

export default Row;
