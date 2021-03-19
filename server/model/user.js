const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  email: String,
  department: String,
  status: {
    type: Boolean,
    default: true
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  update_time: {
    type: Date,
    default: Date.now
  }
}, { collection: 'user' })

UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.create_time = this.update_time = Date.now()
  } else {
    this.update_time = Date.now()
  }
  next()
})

const User = mongoose.model('user', UserSchema)

module.exports = User
