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
	createTime: {
		type: Date,
		default: Date.now
	},
	updateTime: {
		type: Date,
		default: Date.now
	}
}, {collection: 'user'})

UserSchema.pre('save', function(next) {
	if (this.isNew) {
		this.createTime = this.updateTime = Date.now()
	} else {
		this.updateTime = Date.now()
	}
	next()
})

const User = mongoose.model('user', UserSchema)

module.exports = User
