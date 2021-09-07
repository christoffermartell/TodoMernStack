import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [activeUser, setActiveUser] = useState({ username: "" });
	const [isLoaded, setIsLoaded] = useState(false);

	const checkAuth = async () => {
		const data = await AuthService.isAuthenticated();
		setActiveUser(data.user);
		setIsAuthenticated(data.isAuthenticated);
		setIsLoaded(true);
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<div>
			{isLoaded ? (
				<AuthContext.Provider
					value={{
						isAuthenticated,
						setIsAuthenticated,
						activeUser,
						setActiveUser,
					}}
				>
					{children}
				</AuthContext.Provider>
			) : (
				<h1>Loading</h1>
			)}
		</div>
	);
};
export default AuthProvider;
