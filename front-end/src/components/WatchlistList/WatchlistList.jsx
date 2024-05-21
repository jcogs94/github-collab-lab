import React from 'react';

const WatchlistList = ({ watchlists, onEditWatchlist }) => {
  return (
    <div>
      <h2>My Watchlists</h2>
      {watchlists.map((watchlist) => (
        <div key={watchlist._id}>
          <h3>{watchlist.name}</h3>
          <button onClick={() => onEditWatchlist(watchlist)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default WatchlistList;