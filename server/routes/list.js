import { Router } from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user.myList);
});

router.post('/', async (req, res) => {
  const movie = req.body;
  if (!movie || typeof movie.id !== 'number') {
    return res.status(400).json({ message: 'Movie with numeric id is required' });
  }

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!user.myList.some((m) => m.id === movie.id)) {
    user.myList.push(movie);
    await user.save();
  }
  return res.status(201).json(user.myList);
});

// Merge items saved while logged out into the user's list
router.post('/merge', async (req, res) => {
  const movies = Array.isArray(req.body?.movies) ? req.body.movies : [];
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const existing = new Set(user.myList.map((m) => m.id));
  movies
    .filter((m) => m && typeof m.id === 'number' && !existing.has(m.id))
    .forEach((m) => {
      user.myList.push(m);
      existing.add(m.id);
    });

  await user.save();
  return res.json(user.myList);
});

router.delete('/:movieId', async (req, res) => {
  const movieId = Number(req.params.movieId);
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.myList = user.myList.filter((m) => m.id !== movieId);
  await user.save();
  return res.json(user.myList);
});

export default router;
