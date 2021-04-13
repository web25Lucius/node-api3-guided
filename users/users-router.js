const express = require("express")
const users = require("./users-model")
const {checkUserData, checkUserID} = require('../middleware/user')
const router = express.Router()

router.get("/users", (req, res) => {
	const options = {
		sortBy: req.query.sortBy,
		limit: req.query.limit,
	}

	users.find(options)
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the users",
			})
		})
})

router.get("/users/:id", checkUserID, (req, res) => {
	res.json(req.user)
})

router.post("/users", checkUserData(), (req, res, next) => {
	
	

	users.add(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			next(error)
		})
})

router.put("/users/:id", (req, res, next) => {
	if (!req.body.name || !req.body.email) {
		return res.status(400).json({
			message: "Missing user name or email",
		})
	}

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

router.delete("/users/:id", (req, res) => {
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
			console.log(error)
			res.status(500).json({
				message: "Error removing the user",
			})
		})
})

router.get("/users/:id/posts", (req, res) => {
	users.findUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch(next)
		
})

router.get("/users/:id/posts/:postId", (req, res, next) => {
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
		.catch(next)
})

router.post("/users/:id/posts", (req, res, next) => {
	if (!req.body.text) {
		return res.status(400).json({
			message: "Need a value for text",
		})
	}

	users.addUserPost(req.params.id, req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch(next) 
})

module.exports = router