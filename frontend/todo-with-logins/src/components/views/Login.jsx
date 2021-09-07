import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";

export const Login = () => {
	const [userState, setUserState] = useState({ username: "", password: "" });
	const { setIsAuthenticated, setActiveUser } = useContext(AuthContext);
	let history = useHistory();

	const changeUserData = (e) => {
		setUserState({ ...userState, [e.target.name]: e.target.value });
	};

	const loginUser = async (e) => {
		e.preventDefault();
		const data = await AuthService.login(userState);
		const { isAuthenticated, user } = data;

		if (isAuthenticated) {
			setIsAuthenticated(isAuthenticated);
			setActiveUser(user);
			history.push("/account");
		}
	};

	return (
		<div style={{ maxWidth: "60rem", textAlign: "center", margin: "auto" }}>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				<input
					type="text"
					name="username"
					placeholder="Username"
					onChange={changeUserData}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={changeUserData}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
