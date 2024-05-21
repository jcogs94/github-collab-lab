import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList/MovieList.jsx'
import SearchForm from './components/SearchForm/SearchForm.jsx';
// import WatchList from './components/WatchList/WatchList.jsx';
import { fetchMovies, addToWatchList, fetchWatchList } from './api.js';
import './App.css'
import HomePage from './components/home.jsx'
import Nav from './components/Nav/nav.jsx'




const App = () => {
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState({HomePage});
  const fetchAllMovies = async () => {};

  useEffect(() => {
    const getMyMovies = async () => {
      try {
        const myMoviesData = await fetchMyMovies();
        setMyMovies(myMoviesData);
      } catch (err) {
        setError('Failed to fetch my movies');
      }
    };
    getMyMovies();
  }, []);

  const handleSearch = async (searchQuery) => {
    try {
      const movieData = await fetchAllMovies();
      setMovies(movieData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies');
      setMovies([]);
    }
  }

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

  const getMovies = async () => {
    try {
      const movieData = await );
      setMovies(movieData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies');
    }
  }
},

[]);


  

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
      <Nav />
      <HomePage 
      handleSearch={handleSearch}
      getMovies={getMovies}
      onAddToWatchList={handleAddToWatchList}
      error={error}
      SearchForm={SearchForm}
      movies={movies}
      setMovies={setMovies}

      />
      {/* <h1>Movie Database</h1>
      <SearchForm onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <MovieList movies={movies} onAddToWatchList={handleAddToWatchList} /> */}
      {/* <WatchList watchList={watchList} /> */}
    </div>
  );
};

export default App;
