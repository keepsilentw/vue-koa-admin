const { resHandler } = require('../utils')

const userLogin = async(ctx) => {
	let username = ctx.request.body.username
	let password = ctx.request.body.password

	if (username === 'admin') {
		ctx.status = 200
		ctx.session.username = username
		ctx.cookies.set('username', username, {httpOnly: false, signed: true})
		console.log(ctx.session)
		ctx.body = resHandler(true)
	} else {
		ctx.body = resHandler(null, 'login failed!')
	}
}

const userLogout = async(ctx) => {
	ctx.status = 200
	ctx.cookies.set('username', null)
	ctx.session = null
	ctx.body = resHandler(true)
}

module.exports = {
	userLogin,
	userLogout
}
