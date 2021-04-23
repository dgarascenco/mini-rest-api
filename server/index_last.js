const { Route } = require('./Route2.js')
const { readHTMLPage, readJSONFile } = require('./files.js')
const { host, port, acces_key } = require("./config.json")

const http = require("http")
const fs = require("fs")

const server = http.createServer(({ url }, res) => {

	const route = new Route(url)
	console.log(route)
	//	routing
	if (route.isPath("/")) {
		const html = readHTMLPage("index", (content) => {
			res.end(content)
		})
	} else if (route.getPath().startsWith("/api/")) {

		let path = route.getPath()
		let key = route.getParam('key')
		//console.log("!!!!!!!!hasParam", route.hasParam('key'))
		console.log("!!!!!!!!getParam", route.getParam('key'))

		//route.hasParam('key1')
		if (key != acces_key) {
			return res.end("ACCES DENIED")
		}

		if (path.endsWith("/products/all")) {

			readJSONFile("products", (data) => {
				console.log(data)
				res.end(JSON.stringify(data))
			})

		} else if (path.endsWith("/products/category")) {

			readJSONFile("products", (data) => {

				const products = JSON.parse(fs.readFileSync("./server/data/products.json"))
				const productsFiltered = []
				for (let i = 0; i < products.length; i++) {

					if (products[i].category == "Category 1") {
						productsFiltered.push(products[i])
					}
				}
				res.end(JSON.stringify(productsFiltered))
			})
		} else {
			res.end("API NOT FOUND!")
		}
	} else {
		res.end("404! NOT FOUND!")
	}
	console.log(`> Server: incoming REQUEST ${route.getPath()}`)
})

server.listen(port, host, () => {
	console.log(`> Server running http://${host}:${port}`)
})