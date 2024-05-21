import React, { useState, useEffect } from 'react';
// import Nav from './components/Nav/nav.jsx'
import MovieList from './components/MovieList/MovieList.jsx'
import SearchForm from './components/SearchForm/SearchForm.jsx';
import MyMovies from './components/MyMovies/MyMovies.jsx';
import { fetchMovies, addToMyMovies, fetchMyMovies, updateWatchedStatus, deleteMovie } from './api.js';
import HomePage from './components/home.jsx';
const App = () => {
  const [movies, setMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState('/');

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
      const movieData = await fetchMovies(searchQuery);
      setMovies(movieData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies');
      setMovies([]);
    }
  };

  const handleAddToMyMovies = async (movie) => {
    console.log('Adding movie:', movie);
    try {
      const addedMovie = await addToMyMovies(movie);
      setMyMovies([...myMovies, addedMovie]);
    } catch (err) {
      setError('Failed to add movie to my movies');
    }
  };

  const handleUpdateWatchedStatus = async (id, watched) => {
    try {
      const updatedMovie = await updateWatchedStatus(id, watched);
      setMyMovies(myMovies.map(movie => movie._id === id ? updatedMovie : movie));
    } catch (err) {
      setError('Failed to update watched status');
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await deleteMovie(movieId);
      setMyMovies(myMovies.filter((movie) => movie._id !== movieId));
    } catch (error) {
      setError('Failed to delete movie');
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setPage("./components/Home.jsx")}>Home</button>
        <button onClick={() => setPage("./components/SearchForm/SearchForm.jsx")}>Search</button>
        <button onClick={() => setPage("./components/MovieList/MovieList.jsx")}>Watch List</button>
        <button onClick={() => setPage("./components/MovieCard/MovieCard.jsx")}>A Specific Movie Card</button>
      </nav>
      <HomePage 
      handleAddToWatchList={handleAddToWatchList}
      error={error}
      movies={movies}
      handleSearch={handleSearch}
      
      />
      <SearchForm onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <MovieList movies={movies} onAddToMyMovies={handleAddToMyMovies} />
      <MyMovies movies={myMovies} onUpdateWatchedStatus={handleUpdateWatchedStatus} onDeleteMovie={handleDeleteMovie} />
    </div>
  );
};

export default App;
