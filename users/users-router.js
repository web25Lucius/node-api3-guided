const express = require("express")
const users = require("./users-model")
const { checkUserID, checkUserData } = require("./users-middleware")

const router = express.Router()

router.get("/users", (req, res, next) => {
	const options = {
		sortBy: req.query.sortBy,
		limit: req.query.limit,
	}

	users.find(options)
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {
			// if next is called with a parameter, it's considered an error
			// and goes to the error middleware function. If next is called
			// without a parameter, it goes to the next piece of middleware.
			next(error)

			// console.log(error)
			// res.status(500).json({
			// 	message: "Error retrieving the users",
			// })
		})
})

router.get("/users/:id", checkUserID(), (req, res) => {
	// `user` gets attached to the request in `checkUserID`
	res.status(200).json(req.user)
})

router.post("/users", checkUserData(), (req, res) => {
	users.add(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			next(error)
		})
})

router.put("/users/:id", checkUserData(), checkUserID(), (req, res) => {
	users.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
})

router.delete("/users/:id", checkUserID(), (req, res) => {
	users.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
})

router.get("/users/:id/posts", checkUserID(), (req, res) => {
	users.findUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			next(error)
		})
})

router.get("/users/:id/posts/:postId", checkUserID(), (req, res) => {
	users.findUserPostById(req.params.id, req.params.postId)
		.then((post) => {
			if (post) {
				res.json(post)
			} else {
				res.status(404).json({
					message: "Post was not found",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
})

router.post("/users/:id/posts", checkUserID(), (req, res) => {
	if (!req.body.text) {
		return res.status(400).json({
			message: "Need a value for text",
		})
	}

	users.addUserPost(req.params.id, req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			next(error)
		})
})

module.exports = router