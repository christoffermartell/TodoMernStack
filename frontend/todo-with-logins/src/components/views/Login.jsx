import React, {useState,useContext} from "react"
import {useHistory} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"
import AuthService from "../../services/AuthService"

export const Login = () => {

    const [userState,setUserState] = useState({username:"", password:""})
    const { setIsAuthenticated, setActiveUser} = useContext(AuthContext)
   //   const history = useHistory()

    const changeUserData = (e) =>{
        setUserState({...userState,[e.target.name]:e.target.value});
    }

    const loginUser = async (e) => {
        e.preventDefault();
        const data = await AuthService.login(userState);
        const { isAuthenticated,user} = data;
        console.log(data);
        
        if(isAuthenticated){
        setIsAuthenticated(isAuthenticated)
        setActiveUser(user);
        alert("Logged in: " + JSON.stringify(user))
    //     history.push("/account");
        }
        
        
    }

    return (
        <>
        <h1>Login</h1>
        <form onSubmit={loginUser}> 
            <input type="text"name="username" placeholder="Username" onChange={changeUserData}/>
            <input type="password"name="password" placeholder="Password"onChange={changeUserData}/>
            <button type="submit">Submit</button>
        </form>
        
        </>
    )
}