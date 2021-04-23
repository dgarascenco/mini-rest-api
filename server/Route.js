exports.Route = class Route {

	static routes = []

	static add(route) {
		this.routes.push(route)
	}

	// method that resolves the ROUTING process
	static resolve(url, cb) {

		if (url == "/ping") {
			return cb(pingAction)

		} else if (url.split("?")[0] == "/echo") {

			let params = url.split("?")[1].split("&").map(value => {
				let obj = {}
				obj[value.split("=")[0]] = value.split("=")[1]
				return obj
			})
			return cb(echoAction.bind(this, params))

		} else {

			return cb(() => {
				return `{ "status": 404 }`
			})

		}
	}

}
function echoAction(params) {
	return `{ "echo": ${params.find(obj => obj['name']).name} }`
}
function pingAction() {
	return `{ "active": true }`
}