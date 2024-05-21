import React from 'react';

const UnwatchedMovies = ({ movies, selectedMovies, onMovieSelect }) => {
  return (
    <div>
      <h3>Unwatched Movies</h3>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedMovies.includes(movie._id)}
                onChange={() => onMovieSelect(movie._id)}
              />
              {movie.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnwatchedMovies;