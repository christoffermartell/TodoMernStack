const express = require("express");

//initialize express router
const router = express.Router();
const PostTodo = require("../models/PostTodo");
const UserModel = require("../models/UserModel");
const passport = require("passport");
const configPassport = require("../passport/passport"); // required to be able to access passport.js strategy logic even when it isn't used
const jwt = require("jsonwebtoken");

//-------------------------- TODOS BELOW WITHOUT LOGIN --------------------------//

// Add Todo
router.post("/newposttodo", (req, res) => {
	const newContent = new PostTodo({
		title: req.body.title,
		content: req.body.content,
		completed: req.body.completed,
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
	const _id = req.params.id;
	PostTodo.findById(_id, (err, todo) => {
		// object destructuring to only get title + content and not the entire object
		const { title, content, completed } = todo;
		if (err) {
			res.status(500).json({ message: "Internal server error" });
		} else {
			res.status(200).json({ title, content, completed });
		}
	});
});

router.put("/updatetodo/:id", (req, res) => {
	const { title, content, completed } = req.body;
	const _id = req.params.id;
	PostTodo.findByIdAndUpdate(_id, { title, content, completed }, (err) => {
		if (err) {
			res.status(500).json({ message: "An error occured updating" });
		} else {
			res.status(200).json({ message: "Post was successfully updated!" });
		}
	});
});

//Delete post route
router.delete("/deletetodo/:id", (req, res) => {
	const _id = req.params.id;
	PostTodo.findByIdAndDelete(_id, (err) => {
		if (err) {
			res.status(500).json({ message: "An error occured deleting" });
		} else {
			res.status(200).json({ message: "Post was successfully deleted!" });
		}
	});
});

// -------------------------- TODOS WITH LOGINS -------------------------- //

router.post(
	"/usersnewtodo",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const newTodo = new PostTodo(req.body);
		newTodo.save((err) => {
			if (err) {
				res.status(500).json({
					message: {
						msgBody:
							"An error occured while user posted a new todo",
						msgError: true,
					},
				});
			} else {
				req.user.postTodo.push(newTodo);
				req.user.save((err) => {
					if (err) {
						res.status(500).json({
							message: {
								msgBody: "an error occured saving new todo",
								msgError: true,
							},
						});
					} else {
						res.status(200).json({
							message: {
								msgBody: "Todo saved successfully",
								msgError: false,
							},
							isAuthenticated: true,
						});
					}
				});
			}
		});
	}
);

router.get(
	"/getusertodo",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		UserModel.findById({ _id: req.user.id })
			.populate("postTodo")
			.exec((err, user) => {
				if (err) {
					res.status(500).json({
						message: {
							msgBody: "An error occurred",
							msgError: true,
						},
					});
				} else {
					res.status(200).json({
						postTodo: user.postTodo,
						isAuthenticated: true,
						msgError: false,
					});
				}
			});
	}
);

// -------------------------- REGISTRATION, LOGIN -------------------------- //

const createJsonWebToken = (userId) => {
	return jwt.sign(
		{
			iss: "MERN",
			sub: userId,
		},
		"Studiegrupp6",
		{
			expiresIn: 60 * 60 * 24,
		}
	);
};

router.post("/registeruser", (req, res) => {
	const { username, password } = req.body;
	UserModel.findOne({ username }, (err, todoUser) => {
		if (err) {
			res.status(500).json({
				message: { msgBody: "An error occured", msgError: true },
			});
		}
		if (todoUser) {
			res.status(400).json({
				message: {
					msgBody: "This user already exists",
					msgError: true,
				},
			});
		} else {
			const newUser = new UserModel({ username, password });
			newUser.save((err) => {
				if (err) {
					res.status(500).json({
						message: {
							msgBody: "An error occured",
							msgError: true,
						},
					});
					// registration successfull
				} else {
					res.status(200).json({
						message: {
							msgBody: "User registered",
							msgError: false,
						},
					});
				}
			});
		}
	});
});

router.post(
	"/login",
	passport.authenticate("local", { session: false }),
	(req, res) => {
		if (req.isAuthenticated()) {
			const { _id, username } = req.user;
			const token = createJsonWebToken(_id);
			res.cookie("token-access", token, {
				httpOnly: true,
				sameSite: true,
			});
			res.status(200).json({
				isAuthenticated: true,
				user: { _id, username },
				message: {
					msgBody: "Successfully logged in",
					msgError: false,
				},
			});
		}
	}
);

router.get(
	"/authentication",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { _id, username } = req.user;
		res.status(200).json({
			isAuthenticated: true,
			user: { _id, username },
		});
	}
);
router.get(
	"/logout",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.clearCookie("token-access");
		res.status(200).json({
			user: { username: "" },
			message: { msgBody: "User has been logged out" },
			success: true,
		});
	}
);

module.exports = router;
