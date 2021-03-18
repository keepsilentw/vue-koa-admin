const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RoleSchema = new Schema({
  id: {
    type: Number,
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
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = Date.now()
  }
  next()
})

const Role = mongoose.model('role', RoleSchema)

module.exports = Role
