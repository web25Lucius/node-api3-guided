function deny() {
	return (req, res, next) => {
		// 50/50 chance of getting denied
		if (Math.random() < 0.5) {
			next()
		} else {
			res.status(418).json({
				message: "You shall not pass",
			})
		}
	}
}

module.exports = {
	deny,
}