import mongoose from 'mongoose';

// Reuse the connection across serverless invocations (Vercel) —
// on a long-running server this just connects once.
let cached = globalThis._mongoose;
if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null };
}

export async function connectDB(uri) {
  if (!uri) throw new Error('MONGO_URI is not configured');
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 5000 })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
