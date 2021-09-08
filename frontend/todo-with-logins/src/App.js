import React from "react";
import AllTodos from "./components/allTodos";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from "./hocs/PrivateRoute";
import { UnPrivateRoute } from "./hocs/UnPrivateRoute";
import { Account } from "./components/views/Account";
import { Login } from "./components/views/Login";
import { Register } from "./components/views/Register";
import { Navbar } from "./components/general/Navbar";
import About from "./components/views/About";

function App() {
	return (
		<Router className="container">
			<Navbar />
			<PrivateRoute exact path="/" component={AllTodos} />
			<PrivateRoute exact path="/account" component={Account} />
			<UnPrivateRoute exact path="/login" component={Login} />
			<UnPrivateRoute exact path="/register" component={Register} />
			<Route exact path="/about" component={About} />
		</Router>
	);
}

export default App;
