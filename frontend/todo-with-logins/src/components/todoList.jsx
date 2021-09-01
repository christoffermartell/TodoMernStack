import React, { useState, useEffect } from "react";

const TodoList = () => {
	return <form >
	<input
		type="text"
		className="form-control rounded-0"
		placeholder="Write your todo here"
	></input>
	<button
		className="form-control rounded-0 btn-secondary"
		type="submit"
	>
		Add Todo
	</button>
</form>
};

export default TodoList;
