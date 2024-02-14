import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import {logIn} from "../utils/users"
import {REGISTER} from "../config/routes"
import {ALL_USERS, CUR_USER} from "../config/localStorage"

function Login() {
    //Insures current user variable is entered if the user goes back to login
    localStorage.setItem(CUR_USER, "")
    const navigate = useNavigate()
    const allUserDataStr = [localStorage.getItem(ALL_USERS)]
    const [attemptingUser, setAttemptingUser] = useState({ id: " ", username: " ", email: " ", password: " ", notify: " ", itemlimit: " ",expirylimit: " " })
    //One way to deal with ALL_USER starting with null, could also check for null later and adjust
    if (allUserDataStr[0] === null) {
        localStorage.setItem(ALL_USERS, JSON.stringify([{ id: "TrueAdmin", username: "Admin", email: "Admin" }]))
    }
    const handleChange = e => {
        setAttemptingUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))      
    }

    function goRegister() {
        localStorage.setItem(CUR_USER,JSON.stringify({ id: "TrueAdmin", username: "Admin", email: "Admin" }))
        navigate(REGISTER)
    }

    return (
        <div className="container">
            <div className="input_space">
                <input placeholder="Username" 
                type = "text" 
                name = "username"
                onChange={handleChange} />
            </div>
            <div className="input_space">
                <input placeholder="Password" 
                type = "password" 
                name = "password"
                onChange={handleChange} />
            </div>
            <button onClick={goRegister}>Register</button>
            <button onClick={() => logIn(attemptingUser,navigate)}>Log In</button>

        </div>
    );
}

export default Login;