const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const Movie = require('./models/Movie');
const WatchList = require('./models/WatchList');
require('dotenv').config();

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
app.use(express.static(path.join(__dirname)));

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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

        // Save movies to MongoDB
        await Movie.insertMany(movies);

        // Respond with the movie data
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching movies");
    }
});

// Add movie to watch list
app.post("/add-to-watchlist", async (req, res) => {
    const { title, year, poster } = req.body;

    if (!title || !year || !poster) {
        return res.status(400).send("Title, year, and poster are required");
    }

    try {
        const watchListItem = new WatchList({
            title,
            year,
            poster,
            watched: false,
        });
        await watchListItem.save();
        res.status(201).json(watchListItem);
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "An error occurred while adding the movie to the watch list"
        );
    }
});

// Get movies from watch list
app.get("/watchlist", async (req, res) => {
    try {
        const watchList = await WatchList.find();
        res.status(200).json(watchList);
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "An error occurred while retrieving the watch list"
        );
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
