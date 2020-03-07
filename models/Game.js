const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gameSchema = new Schema({
  creatorID: Number,
  yearpublished: Number,
  minplayer: Number,
  maxplayer: Number,
  playingtime: Number,
//   minplaytime: Number,
//   maxplaytime: Number,
  age: Number,
  name: String,
  description: String,
  image: String,
  category:  {
    type: String,
    enum: ['XXXXX', 'XXXXXXX', 'XXXXXX', 'XXXXXX', 'XXXXXX']
  },
  ratingM: Number,
  comments: [
      {
        userID: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
        rating: Number,
        text: String,
      }
  ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;