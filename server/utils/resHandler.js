module.exports = function(data, err) {
	if (err) {
		return {
			code: -1,
			data: null,
			msg: err
		}
	}
  return {
  	code: 200,
  	data: data,
  	msg: 'success'
  }
}
