exports.echoAction = function echoAction(params) {
	console.log(params)
	return `{ 'echo': ${params.find(obj => obj['name']).name} }`
}
exports.pingAction = function pingAction(params = null) {

	return `{ 'active': true }`
}