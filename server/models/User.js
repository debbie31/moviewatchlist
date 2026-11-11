import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    title: String,
    name: String,
    overview: String,
    poster_path: String,
    backdrop_path: String,
    vote_average: Number,
    first_air_date: String,
    release_date: String,
    media_type: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
    myList: { type: [movieSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
