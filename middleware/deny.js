module.exports = () => {
	return (req, res, next) => {
		// a header value from the request that tells us
		// which software was used to call the endpoint
		const agent = req.headers["user-agent"]

		// if the user agent contains the value "insomnia" in it
		if (/insomnia/.test(agent)) {
			return res.status(418).json({
				message: "No Insomnia allowed here",
			})
		}

		next()
	}
}
