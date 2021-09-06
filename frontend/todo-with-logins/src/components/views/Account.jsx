import react, {useContext} from "react"
import { AuthContext } from "../../context/AuthContext"

export const Account = () =>{
    const {activeUser} = useContext(AuthContext);
    return (
        <>
        <h1>Account</h1>
        <p>Welcome {activeUser.username}</p>
        
        </>
    )
}