const http = require("http")
const fs = require("fs")
const { route } = require('./router')
const { host, port, acces_key } = require("./config.json")
// route config
const routeAliases = [
	{ "/products": "/products/all" },
	{ "/clients": "/cleints/all" },
]




const server = http.createServer(({ url }, res) => {
	if (url == "/favicon.ico") return res.end();
	route(url, routeAliases, res)
})

server.listen(port, host, () => {
	console.log(`> Server running http://${host}:${port}`)
})