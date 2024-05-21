import React from 'react';
import './Nav.css';

function Nav() {
    return (
        <nav>
            <ul>
                <li><a href='./components/Search/SearchForm.jsx'>Search</a></li>
                <li><a href= './components/MovieList.js'>Movie List</a></li>
                <li><a href= './components/Movie.js'>A Specific Movie</a></li>
            </ul>
        </nav>
    );
}

export default Nav;