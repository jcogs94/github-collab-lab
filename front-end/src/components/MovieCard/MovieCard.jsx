import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onAddToMyMovies, onUpdateWatchedStatus, onDeleteMovie }) => {
  const [watched, setWatched] = useState(movie.watched);

  const toggleWatched = () => {
    setWatched(!watched);
    onUpdateWatchedStatus(movie._id, !watched);
  };

  const handleAddToMyMovies = () => {
    const movieToAdd = {
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      watched: movie.watched
    };
    console.log('Button clicked for movie:', movie);
    onAddToMyMovies(movieToAdd);
  };

  return (
    <div className="movie-card">
      <h2>{movie.title} ({movie.year})</h2>
      <img src={movie.poster} alt={movie.title} />
      {onUpdateWatchedStatus && (
        <p>
          <label>
            <input className='checkbox' type="checkbox" checked={watched} onChange={toggleWatched} />
            Watched
          </label>
        </p>
      )}
      {onAddToMyMovies && <button onClick={handleAddToMyMovies}>Add to My Movies</button>}
      {onDeleteMovie && <button onClick={() => onDeleteMovie(movie._id)}>Delete</button>}
      
    </div>
  );
};


export default MovieCard;
