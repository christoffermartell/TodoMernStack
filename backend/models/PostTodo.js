const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: 3,
		},
		content: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			required: true,
		},
	},

	{
		timestamps: true,
	}
);
module.exports = mongoose.model("PostTodo", TodoSchema);
