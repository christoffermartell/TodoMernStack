import React, { useState, useEffect } from "react";
import TodoService from "../services/TodoService";
import Title from "./title";
import Modal from "react-modal";
import Todo from "./todo";

const AllTodos = () => {
	const [todos, setTodos] = useState([]);
	const [postTodo, setPostTodo] = useState({
		title: "",
		content: "",
		completed: false,
	});
	const [editTodo, setEditTodo] = useState({
		title: "",
		content: "",
	});
	const [todoId, setTodoId] = useState("");
	const [modalIsOpen, setModalIsOpen] = useState(false);

	Modal.setAppElement(document.getElementById("root"));

	const openModal = (title, content, id) => {
		setModalIsOpen(true);
		setEditTodo({
			title: title,
			content: content,
		});
		setTodoId(id);
	};

	const closeModal = () => {
		setModalIsOpen(false);
		setEditTodo({
			title: "",
			content: "",
		});
	};

	const customStyles = {
		content: {
			margin: "auto",
			marginTop: "1rem",
			maxHeight: "40%",
			minWidth: "50%",
			maxWidth: "70%",
		},
	};

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

	const handleUpdateFinished = (e, id) => {
		const isChecked = e.target.checked;
		updateFinished(isChecked, id);
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

	const handleModalInput = (e) => {
		setEditTodo({ ...editTodo, [e.target.name]: e.target.value });
	};

	const updateTodo = async (e) => {
		e.preventDefault();
		const data = await TodoService.updateTodo(editTodo, todoId);
		if (data && !data.message.msgError) {
			const data = await TodoService.getPostedTodos();
			if (data && !data.msgError) {
				setTodos(data.postTodo);
				setTodoId("");
				closeModal();
			}
		}
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
						<div
							key={posts._id}
							style={{
								textDecoration: posts.completed
									? "line-through"
									: "",
							}}
						>
							<h4 className="text-dark text-center p-1 bg-light border-bottom ">
								{posts.title}
								<i
									className="far fa-times-circle fa-sm m-1 text-danger float-start"
									onClick={() => deleteTodo(posts._id)}
								></i>
								<i
									className="fa fa-pencil-square-o fa-sm m-1 float-end"
									aria-hidden="true"
									onClick={() =>
										openModal(
											posts.title,
											posts.content,
											posts._id
										)
									}
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

				<Modal isOpen={modalIsOpen} style={customStyles}>
					<h1>Edit todo</h1>
					<form onSubmit={updateTodo}>
						<input
							onChange={handleModalInput}
							value={editTodo.title}
							name="title"
							type="text"
							className="form-control rounded-0 mx-1 my-2"
							placeholder="Title"
						></input>
						<input
							onChange={handleModalInput}
							value={editTodo.content}
							name="content"
							type="text"
							className="form-control rounded-0 m-1 mb-3"
							placeholder="Todo text"
						></input>
						<button
							className="btn btn-danger m-1 float-end"
							onClick={closeModal}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="btn btn-success m-1 float-end"
						>
							Save
						</button>
					</form>
				</Modal>
			</div>
		</div>
	);
};

export default AllTodos;
