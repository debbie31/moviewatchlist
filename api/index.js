import app from '../server/app.js';
import { connectDB } from '../server/db.js';

// Vercel serverless entry — handles every /api/* request.
export default async function handler(req, res) {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (err) {
    console.error('DB connection failed:', err.message);
    return res
      .status(503)
      .json({ message: 'Service unavailable. Please try again later.' });
  }
  return app(req, res);
}
