const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const Movie = require("./models/Movie");
const WatchList = require("./models/WatchList");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;
const tmdbApiKey = process.env.TMDB_API_KEY;
const defaultPoster = "./assets/no-poster.jpg";

// Connect to MongoDB
mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());

// Fetch and Save Movies Endpoint
app.get("/fetch-movies", async (req, res) => {
    const searchQuery = req.query.search;

    if (!searchQuery) {
        return res.status(400).send("Search query is required");
    }

    const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie`,
        params: {
            api_key: tmdbApiKey,
            query: searchQuery,
        },
    };

    try {
        const response = await axios.request(options);
        const movies = response.data.results.map((movie) => ({
            title: movie.title,
            year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
            poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultPoster,
            watched: false, // Default value for the watched field
        }));

        // Respond with the movie data
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching movies");
    }
});

// Add movie to watch list
app.post("/my-movies", async (req, res) => {
    const { title, year, poster } = req.body;

    if (!title || !year || !poster) {
        return res.status(400).send("Title, year, and poster are required");
    }

    try {
        const movie = new Movie({ title, year, poster, watched: false });
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while adding the movie");
    }
});

// Update watched status
app.patch("/my-movies/:id", async (req, res) => {
    const { watched } = req.body;

    if (typeof watched !== "boolean") {
        return res.status(400).send("Watched status must be a boolean");
    }

    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            { watched },
            { new: true }
        );
        if (!movie) {
            return res.status(404).send("Movie not found");
        }
        res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the movie");
    }
});

// Get all movies
app.get("/my-movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while retrieving movies");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
