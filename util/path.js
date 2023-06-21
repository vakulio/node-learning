const path = require('path');

module.exports = path.dirname(process.mainModule.filename);


exports.errHeandling = (err) => {
	const error = new Error(err)
	error.httpStatusCode = 500
	return error
}