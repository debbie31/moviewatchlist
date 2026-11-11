import 'dotenv/config';
import app from './app.js';
import { connectDB } from './db.js';

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/moviewatchlist';

connectDB(MONGO_URI)
  .then(() => {
    console.log(`MongoDB connected: ${MONGO_URI.split('@').pop()}`);
    app.listen(PORT, () => console.log(`API server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
