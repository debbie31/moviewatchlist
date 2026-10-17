const GENRE_PARAMS = { sort_by: 'popularity.desc' };

const genreRow = (slug, title, withGenres) => ({
  slug,
  title,
  path: '/discover/movie',
  params: { ...GENRE_PARAMS, with_genres: withGenres },
});

const ROWS = [
  { slug: 'trending', title: 'Trending Now', path: '/trending/movie/week' },
  { slug: 'top-rated', title: 'Top Rated', path: '/movie/top_rated' },
  { slug: 'popular', title: 'Popular', path: '/movie/popular' },
  { slug: 'now-playing', title: 'Now Playing', path: '/movie/now_playing' },
  { slug: 'upcoming', title: 'Upcoming', path: '/movie/upcoming' },
  genreRow('action', 'Action & Adventure', '28,12'),
  genreRow('comedy', 'Comedy', '35'),
  genreRow('horror', 'Horror', '27'),
  genreRow('sci-fi', 'Sci-Fi & Fantasy', '878,14'),
  genreRow('thriller', 'Thriller', '53'),
  genreRow('romance', 'Romance', '10749'),
  genreRow('animation', 'Animation', '16'),
  genreRow('crime', 'Crime', '80'),
  genreRow('drama', 'Drama', '18'),
  genreRow('documentary', 'Documentary', '99'),
];

export default ROWS;
