import React from 'react';
import './UnwatchedMovies.css'

const UnwatchedMovies = ({ movies, selectedMovies, onMovieSelect }) => {
  return (
    <div id='unwatched-movies'>
      <h3>Unwatched Movies</h3>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <label>
              <input className='checkbox'
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