const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

const WatchList = mongoose.model('WatchList', watchListSchema);

module.exports = WatchList;