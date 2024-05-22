import React, { useState } from 'react';
import WatchlistEdit from '../WatchlistEdit/WatchlistEdit';
import './WatchlistList.css';

const WatchlistList = ({ watchlists, onEditWatchlist }) => {
  const [editingWatchlist, setEditingWatchlist] = useState(null);

  const handleEditClick = (watchlist) => {
    setEditingWatchlist(watchlist);
  };

  const handleSave = () => {
    setEditingWatchlist(null);
    onEditWatchlist();
  };

  return (
    <div id='watchlists-container'>
      <h2>My Watchlists</h2>
      {editingWatchlist ? (
        <WatchlistEdit watchlist={editingWatchlist} onSave={handleSave} />
      ) : (
        watchlists.map((watchlist) => (
          <div className='watchlist' key={watchlist._id}>
            <h3>{watchlist.name}</h3>
            <button onClick={() => handleEditClick(watchlist)}>Edit</button>
          </div>
        ))
      )}
    </div>
  );
};

export default WatchlistList;
