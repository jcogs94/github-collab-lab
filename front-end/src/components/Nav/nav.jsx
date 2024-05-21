import React from 'react';

const Nav = () => {
    return (
    <>
    <nav>
    <li>
            <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to='/search'>Search</Link>
        </li>
        <li>
            <Link to='/watchlists'>Watch List</Link>
        </li>
        <li>
            <Link to='/my-movies'>Specific Movies</Link>
        </li>


    </nav>
    
    </>

    )};

export default Nav;