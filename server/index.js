const { Route } = require('./Route.js')
const http = require("http")
const { host, port, acces_key } = require("./config.json")

const fs = require("fs")


let path = "/some/path?parameter1=value1&parameter2=value2"
let route = new Route(path)

function readHTMLPage(path, cb) {

	fs.readFile(`./server/public/${path}.html`, 'utf8', function (error, data) {
		if (error) {
			return console.log(`The ${path} was not found!`);
		}
		cb(data)
	})
}

function readJSONFile(name, cb) {

	fs.readFile(`./server/data/${name}.json`, 'utf8', function (error, data) {
		if (error) {
			return console.log(`The ${name} was not found!`);
		}
		cb(JSON.parse(data))
	})
}

readHTMLPage("index", (content) => { console.log(content) })
readJSONFile("products", (data) => { console.log(data) })


const server = http.createServer(({ url }, res) => {

	if (url == "/") {

		const html = fs.readFileSync("./server/public/index.html")
		res.end(html)

	} else if (url.startsWith("/api/")) {

		let path = url.split("?")[0]
		let params = (url.split("?")[1]).split("&")
		let key = params[0].split("=")[1]

		if (key != acces_key) {
			return res.end("ACCES DENIED")
		}

		if (path.endsWith("/products/all")) {

			const products = fs.readFileSync("./server/data/products.json")
			res.end(products)

		} else if (path.endsWith("/products/category")) {

			const products = JSON.parse(fs.readFileSync("./server/data/products.json"))
			const productsFiltered = []

			for (let i = 0; i < products.length; i++) {

				if (products[i].category == "Category 1") {
					productsFiltered.push(products[i])
				}
			}
			res.end(JSON.stringify(productsFiltered))
		} else {
			res.end("API NOT FOUND!")
		}

		res.end("API")

	} else {
		res.end("404! NOT FOUND!")
	}
	console.log(`> Server: incoming REQUEST ${url}`)
	res.end("OK")
})

server.listen(port, host, () => {
	console.log(`> Server running http://${host}:${port}`)
})