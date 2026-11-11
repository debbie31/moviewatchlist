# Movie Watchlist

live Demo: https://moviewatchlist-ten.vercel.app/

This project is a full-stack Movie Watchlist web application built with the **MERN stack** — **MongoDB**, **Express**, **React.js** (Vite), and **Node.js** — using **The Movie Database (TMDb) API** for movie data. Users can sign up, log in, and their personal watchlist is stored in MongoDB.

## Features

- **Netflix-style Home**: A cinematic hero billboard featuring a trending title, plus horizontally scrolling rows (Trending Now, Top Rated, Popular, Now Playing, Upcoming, and genre rows) that lazy-load more titles as you scroll.
- **Category Pages**: Click a row title to browse the full category in a paginated grid.
- **Accounts & Auth**: Sign up / log in with JWT authentication; passwords hashed with bcrypt.
- **My List**: Save movies to a personal watchlist — synced to MongoDB when signed in, `localStorage` for guests (guest items merge into your account on login).
- **Trailer Playback**: Hit Play on the hero banner or any movie's detail panel to watch its trailer in a fullscreen player.
- **Movie Details Modal**: Click any poster to see a Netflix-style detail panel with backdrop art, match score, runtime, genres, and cast.
- **Movie Search**: Allows users to search for movies by name.
- **Pagination**: Handles pagination for movie browsing and search results.
- **Responsive UI**: Top navigation on desktop, bottom navigation on mobile.

## Technologies Used

- **React.js**: For building the user interface.
- **Material UI**: For styling and components like Buttons, Tabs, and TextField.
- **Axios**: For making API requests.
- **TMDb API**: For fetching movie data.
- **CSS Modules**: For scoped and reusable CSS.
- **React Hooks**: Using `useState`, `useEffect`, and `useContext` for state and lifecycle management.
- **Node.js + Express**: REST API (`server/`) for auth and the watchlist.
- **MongoDB + Mongoose**: User accounts and per-user watchlists.
- **JWT + bcryptjs**: Token-based auth and password hashing.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB running locally (`brew services start mongodb-community` or `mongod`), or a MongoDB Atlas connection string.

### 1. Clone the Repository

```bash
git clone https://github.com/debbie31/moviewatchlist.git
```

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env   # set MONGO_URI and JWT_SECRET
npm run dev            # API on http://localhost:5001
```

### 3. Frontend setup

```bash
npm install
npm run dev            # App on http://localhost:5173 (proxies /api to :5001)
```

### API endpoints

| Method | Route | Description |
| ------ | ----- | ----------- |
| POST | `/api/auth/signup` | Create account (`username`, `email`, `password`) |
| POST | `/api/auth/login` | Log in (`email`, `password`) → JWT |
| GET | `/api/list` | Get your watchlist (auth) |
| POST | `/api/list` | Add a movie (auth) |
| POST | `/api/list/merge` | Merge guest items into your list (auth) |
| DELETE | `/api/list/:movieId` | Remove a movie (auth) |


