const mongoose = require('mongoose')
const config = require('../config')

mongoose.set('useCreateIndex', true)
mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', () => {
	console.log('Connecting database successfully')
})

mongoose.connection.on('error', err => {
	console.error('Connecting database failed', err)
})

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose connection disconnected')
})

module.exports = mongoose
