const express = require("express")
// const morgan = require("morgan")
const logger = require("./middleware/logger")
const welcomeRouter = require("./welcome/welcome-router")
const usersRouter = require("./users/users-router")

const server = express()

server.use(express.json())
// server.use(morgan("combined"))
server.use(logger("short"))

server.use(welcomeRouter)
server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong, please try again later",
	})
})

module.exports = server