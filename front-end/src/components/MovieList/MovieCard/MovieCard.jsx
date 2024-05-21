import React from "react"
import './MovieCard.css'

const MovieCard = ({ title, year, poster }) => {
    return <>
        <li className="movie-card">
            <h2>{title}</h2>
            <p>{year}</p>
            <img src={poster} alt={title} />
        </li>
    </>
}

export default MovieCard
