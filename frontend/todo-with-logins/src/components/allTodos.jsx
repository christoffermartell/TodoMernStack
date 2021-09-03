import React, { useState, useEffect } from "react";
import Todo from "./todo";
import TodoService from "../services/TodoService";

const AllTodos = (props) => {
	const todoInputs = props.todoInputs;

	const [todos, setTodos] = useState([]);
	const [postTodo, setPostTodo] = useState({
		title:"",
		content:"",
		completed: false

	})

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
//	console.log("todos useState", todos);



	const handleInput = (e) =>{
	setPostTodo({...postTodo, [e.target.name]: e.target.value});
};


	const saveTodo = async (e) => {
		e.preventDefault();
		const data = await TodoService.newTodo(postTodo);
		if(data && !data.message.msgError){
		const data = await TodoService.getPostedTodos();
		if (data && !data.msgError) {
		setTodos(data.todos)
		}
	}
}
	 
	return (
		<div>
		<form onSubmit={saveTodo} >
	<input required onChange={handleInput}
		value={todos.title}
		name="title"
		type="text"
		className="form-control rounded-0"
		placeholder="Title"
		id="todoInputField"
	></input>
	<input required onChange={handleInput}
		value={todos.content}
		name="content"
		type="text"
		className="form-control rounded-0"
		placeholder="Write your todo here"
	>
	</input>
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
							<h4 className="text-dark text-center p-1 bg-light border-bottom " >{posts.title}
							<i className="far fa-times-circle fa-sm  m-1 text-danger float-start" onClick={() => props.deleteTodo(todos)}></i>            				
							 <input
                				type="checkbox"
               					className="m-2 float-end">
            				</input>
							
							</h4>
							<p >{posts.content}</p>
							<p >{posts.completed}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AllTodos;
