const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AppSchema = new Schema({
	id: {
		type: Number,
		unique: true,
		required: true
	},
	name: String,
	description: String,
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
}, {collection: 'application'})

AppSchema.pre('save', function(next) {
	if (this.isNew) {
		this.createTime = this.updateTime = Date.now()
	} else {
		this.updateTime = Date.now()
	}
	next()
})

const Application = mongoose.model('application', AppSchema)

module.exports = Application
