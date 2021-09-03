// import React, { useState } from "react";

// const TodoList = ({setTodoInputs}) => {

// 	const [todo, setTodo] = useState("");

// 	const submitInput = (e) => {
// 		e.preventDefault();

// 		setTodoInputs((prevTodoInputs) => {
// 			return [...prevTodoInputs, todo];
// 		});
// 		setTodo("");
// 	}


// 	return <form onSubmit={submitInput} >
// 	<input
// 		type="text"
// 		className="form-control rounded-0"
// 		placeholder="Write your todo here"
// 		id="todoInputField"
// 		onChange={(e) => setTodo(e.target.value)}
// 		value={todo}
// 	></input>
// 	<button
// 		className="form-control rounded-0 btn-secondary"
// 		type="submit"
// 	>
// 		Add Todo
// 	</button>
// </form>
// };

// export default TodoList;
