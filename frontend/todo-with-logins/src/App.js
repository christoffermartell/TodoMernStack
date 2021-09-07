import React, { useState, useEffect } from "react";
import TodoList from "./components/todoList";
import Title from "./components/title";
import todo from "./components/todo";
import AllTodos from "./components/allTodos";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from "./hocs/PrivateRoute";
import { UnPrivateRoute } from "./hocs/UnPrivateRoute";

import { Account } from "./components/views/Account";
import { Login } from "./components/views/Login";
import { Register } from "./components/views/Register";
import { Navbar } from "./components/general/Navbar";

function App() {
	return (
		<Router className="container">
			<Navbar />
			<PrivateRoute exact path="/" component={AllTodos} />
			<PrivateRoute exact path="/account" component={Account} />
			<UnPrivateRoute exact path="/login" component={Login} />
			<UnPrivateRoute exact path="/register" component={Register} />
		</Router>
	);
}

export default App;
