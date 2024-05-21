import React, { useState } from 'react';
import SearchForm from './components/SearchForm.jsx';
import MovieList from './components/MovieList.jsx';
import { fetchMovies } from './api.js';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (searchQuery) => {
    try {
      const movieData = await fetchMovies(searchQuery);
      setMovies(movieData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies');
      setMovies([]);
    }
  };

  return (
    <div>
      <h1>Movie Database</h1>
      <SearchForm onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default App;


