import React, { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';

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
    <div>
      <h2>My Movies</h2>
      <div>
        <button onClick={() => handleFilterChange('all')}>All Movies</button>
        <button onClick={() => handleFilterChange('watched')}>Watched Movies</button>
        <button onClick={() => handleFilterChange('unwatched')}>Unwatched Movies</button>
      </div>
      {filteredMovies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onUpdateWatchedStatus={onUpdateWatchedStatus}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </div>
  );
};

export default MyMovies;