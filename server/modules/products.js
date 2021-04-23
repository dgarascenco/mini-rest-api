const fs = require("fs")
const products = JSON.parse(fs.readFileSync("./data/products.json"))

exports.all = function (params) {
	console.log(products)

	let sort = params.find(obj => obj['sort'])['sort']
	let dir = params.find(obj => obj['dir'])['dir']

	return products.sort(function (a, b) {
		if (a[sort] > b[sort]) {
			if (dir == 'asc')
				return 1;
			else if (dir == 'desc')
				return -1;
		}
		if (a[sort] < b[sort]) {
			if (dir == 'asc')
				return -1;
			else if (dir == 'desc')
				return 1;
		}
		return 0;
	});

	//console.log(products)

}
exports.details = function (params) {
	console.log(params)
	let id = params.find(obj => obj['id'])
	console.log(id)
	if (id.id == "1") {
		return "p1"
	}
	if (id.id == "2") {
		return "p2"
	}

	return "no such product"
}
exports.delete = function () {
	return "delete p1"
}
exports.save = function () {
	return "saved new product"
}