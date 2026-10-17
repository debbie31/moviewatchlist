# Movie Watchlist

live Demo: https://moviewatchlist-ten.vercel.app/

This project is a Movie Watchlist web application built using **React.js** and **The Movie Database (TMDb) API**. It allows users to search for movies, view trending movies, and maintain a personal movie watchlist.

## Features

- **Netflix-style Home**: A cinematic hero billboard featuring a trending title, plus horizontally scrolling rows (Trending Now, Top Rated, Popular, Now Playing, Upcoming, and genre rows) that lazy-load more titles as you scroll.
- **Category Pages**: Click a row title to browse the full category in a paginated grid.
- **My List**: Save movies to a personal watchlist persisted in `localStorage`, with quick add/remove from anywhere in the app.
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

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/debbie31/moviewatchlist.git



