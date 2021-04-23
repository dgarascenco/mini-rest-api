const fs = require("fs")
exports.Route = class Route {

	static routes = []

	static add(route) {
		this.routes.push(route)
	}

	// method that resolves the ROUTING process
	static resolve(url, cb) {

		let schema = this.routes[0]
		let params = []
		/// если в url существуют параметры
		if (url.split("?").length > 1) {

			schema = this.routes[
				this.routes.findIndex(obj => obj.path === url.split("?")[0])
			];

			params = url.split("?")[1].split("&").map(value => {
				let obj = {}
				obj[value.split("=")[0]] = value.split("=")[1]
				return obj
			})
		}

		if (fs.existsSync(`./modules/${schema.module}.js`)) {
			const moduleObject = require(`./modules/${schema.module}`)
			cb(moduleObject[schema.action], params)
		} else {
			return cb(() => {
				return `{ "status": 404 }`
			})
		}

	}

}