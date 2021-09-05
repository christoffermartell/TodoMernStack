const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	postTodo: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "PostTodo",
		},
	],
});

// triggers when a user is created but also while existing user logs in and new todos are saved to the users account
UserSchema.pre("save", function (next) {
	// existing users new todos are saved and the password isn't modified
	if (!this.isModified("password")) {
		return next();
	}
	// new users password is hashed
	bcrypt.hash(this.password, 10, (err, hashedPassword) => {
		// if error occurs we send it back to know what went wrong
		if (err) {
			return next(err);
		} else {
			this.password = hashedPassword;
			next();
		}
	});
});

// called from passport.js ( localstrategy ) comparing passwords when user attempts to log in
UserSchema.methods.comparePassword = function (password, returnValue) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		// error occured
		if (err) {
			return returnValue(err);
		}
		// password is not a match
		if (!isMatch) {
			return returnValue(null, isMatch);
		}
		// successfull login
		return returnValue(null, this);
	});
};

module.exports = mongoose.model("UserModel", UserSchema);
