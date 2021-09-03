import React, { useState, useEffect } from "react";
import Todo from "./todo";
import TodoService from "../services/TodoService";

const AllTodos = (props) => {
	const todoInputs = props.todoInputs;

	const [todos, setTodos] = useState([]);

	const getPostedTodos = async () => {
		const data = await TodoService.getPostedTodos();
		if (data && data.todos) {
			console.log("data.todos:  ", data.todos);
			setTodos(data.todos);
		}
	};

	useEffect(() => {
		getPostedTodos();
	}, []);
	console.log("todos useState", todos);
	return (
		<div>
			{todoInputs.map((todo, i) => (
				<Todo key={i} todo={todo} deleteTodo={props.deleteTodo} />
			))}
			<h3>database todos</h3>
			<div>
				{todos.map((posts) => {
					return (
						<div key={posts._id}>
							<h4>{posts.title}</h4>
							<p>{posts.content}</p>
							<p>{posts.completed}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AllTodos;
