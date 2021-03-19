const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RoleSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
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
}, { collection: 'role' })

RoleSchema.pre('save', function(next) {
  if (this.isNew) {
    this.create_time = this.update_time = Date.now()
  } else {
    this.update_time = Date.now()
  }
  next()
})

const Role = mongoose.model('role', RoleSchema)

module.exports = Role
