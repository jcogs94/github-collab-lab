import React, { useState } from 'react';
import './WatchListForm.css'

const WatchListForm = ({ onCreateWatchList }) => {
  const [listName, setListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateWatchList(listName);
    setListName('');
  };

  return (
    <form id='watchlist-form' onSubmit={handleSubmit}>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Enter watchlist name"
      />
      <button type="submit">Create Watchlist</button>
    </form>
  );
};

export default WatchListForm;