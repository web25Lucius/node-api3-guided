const express = require("express")
//const morgan = require("morgan") //call morgan
const welcomeRouter = require("./welcome/welcome-router")
const usersRouter = require("./users/users-router")
const logger = require('./middleware/logger')
const server = express()

//server.use(morgan("combined")) attach to middleware stack
server.use(logger("long"))
server.use(express.json())
server.use(welcomeRouter)
server.use(usersRouter)

server.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({
        message: "real wrong..something went -Yoda",
    })
})

module.exports = server