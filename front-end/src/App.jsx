import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Home from "./components/Home/Home.jsx";
import SearchForm from "./components/SearchForm/SearchForm.jsx";
import MovieList from "./components/MovieList/MovieList.jsx";
import MyMovies from "./components/MyMovies/MyMovies.jsx";
import WatchListForm from "./components/WatchListForm/WatchListForm.jsx";
import UnwatchedMovies from "./components/UnwatchedMovies/UnwatchedMovies.jsx";
import {
    fetchMovies,
    addToMyMovies,
    fetchMyMovies,
    updateWatchedStatus,
    deleteMovie,
    createWatchList,
    fetchUnwatchedMovies,
    addMoviesToWatchList,
    fetchWatchlists,
} from "./api.js";
import WatchlistList from "./components/WatchlistList/WatchlistList.jsx";
import "./App.css";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [myMovies, setMyMovies] = useState([]);
    const [error, setError] = useState(null);
    const [watchlists, setWatchlists] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);

    useEffect(() => {
        const getWatchlists = async () => {
            try {
                const watchlistsData = await fetchWatchlists();
                console.log("DEBUG36 Fetched watchlists:", watchlistsData);
                setWatchlists(watchlistsData);
            } catch (err) {
                setError("Failed to fetch watchlists");
            }
        };
        getWatchlists();
    }, []);

    useEffect(() => {
        const getMyMovies = async () => {
            try {
                const myMoviesData = await fetchMyMovies();
                setMyMovies(myMoviesData);
            } catch (err) {
                setError("Failed to fetch my movies");
            }
        };
        getMyMovies();
    }, []);

    useEffect(() => {
        const getUnwatchedMovies = async () => {
            try {
                const unwatchedMoviesData = await fetchUnwatchedMovies();
                setUnwatchedMovies(unwatchedMoviesData);
            } catch (err) {
                setError("Failed to fetch unwatched movies");
            }
        };
        getUnwatchedMovies();
    }, []);

    const handleSearch = async (searchQuery) => {
        try {
            const movieData = await fetchMovies(searchQuery);
            setMovies(movieData);
            setError(null);
        } catch (err) {
            setError("Failed to fetch movies");
            setMovies([]);
        }
    };

    const handleAddToMyMovies = async (movie) => {
        console.log("Adding movie:", movie);
        try {
            const addedMovie = await addToMyMovies(movie);
            setMyMovies([...myMovies, addedMovie]);
        } catch (err) {
            setError("Failed to add movie to my movies");
        }
    };

    const handleUpdateWatchedStatus = async (id, watched) => {
        try {
            const updatedMovie = await updateWatchedStatus(id, watched);
            setMyMovies(
                myMovies.map((movie) =>
                    movie._id === id ? updatedMovie : movie
                )
            );
        } catch (err) {
            setError("Failed to update watched status");
        }
    };

    const handleDeleteMovie = async (movieId) => {
        try {
            await deleteMovie(movieId);
            setMyMovies(myMovies.filter((movie) => movie._id !== movieId));
        } catch (error) {
            setError("Failed to delete movie");
        }
    };

    const handleCreateWatchList = async (listName) => {
        try {
            const newWatchList = await createWatchList(listName);
            setWatchlists([...watchlists, newWatchList]);
        } catch (error) {
            setError("Failed to create watchlist");
        }
    };

    const handleMovieSelect = (movieId) => {
        const index = selectedMovies.indexOf(movieId);
        if (index > -1) {
            setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
        } else {
            setSelectedMovies([...selectedMovies, movieId]);
        }
    };

    const handleAddMoviesToWatchList = async (watchlistId) => {
        try {
            const updatedWatchList = await addMoviesToWatchList(
                watchlistId,
                selectedMovies
            );
            setWatchlists(
                watchlists.map((watchlist) =>
                    watchlist._id === watchlistId ? updatedWatchList : watchlist
                )
            );
            setSelectedMovies([]);
        } catch (error) {
            setError("Failed to add movies to watchlist");
        }
    };

    const handleEditWatchlist = async (watchlist) => {
        try {
            const updatedWatchlist = { ...watchlist };
            const newName = prompt(
                "Enter the new name for the watchlist:",
                watchlist.name
            );
            if (newName !== null) {
                updatedWatchlist.name = newName;
                const response = await fetch(`http://localhost:3000/watchlists/${watchlist._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedWatchlist),
    });
                if (response.ok) {
                    const updatedWatchlistData = await response.json();
                    setWatchlists(
                        watchlists.map((wl) =>
                            wl._id === updatedWatchlistData._id
                                ? updatedWatchlistData
                                : wl
                        )
                    );
                } else {
                    throw new Error("Failed to update watchlist");
                }
            }
        } catch (error) {
            console.error("Error updating watchlist:", error);
        }
    };

    return (
        <Router>
            <>
                <Nav />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/search"
                        element={
                            <>
                                <SearchForm onSearch={handleSearch} />
                                {error && (
                                    <p className="error">
                                        <em>{error}</em>
                                    </p>
                                )}
                                <MovieList
                                    movies={movies}
                                    onAddToMyMovies={handleAddToMyMovies}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/my-movies"
                        element={
                            <MyMovies
                                movies={myMovies}
                                onUpdateWatchedStatus={
                                    handleUpdateWatchedStatus
                                }
                                onDeleteMovie={handleDeleteMovie}
                            />
                        }
                    />
                    <Route
                        path="/watchlists"
                        element={
                            <>
                                <WatchListForm
                                    onCreateWatchList={handleCreateWatchList}
                                />
                                <WatchlistList
                                    watchlists={watchlists}
                                    onEditWatchlist={handleEditWatchlist}
                                />
                                <UnwatchedMovies
                                    movies={unwatchedMovies}
                                    selectedMovies={selectedMovies}
                                    onMovieSelect={handleMovieSelect}
                                    onAddMoviesToWatchList={
                                        handleAddMoviesToWatchList
                                    }
                                    watchlists={watchlists}
                                />
                            </>
                        }
                    />
                </Routes>
            </>
        </Router>
    );
};

export default App;
