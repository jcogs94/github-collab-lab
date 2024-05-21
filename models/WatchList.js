const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  poster: { type: String, required: true },
  watched: { type: Boolean, default: false }
});

const WatchList = mongoose.model('WatchList', watchListSchema);

module.exports = WatchList;
