import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";

export const Navbar = () => {
	const { isAuthenticated, setIsAuthenticated, setActiveUser } =
		useContext(AuthContext);
	let history = useHistory();

	const logout = async () => {
		const data = await AuthService.logout();
		if (data.success) {
			setIsAuthenticated(false);
			setActiveUser(data.user);
			setIsAuthenticated(false);
			history.push("/login");
		}
	};

	const authNavbar = () => {
		return (
			<>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/account">Account</NavLink>
				<button onClick={logout}>Logout</button>
			</>
		);
	};

	const unAuthNavbar = () => {
		return (
			<>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/login">Login</NavLink>
				<NavLink to="/register">Register</NavLink>
			</>
		);
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				borderBottom: "1px solid Black",
				padding: "10px",
			}}
			className="navbar navbar-dark bg-dark"
		>
			{isAuthenticated ? authNavbar() : unAuthNavbar()}
		</div>
	);
};
