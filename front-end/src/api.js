const API_URL = 'http://localhost:3000';

export const fetchMovies = async (searchQuery) => {
  const response = await fetch(`${API_URL}/fetch-movies?search=${searchQuery}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
