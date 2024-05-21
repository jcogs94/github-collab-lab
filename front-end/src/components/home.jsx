import React from 'react';
import SearchForm from "./SearchForm/SearchForm.jsx";
import MovieList from "./MovieList/MovieList.jsx"
function HomePage({ handleSearch, error, movies, handleAddToWatchList }) {
    return (
        <>
        <div>
        <h1>Your Number One Movie Data Base!</h1>
      <SearchForm onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <MovieList movies={movies} onAddToWatchList={handleAddToWatchList} />
      {/* <WatchList watchList={watchList} /> */}
        </div>
        </>
    )
}

// function HomePage() {
//     return (
//         <>
//         <div>
//             <p>Your Number One Movie Data Base!</p>
//         </div>
//         </>
//     )
// }

export default HomePage;