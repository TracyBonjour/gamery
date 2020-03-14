const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  department: String,
  email: String,
  //googleID: String,
  image: String,
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