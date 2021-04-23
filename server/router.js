const fs = require("fs")

exports.route = function route(url, aliases, res) {

	const path = url.split("?")[0]
	const queryString = url.split("?")[1]
	let params = []

	if (queryString) {
		params = queryString.split("&").map(value => {
			let obj = {}
			obj[value.split("=")[0]] = value.split("=")[1]
			return obj
		})
	}

	let alias = aliases.find(obj => obj[url])
	alias = alias ? alias[path] : path;

	let segments = alias.split("/")
	let [, moduleName, functionName] = segments ///  HW1 !!!!!!!!!!

	if (fs.existsSync(`./modules/${moduleName}.js`)) {
		const moduleObject = require(`./modules/${moduleName}`)
		//res.end("dsalkjf lijlf jsalf jds")
		res.end(JSON.stringify(moduleObject[functionName](params)))
	} else {
		res.end("404 - NOT FOUND")
	}
}