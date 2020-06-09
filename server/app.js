const Koa = require('koa')
const path = require('path')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const session = require('koa-session')
require('./db')

const config = require('./config')
const router = require('./router')

const app = new Koa()
const port = process.env.PORT || config.port

app.keys = ['some secret hurr']
const SESSION_CONFIG = {
	key: config.sessionName,
	maxAge: 86400000,
	autoCommit: true,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: false,
	renew: false,
	sameSite: null
}
app.use(session(SESSION_CONFIG, app))

onerror(app)
app.use(logger())
app.use(static('./assets'))
app.use(bodyparser())

app.use(router.routes())
app.use(router.allowedMethods())

const server = app.listen(port, () => {
	const host = server.address().address
	const port = server.address().port
	console.log(`server is starting at http://localhost:${port}`)
})

module.exports = app
