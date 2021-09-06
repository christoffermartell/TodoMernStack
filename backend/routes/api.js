const express = require("express");

//initialize express router
const router = express.Router();
const PostTodo = require("../models/PostTodo");
const UserModel = require("../models/UserModel");
const passport = require("passport");
const configPassport = require("../passport/passport"); // required to be able to access passport.js strategy logic even when it isn't used
const jwt = require("jsonwebtoken");

// -------------------------- TODOS WITH LOGINS -------------------------- //
// create new todo for user
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
// all users todo posts
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

// Get a specific Todo // funkar men lite skevt i säkerheten ORIGINAL, DENNA FUNKAR - RÖR INTE DENNA
router.get(
	"/getspecificusertodo/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
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
	}
);

// edit / update todo post
router.put(
	"/updatetodo/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { title, content, completed } = req.body;
		const _id = req.params.id;
		PostTodo.findByIdAndUpdate(
			_id,
			{ title, content, completed },
			(err) => {
				if (err) {
					res.status(500).json({
						message: {
							msgBody: "An error occured updating",
							msgError: true,
						},
					});
				} else {
					res.status(200).json({
						message: {
							msgBody: "Post was successfully updated!",
							msgError: false,
						},
					});
				}
			}
		);
	}
);

//Delete post
router.delete(
	"/deletetodo/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const _id = req.params.id;
		PostTodo.findByIdAndDelete(_id, (err) => {
			if (err) {
				res.status(500).json({ message: "An error occured deleting" });
			} else {
				res.status(200).json({
					message: "Post was successfully deleted!",
				});
			}
		});
	}
);

// -------------------------- REGISTRATION, LOGIN, AUTHENTICATION, LOGOUT -------------------------- //

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
