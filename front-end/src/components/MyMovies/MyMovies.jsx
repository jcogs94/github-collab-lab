import React from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';

const MyMovies = ({ movies, onUpdateWatchedStatus }) => {
  return (
    <div>
      <h2>My Movies</h2>
      {movies.map((movie) => (
        <MovieCard key={movie._id || movie.imdbID || `${movie.title}-${movie.year}-${Math.random().toString(36).substr(2, 9)}`} movie={movie} onUpdateWatchedStatus={onUpdateWatchedStatus} />
      ))}
    </div>
  );
};

export default MyMovies;
