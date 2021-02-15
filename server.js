const express = require("express")
const welcomeRouter = require("./welcome/welcome-router")
const usersRouter = require("./users/users-router")

const server = express()

server.use(express.json())
server.use(welcomeRouter)
server.use(usersRouter)

module.exports = server