import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search Movies</Link>
        </li>
        <li>
          <Link to="/my-movies">My Movies</Link>
        </li>
        <li>
          <Link to="/watchlists">My Watchlists</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;