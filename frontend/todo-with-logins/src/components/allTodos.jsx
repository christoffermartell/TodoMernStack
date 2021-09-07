import React, { useState, useEffect } from "react";
import Todo from "./todo";
import TodoService from "../services/TodoService";
import Title from "./title";

const AllTodos = () => {
	const [todos, setTodos] = useState([]);
	const [postTodo, setPostTodo] = useState({
		title: "",
		content: "",
		completed: false,
	});

	const getPostedTodos = async () => {
		const data = await TodoService.getPostedTodos();
		if (data && data.postTodo) {
			setTodos(data.postTodo);
		}
	};

	useEffect(() => {
		getPostedTodos();
	}, []);

	const handleInput = (e) => {
		setPostTodo({ ...postTodo, [e.target.name]: e.target.value });
	};

	const saveTodo = async (e) => {
		e.preventDefault();
		const data = await TodoService.newTodo(postTodo);
		if (data && !data.message.msgError) {
			const data = await TodoService.getPostedTodos();
			if (data && !data.msgError) {
				setTodos(data.postTodo);
				resetFormFields();
			}
		}
	};

	const resetFormFields = () => {
		setPostTodo({
			title: "",
			content: "",
			completed: false,
		});
	};

	const deleteTodo = async (id) => {
		const data = await TodoService.deleteTodo(id);
		if (data && !data.message.msgError) {
			const data = await TodoService.getPostedTodos();
			if (data && !data.msgError) {
				setTodos(data.postTodo);
			}
		}
	};

	const updateFinished = async (isChecked, id) => {
		const data = await TodoService.updateFinished(isChecked, id);
		if (data && !data.message.msgError) {
			const data = await TodoService.getPostedTodos();
			if (data && !data.msgError) {
				setTodos(data.postTodo);
			}
		}
	};

	const handleUpdateFinished = (e, id) => {
		const isChecked = e.target.checked;
		updateFinished(isChecked, id);
	};

	return (
		<div style={{ maxWidth: "60rem", textAlign: "center", margin: "auto" }}>
			<Title></Title>
			<form onSubmit={saveTodo}>
				<input
					required
					onChange={handleInput}
					value={postTodo.title}
					name="title"
					type="text"
					className="form-control rounded-0"
					placeholder="Title"
					id="todoInputField"
				></input>
				<input
					required
					onChange={handleInput}
					value={postTodo.content}
					name="content"
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

			<div>
				{todos.map((posts) => {
					return (
						<div key={posts._id}>
							<h4 className="text-dark text-center p-1 bg-light border-bottom ">
								{posts.title}
								<i
									className="far fa-times-circle fa-sm  m-1 text-danger float-start"
									onClick={() => deleteTodo(posts._id)}
								></i>
								<input
									defaultChecked={posts.completed}
									onChange={(e) =>
										handleUpdateFinished(e, posts._id)
									}
									type="checkbox"
									className="m-2 float-end"
								></input>
							</h4>
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
