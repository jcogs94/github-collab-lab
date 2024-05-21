import React from "react"
import './MovieCard.css'

const MovieCard = ({ title, year, poster }) => {
    return <>
        <li className="movie-card">
            <h2>{title}</h2>
            <img src={poster} alt={title} />
            <p>{year}</p>
        </li>
    </>
}

export default MovieCard
