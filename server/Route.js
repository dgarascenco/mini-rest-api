module.exports.Route = class Route {
	constructor(path) {
		this.path = path.split("?")[0]

		this.parameters = []
		if (path.indexOf('?') > -1) {
			let array = (path.split("?")[1]).split("&")
			let parameter = {};
			for (let i = 0; i < (path.split("?")[1]).split("&").length; i++) {
				parameter[array[i].split("=")[0]] = array[i].split("=")[1]
				this.parameters.push(parameter)
			}
		}
	}

	hasParam(name) {
		if (this.parameters.find(obj => {
			return (name in obj)
		}) == undefined)
			return false
		return true
	}

	getParam(name) {
		let value = null
		this.parameters.find(obj => {
			if ((name in obj) != undefined) {
				value = obj[name]
			}
		})

		if (value == undefined)
			return null
		else
			return value
	}

	getPath() {
		return this.path
	}

	isPath(path) {
		if (this.path == path)
			return true
		return false
	}
}