const express = require("express")
const morgan = require("morgan")
const { deny } = require("./middleware")
const welcomeRouter = require("./welcome/welcome-router")
const usersRouter = require("./users/users-router")

const server = express()
const port = 4000

// takes incoming request JSON data and parses it into `req.body`
server.use(express.json())

// give the client a 50/50 chance of receiving an error
// server.use(deny())

// third-party middleware that will log a line to the console with request details
// server.use(morgan("combined"))
server.use((req, res, next) => {
	const time = new Date().toISOString()
	console.log(`[${time}] ${req.ip} ${req.method} ${req.url}`)

	// this middleware function is done, move on to the next piece of middleware in the stack
	next()
})

server.use(welcomeRouter)
server.use(usersRouter)

// express knows this is error handling middleware,
// since it's definining four parameters instead of three
server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong, please try again later.",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
