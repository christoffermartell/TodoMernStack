import react, {useState} from "react"
import {useHistory} from "react-router-dom"
import AuthService from "../../services/AuthService"

export const Register = () => {

    const [user,setUser] = useState({username:"", password:""})
    //  const history = useHistory()

    const changeUserData = (e) =>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const registerNewUser = async (e) => {
        e.preventDefault();
        const data = await AuthService.register(user);
        const { message } = data
        if(!message.msgError){
            alert("Registered: " + JSON.stringify(user))
        //      history.push("/login");
        }

        
       
    }

    return (
        <>
        <h1>Register</h1>
        <form onSubmit={registerNewUser}> 
            <input type="text"name="username" placeholder="Username" onChange={changeUserData}/>
            <input type="password"name="password" placeholder="Password"onChange={changeUserData}/>
            <button type="submit">Submit</button>
        </form>
        
        </>
    )
}