const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/UserModel");

// setup what we will name our cookie on login
const accessCookie = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["token-access"];
	}
	return token;
};

passport.use(
	new jwtStrategy(
		{ jwtFromRequest: accessCookie, secretOrKey: "Studiegrupp6" },

		(payload, done) => {
			UserModel.findById({ _id: payload.sub }, (err, user) => {
				// error occurred
				if (err) {
					return done(err);
				}
				// User doesn't exist or wrong credentials given
				if (!user) {
					return done(null, false);
				}
				return done(null, user);
			});
		}
	)
);

passport.use(
	new localStrategy((username, password, done) => {
		UserModel.findOne({ username }, (err, user) => {
			// some error occurred
			if (err) {
				return done(err);
			}
			// user doesn't exist
			if (!user) {
				return done(null, false);
			}
			// username exists, compare passwords
			user.comparePassword(password, done);
		});
	})
);
