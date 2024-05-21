import React from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';
import './MovieList.css'

const MovieList = ({ movies, onAddToMyMovies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie._id || movie.imdbID || `${movie.title}-${movie.year}-${Math.random().toString(36).substr(2, 9)}`} movie={movie} onAddToMyMovies={onAddToMyMovies} />
      ))}
    </div>
  );
};

export default MovieList;
