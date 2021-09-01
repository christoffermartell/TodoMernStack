import TodoList from "./components/todoList";
import Title from "./components/title";
import todo from "./components/todo";
import AllTodos from "./components/allTodos";

function App() {
	// useEffect för att hämta från backend ( API )

	return (
		<div className="container">
			<Title />
			<TodoList />
			<AllTodos></AllTodos>
		</div>
	);
}

export default App;
