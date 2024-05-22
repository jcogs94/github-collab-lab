import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div id='home'>
      <h1>Welcome to the Movie Database</h1>
      <p><em>This is the home page of the Movie Database application.<br />Use the navigation menu to explore different features.</em></p>
      <ul>
        <li><Link className='link' to="/search"><b>Search Movies</b></Link><br /><em>Search for movies and add them to your collection.</em></li>
        <li><Link className='link' to="/my-movies"><b>My Movies</b></Link><br /><em>View and manage your personal movie collection.</em></li>
        <li><Link className='link' to="/watchlists"><b>My Watchlists</b></Link><br /><em>Create and manage your movie watchlists.</em></li>
      </ul>
    </div>
  );
};

export default Home;