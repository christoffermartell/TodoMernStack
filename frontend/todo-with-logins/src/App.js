import React, { useState, useEffect } from "react";
import TodoList from "./components/todoList";
import Title from "./components/title";
import todo from "./components/todo";
import AllTodos from "./components/allTodos";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Account } from "./components/views/Account";
import { Login } from "./components/views/Login";
import { Register } from "./components/views/Register";
import { Navbar } from "./components/general/Navbar";

function App() {
	// useEffect för att hämta från backend ( API )

	return (
		<Router>
			<Navbar />
			<Route exact path="/" component={AllTodos} />
			<Route exact path="/account" component={Account} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />

			<div className="container">
				{/* <Title /> */}
				{/* <TodoList setTodoInputs={setTodoInputs} /> */}
				{/* <AllTodos></AllTodos> */}
			</div>
		</Router>
	);
}

export default App;
