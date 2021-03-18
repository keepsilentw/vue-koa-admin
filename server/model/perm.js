const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PermSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: String,
  perm_code: String,
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
}, { collection: 'perm' })

PermSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = Date.now()
  }
  next()
})

const Perm = mongoose.model('perm', PermSchema)

module.exports = Perm
