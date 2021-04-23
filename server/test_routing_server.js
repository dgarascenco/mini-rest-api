const http = require("http")
const { host, port, access_key } = require("./config")

const { Route } = require('./route')
const server = http.createServer(({ url }, res) => {

	Route.resolve(url, (action) => {    // < this is the cb()
		res.end(action())
	})

})

server.listen(port, host, () => {
	console.log(`> TEST Server running http://${host}:${port}`)
})