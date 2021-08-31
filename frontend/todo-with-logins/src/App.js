import TodoList from "./components/todoList";
import Title from "./components/title";
function App() {
	// useEffect för att hämta från backend ( API )

	return (
		<div className="container">
			<TodoList />
			<Title />
		</div>
	);
}

export default App;
