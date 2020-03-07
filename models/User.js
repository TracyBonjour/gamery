const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  //department: Number,
  email: String,
  //googleID: String,
  imageUrl: String,
  //bosser la partie image
  collections:[ { type: Schema.Types.ObjectId, ref: 'Collection' } ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;