import React from "react";

const SubmitTodo = ({ saveTodo, handleInput, postTodo }) => {
    return(
        <div>
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
        </div>
    )
}

export default SubmitTodo;