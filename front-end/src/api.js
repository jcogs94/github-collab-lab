const API_URL = 'http://localhost:3000';

export const fetchMovies = async (searchQuery) => {
  const response = await fetch(`${API_URL}/fetch-movies?search=${encodeURIComponent(searchQuery)}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const addToWatchList = async (movie) => {
  const response = await fetch(`${API_URL}/add-to-watchlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  });
  if (!response.ok) {
    throw new Error('Failed to add movie to watch list');
  }
  return response.json();
};

export const fetchWatchList = async () => {
  const response = await fetch(`${API_URL}/watchlist`);
  if (!response.ok) {
    throw new Error('Failed to fetch watch list');
  }
  return response.json();
};
