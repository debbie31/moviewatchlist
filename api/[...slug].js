import app from '../server/app.js';
import { connectDB } from '../server/db.js';

// Vercel serverless entry — handles every /api/* request.
export default async function handler(req, res) {
  await connectDB(process.env.MONGO_URI);
  return app(req, res);
}
