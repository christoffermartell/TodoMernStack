const TodoService = {
	getPostedTodos: async () => {
		try {
			const res = await fetch("/api/gettodos");
			if (res.status !== 401) {
				const data = await res.json();
				return data;
			} else {
				return {
					message: {
						msgBody:
							"Something went sideways fetching posted todos",
						msgError: true,
					},
				};
			}
		} catch (error) {
			return { error: error };
		}
	},
	newTodo: async (todo) => {
		try {
			const res = await fetch("/api/newposttodo", {
				method: "post",
				body: JSON.stringify(todo),
				headers: {
					"Content-type": "application/json",
				},
			});
			if (res.status !== 401) {
				const data = await res.json();
				return data;
			} else {
				return {
					message: {
						msgBody: "Unable to create new post",
						msgError: true,
					},
				};
			}
		} catch (error) {
			return { error: error };
		}
	},
	deleteTodo: async (id) => {
		try {
			const res = await fetch(`/api/deletetodo/${id}`, {
				method: "delete",
			});
			if (res.status !== 401) {
				const data = await res.json();
				return data;
			} else {
				return {
					message: {
						msgBody: "Something went wrong while deleting the todo",
						msgError: true,
					},
				}
			}
		} catch (error) {
			return { error: error };
		}
	},
	updateFinished: async (isChecked, id) => {
		try {
			const res = await fetch(`/api/updatetodo/${id}`, {
				method: "put",
				body: JSON.stringify({
					completed: isChecked,
				}),
				headers: {
					"Content-type": "application/json",
				},
			});
			if (res.status !== 401) {
				const data = await res.json();
				return data;
			} else {
				return {
					message: {
						msgBody: "Something went wrong while updating the todo",
						msgError: true,
					},
				};
			}
		} catch (error) {
			return { error: error };
		}
	},
};

export default TodoService;
