import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList/MovieList.jsx'
import SearchForm from './components/SearchForm/SearchForm.jsx';
import MyMovies from './components/MyMovies/MyMovies.jsx';
import WatchListForm from './components/WatchListForm/WatchListForm.jsx';
import UnwatchedMovies from './components/UnwatchedMovies/UnwatchedMovies.jsx';
import {
  fetchMovies,
  addToMyMovies,
  fetchMyMovies,
  updateWatchedStatus,
  deleteMovie,
  createWatchList,
  fetchUnwatchedMovies,
  addMoviesToWatchList,
} from './api.js';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [error, setError] = useState(null);
  const [watchlists, setWatchlists] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [unwatchedMovies, setUnwatchedMovies] = useState([]);

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

  useEffect(() => {
    const getUnwatchedMovies = async () => {
      try {
        const unwatchedMoviesData = await fetchUnwatchedMovies();
        setUnwatchedMovies(unwatchedMoviesData);
      } catch (err) {
        setError('Failed to fetch unwatched movies');
      }
    };
    getUnwatchedMovies();
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

  const handleCreateWatchList = async (listName) => {
    try {
      const newWatchList = await createWatchList(listName);
      setWatchlists([...watchlists, newWatchList]);
    } catch (error) {
      setError('Failed to create watchlist');
    }
  };

  const handleMovieSelect = (movieId) => {
    const index = selectedMovies.indexOf(movieId);
    if (index > -1) {
      setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
    } else {
      setSelectedMovies([...selectedMovies, movieId]);
    }
  };

  const handleAddMoviesToWatchList = async (watchlistId) => {
    try {
      const updatedWatchList = await addMoviesToWatchList(watchlistId, selectedMovies);
      setWatchlists(
        watchlists.map((watchlist) =>
          watchlist._id === watchlistId ? updatedWatchList : watchlist
        )
      );
      setSelectedMovies([]);
    } catch (error) {
      setError('Failed to add movies to watchlist');
    }
  };

  return (
    <div>
      <h1>Movie Database</h1>
      <SearchForm onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <MovieList movies={movies} onAddToMyMovies={handleAddToMyMovies} />
      <MyMovies
        movies={myMovies}
        onUpdateWatchedStatus={handleUpdateWatchedStatus}
        onDeleteMovie={handleDeleteMovie}
      />
      <WatchListForm onCreateWatchList={handleCreateWatchList} />
      <UnwatchedMovies
        movies={unwatchedMovies}
        selectedMovies={selectedMovies}
        onMovieSelect={handleMovieSelect}
        onAddMoviesToWatchList={handleAddMoviesToWatchList}
        watchlists={watchlists}
      />
    </div>
  );
};

export default App;