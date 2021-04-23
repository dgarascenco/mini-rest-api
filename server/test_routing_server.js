const http = require("http")
const { host, port, access_key } = require("./config")

const { Route } = require('./route')
Route.add({ path: "/ping", module: "status", action: "pingAction" })
Route.add({ path: "/echo", module: "status", action: "echoAction" })
const server = http.createServer(({ url }, res) => {

	Route.resolve(url, (action, params) => {    // < this is the cb()
		console.log("action", action)
		res.end(action(params))
	})

})

server.listen(port, host, () => {
	console.log(`> TEST Server running http://${host}:${port}`)
})