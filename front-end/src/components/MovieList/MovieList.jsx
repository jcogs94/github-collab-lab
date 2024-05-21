import React from "react"
import MovieCard from "../MovieCard/MovieCard.jsx"
import './MovieList.css'

const MovieList = ({ movies }) => {
    return <>
        <div className="movie-list">
            <ul>
                {movies.map( (movie, index) =>
                    <MovieCard key={index} {...movie} />
                )}
            </ul>
        </div>
    </>
}

export default MovieList
