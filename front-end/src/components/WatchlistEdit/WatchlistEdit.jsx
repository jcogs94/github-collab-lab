import React, { useState, useEffect } from 'react';
import { fetchUnwatchedMovies, addMoviesToWatchList, removeMoviesFromWatchList } from '../../api.js';
import './WatchlistEdit.css';

const WatchlistEdit = ({ watchlist, onSave }) => {
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState(watchlist.movies.map(movie => movie._id));
    const [name, setName] = useState(watchlist.name);

    useEffect(() => {
        const getUnwatchedMovies = async () => {
            try {
                const data = await fetchUnwatchedMovies();
                setUnwatchedMovies(data);
            } catch (err) {
                console.error('Failed to fetch unwatched movies', err);
            }
        };
        getUnwatchedMovies();
    }, []);

    const handleCheckboxChange = (movieId) => {
        if (selectedMovies.includes(movieId)) {
            setSelectedMovies(selectedMovies.filter(id => id !== movieId));
        } else {
            setSelectedMovies([...selectedMovies, movieId]);
        }
    };

    const handleSave = async () => {
        try {
            const movieIdsToAdd = selectedMovies.filter(id => !watchlist.movies.some(movie => movie._id === id));
            const movieIdsToRemove = watchlist.movies.filter(movie => !selectedMovies.includes(movie._id)).map(movie => movie._id);

            if (movieIdsToAdd.length > 0) {
                await addMoviesToWatchList(watchlist._id, movieIdsToAdd);
            }

            if (movieIdsToRemove.length > 0) {
                await removeMoviesFromWatchList(watchlist._id, movieIdsToRemove);
            }

            if (name !== watchlist.name) {
                const response = await fetch(`http://localhost:3000/watchlists/${watchlist._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name }),
                });
                if (!response.ok) {
                    throw new Error('Failed to update watchlist name');
                }
            }

            onSave();
        } catch (error) {
            console.error('Error saving watchlist:', error);
        }
    };

    return (
        <div className="watchlist-edit">
            <h2>Edit Watchlist</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Watchlist Name"
            />
            <div className="movies-list">
                {unwatchedMovies.map(movie => (
                    <div key={movie._id} className="movie-item">
                        <input
                            type="checkbox"
                            checked={selectedMovies.includes(movie._id)}
                            onChange={() => handleCheckboxChange(movie._id)}
                        />
                        <span>{movie.title} ({movie.year})</span>
                    </div>
                ))}
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default WatchlistEdit;
