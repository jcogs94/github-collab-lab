import React from 'react';
import './Home.css'

const Home = () => {
  return (
    <div id='home'>
      <h1>Welcome to the Movie Database</h1>
      <p><em>This is the home page of the Movie Database application.<br />Use the navigation menu to explore different features.</em></p>
      <ul>
        <li><b>Search Movies</b><br /><em>Search for movies and add them to your collection.</em></li>
        <li><b>My Movies</b><br /><em>View and manage your personal movie collection.</em></li>
        <li><b>My Watchlists</b><br /><em>Create and manage your movie watchlists.</em></li>
      </ul>
    </div>
  );
};

export default Home;