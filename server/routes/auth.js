import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../middleware/auth.js';

const router = Router();

// Express 4 does not forward async rejections to the error middleware —
// wrap handlers so failures return a JSON 500 instead of hanging.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const publicUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
});

router.post('/signup', asyncHandler(async (req, res) => {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required' });
  }
  if (username.trim().length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    const existing = await User.findOne({
      $or: [
        { email: email.trim().toLowerCase() },
        { username: username.trim() },
      ],
    });
    if (existing) {
      return res.status(409).json({ message: 'Username or email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
    });

    return res.status(201).json({
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Username or email already in use' });
    }
    throw err;
  }
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.json({
    token: signToken(user),
    user: publicUser(user),
  });
}));

export default router;
