const express = require("express")
const morgan = require("morgan")
const logger = require("./middleware/logger")
const deny = require("./middleware/deny")
const welcomeRouter = require("./welcome/welcome-router")
const usersRouter = require("./users/users-router")

const server = express()
const port = 4000

server.use(express.json())
// install the Morgan middleware using the "combined" format
// server.use(morgan("combined"))

// put this above the logger so error requests are not logged
// server.use(deny())

// mimick the functionality of Morgan with custom middleware
server.use(logger())

server.use(welcomeRouter)
server.use(usersRouter)

// error middleware that "catches" any errors from other middleware functions
server.use((err, req, res, next) => {
	// log the error and return a generic response to avoid the risk
	// of leaking sensitive info that might be in the error
	console.log(err)

	res.status(500).json({
		message: "Something went wrong, try again later",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
