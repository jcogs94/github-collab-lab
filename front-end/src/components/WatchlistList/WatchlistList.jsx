import React from 'react';
import './WatchlistList.css'

const WatchlistList = ({ watchlists, onEditWatchlist }) => {
  return (
    <div id='watchlists-container'>
      <h2>My Watchlists</h2>
      {watchlists.map((watchlist) => (
        <div className='watchlist' key={watchlist._id}>
          <h3>{watchlist.name}</h3>
          <button onClick={() => onEditWatchlist(watchlist)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default WatchlistList;