const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const userSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: { //Password Hash
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  acc_status: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
})
Users = mongoose.model('Users', userSchema)

module.exports = Users;
