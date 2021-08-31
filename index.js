const express = require("express");
//Initialize express
const app = express();
const mongoose = require("mongoose");

//Middleware for parsing json data
app.use(express.json());

//connect to mongodb database
mongoose.connect(
	process.env.MONGODB_URI ||
		"mongodb+srv://Admin:qwerty123@todoapp.m5m8w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{
		useNewURLParser: true,
		useUnifiedTopology: true,
		autoIndex: true,
	},
	() => {
		console.log("Connected to databse");
	}
);
//import express router initialized in routes/api.js
const router = require("./routes/api");
app.use("/api", router);

//Set port variable
const PORT = process.env.port || 5000;

//Listen for requests on PORT variable
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
