<<<<<<< HEAD
import React, { useState } from 'react';
import SearchForm from './components/Search/SearchForm.jsx';
import MovieList from './components/MovieList.jsx';
import { fetchMovies } from './api.js';
=======
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList/MovieList.jsx'
import SearchForm from './components/SearchForm/SearchForm.jsx';
// import WatchList from './components/WatchList/WatchList.jsx';
import { fetchMovies, addToWatchList, fetchWatchList } from './api.js';
import './App.css'
>>>>>>> 4b4049c71b99270e6dfcde73a294b7a157d28202

const App = () => {
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWatchList = async () => {
      try {
        const watchListData = await fetchWatchList();
        setWatchList(watchListData);
      } catch (err) {
        setError('Failed to fetch watch list');
      }
    };
    getWatchList();
  }, []);

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

  const handleAddToWatchList = async (movie) => {
    try {
      const addedMovie = await addToWatchList(movie);
      setWatchList([...watchList, addedMovie]);
    } catch (err) {
      setError('Failed to add movie to watch list');
    }
  };

  return (
    <div>
      <h1>Movie Database</h1>
      <SearchForm onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <MovieList movies={movies} onAddToWatchList={handleAddToWatchList} />
      {/* <WatchList watchList={watchList} /> */}
    </div>
  );
};

export default App;
