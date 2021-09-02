import React, { useState, useEffect } from "react";
import TodoList from "./components/todoList";
import Title from "./components/title";
import todo from "./components/todo";
import AllTodos from "./components/allTodos";

function App() {
	// useEffect för att hämta från backend ( API )

	const [todoInputs, setTodoInputs] = useState([]);

	return (
		<div className="container">
			<Title />
			<TodoList setTodoInputs={setTodoInputs} />
			<AllTodos todoInputs={todoInputs} ></AllTodos>
		</div>
	);
}

export default App;
