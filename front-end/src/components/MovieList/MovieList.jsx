import React from "react"
import MovieCard from "../MovieCard/MovieCard.jsx"
import './MovieList.css'

const MovieList = ({ movies }) => {
    return <>
        <div id="movie-list-container">
            <ul id="movie-list">
                {movies.map( (movie, index) =>
                    <MovieCard key={index} {...movie} />
                )}
            </ul>
        </div>
    </>
}

export default MovieList
