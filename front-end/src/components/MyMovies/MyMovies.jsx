import React from "react";
import MovieCard from "../MovieCard/MovieCard.jsx";

const MyMovies = ({ movies, onUpdateWatchedStatus, onDeleteMovie }) => {
    return (
        <div>
            <h2>My Movies</h2>
            {movies.map((movie) => (
                <MovieCard
                    key={
                        movie._id ||
                        movie.imdbID ||
                        `${movie.title}-${movie.year}-${Math.random()
                            .toString(36)
                            .substr(2, 9)}`
                    }
                    movie={movie}
                    onUpdateWatchedStatus={onUpdateWatchedStatus}
                    onDeleteMovie={onDeleteMovie}
                />
            ))}
        </div>
    );
};

export default MyMovies;
