const express = require("express");

//initialize express router
const router = express.Router();
const PostTodo = require("../models/PostTodo");

// Add Todo
router.post("/newposttodo", (req, res) => {
	const newContent = new PostTodo({
		title: req.body.title,
		content: req.body.content,
	});
	newContent.save((err) => {
		if (err) {
			res.status(500).json({ message: "Internal server error" });
		} else {
			res.status(200).json({ message: "Succesfully posted" });
		}
	});
});

// Get all Todos
router.get("/gettodos", (req, res) => {
	PostTodo.find({}, (err, todos) => {
		if (err) {
			res.status(500).json({ message: "Internal server error" });
		} else {
			res.status(200).json({ todos });
		}
	});
});

// Get a specific Todo
router.get("/gettodo/:id", (req, res) => {
	const { title, content } = req.body;
	const _id = req.params.id;
	PostTodo.findById(_id, { title, content }, (err) => {
		if (err) {
			res.status(500).json({ message: "Internal server error" });
		} else {
			res.status(200).json({ content });
		}
	});
});
/*
//Update post route
router.put("/updatepost/:id", (req, res) => {
	const { title, content } = req.body;
	const _id = req.params.id;
	Post.findByIdAndUpdate(_id, { title, content }, (err) => {
		if (err) {
			res.status(500).json({ message: "An error occured updating" });
		} else {
			res.status(200).json({ message: "Post was successfully updated!" });
		}
	});
});

//Delete post route
router.delete("/deletepost/:id", (req, res) => {
	const _id = req.params.id;
	Post.findByIdAndDelete(_id, (err) => {
		if (err) {
			res.status(500).json({ message: "An error occured deleting" });
		} else {
			res.status(200).json({ message: "Post was successfully deleted!" });
		}
	});
});
*/

module.exports = router;
