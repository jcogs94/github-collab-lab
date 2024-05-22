import React, { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';
import './MyMovies.css'

const MyMovies = ({ movies, onUpdateWatchedStatus, onDeleteMovie }) => {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === 'watched') {
      return movie.watched;
    } else if (filter === 'unwatched') {
      return !movie.watched;
    }
    return true;
  });

  return (
    <div id='my-movies-container'>
      <h2>My Movies</h2>
      <div id='my-movies-filters'>
        <button onClick={() => handleFilterChange('all')}>All Movies</button>
        <button onClick={() => handleFilterChange('watched')}>Watched Movies</button>
        <button onClick={() => handleFilterChange('unwatched')}>Unwatched Movies</button>
      </div>
      <div id="my-movies">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onUpdateWatchedStatus={onUpdateWatchedStatus}
            onDeleteMovie={onDeleteMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default MyMovies;