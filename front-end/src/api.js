const API_URL = 'http://localhost:3000';

export const fetchMovies = async (searchQuery) => {
  const response = await fetch(`${API_URL}/fetch-movies?search=${encodeURIComponent(searchQuery)}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const addToMyMovies = async (movie) => {
  const response = await fetch(`${API_URL}/my-movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  });
  if (!response.ok) {
    throw new Error('Failed to add movie to my movies');
  }
  return response.json();
};

export const updateWatchedStatus = async (id, watched) => {
  const response = await fetch(`${API_URL}/my-movies/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ watched })
  });
  if (!response.ok) {
    throw new Error('Failed to update watched status');
  }
  return response.json();
};

export const fetchMyMovies = async () => {
  const response = await fetch(`${API_URL}/my-movies`);
  if (!response.ok) {
    throw new Error('Failed to fetch my movies');
  }
  return response.json();
};
