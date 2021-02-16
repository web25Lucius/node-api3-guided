module.exports = (format) => {
	return (req, res, next) => {
		const time = new Date().toISOString()

		if (format === "short") {
			console.log(`${time} ${req.method} ${req.url}`)
		}
		if (format === "long") {
			console.log(`[${time}] ${req.ip} ${req.method} ${req.url} ${req.socket.bytesRead}`)
		}

		next() // move on to the next piece of middleware, we are done here
	}
}