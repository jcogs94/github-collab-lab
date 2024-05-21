import React from 'react';

const Nav = ({ setPage }) =>
<nav>
          <button onClick={() => setPage('./components/SearchForm/SearchForm.jsx')}>Search</button>
          <button onClick={() => setPage('./components/MovieList/MovieList.jsx')}>Watch List</button>
          <button onClick={() => setPage('./components/MovieCard/MovieCard.jsx')}>A Specific</button>
          
        </nav>

export default Nav;