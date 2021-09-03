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
};

export default TodoService;
