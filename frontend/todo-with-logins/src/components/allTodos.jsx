import React, { useState, useEffect } from "react";
import TodoService from "../services/TodoService";
import Title from "./title";
import Modal from "react-modal";
import Todo from "./todo";
import ModalContent from "./modalContent";
import SubmitTodo from "./submitTodo";

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
			<SubmitTodo
				saveTodo={saveTodo}
				handleInput={handleInput}
				postTodo={postTodo}
			></SubmitTodo>

			<div>
				{todos.map((posts, i) => (
					<Todo
						key={i}
						posts={posts}
						deleteTodo={deleteTodo}
						openModal={openModal}
						handleUpdateFinished={handleUpdateFinished}
					></Todo>
				))}

				<Modal isOpen={modalIsOpen} style={customStyles}>
					<ModalContent
						updateTodo={updateTodo}
						handleModalInput={handleModalInput}
						editTodo={editTodo}
						closeModal={closeModal}
					></ModalContent>
				</Modal>
			</div>
		</div>
	);
};

export default AllTodos;
