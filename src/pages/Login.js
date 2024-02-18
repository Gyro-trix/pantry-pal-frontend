import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logIn } from "../utils/users"
import { REGISTER } from "../config/routes"
import { ALL_USERS, CUR_USER } from "../config/localStorage"


function Login() {
    //Insures current user variable is entered if the user goes back to login
    localStorage.setItem(CUR_USER, "")
    const navigate = useNavigate()
    const allUserDataStr = [localStorage.getItem(ALL_USERS)]
    const [attemptingUser, setAttemptingUser] = useState({ id: " ", username: " ", email: " ", password: " ", notify: " ", itemlimit: " ", expirylimit: " " })
    //One way to deal with ALL_USER starting with null, could also check for null later and adjust
    if (allUserDataStr[0] === null) {
        localStorage.setItem(ALL_USERS, JSON.stringify([{ id: "TrueAdmin", username: "Admin", email: "Admin", password: "admin" }]))
    }
    const handleChange = e => {
        setAttemptingUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function goRegister() {
        localStorage.setItem(CUR_USER, JSON.stringify({ id: "TrueAdmin", username: "Admin", email: "Admin", password: "admin" }))
        navigate(REGISTER)
    }

    return (
        <div>
            <div className="card w-50 mb-3" style={{ background: "lightblue", padding: 32, margin:"auto", marginTop:64 }}>
                <div className="input_group mb-3" >
                    <input className="form-control"
                        placeholder="Username"
                        type="text"
                        name="username"
                        onChange={handleChange} />
                </div>
                <div className="input_group mb-3 ">
                    <input className="form-control"
                        
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange} />
                </div>
                <div className = "col d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" style={{ width: 96, marginRight: 32 }} onClick={goRegister}>Register</button>
                    <button type="button" className="btn btn-primary" style={{ width: 96, whiteSpace: "nowrap" }} onClick={() => logIn(attemptingUser, navigate)}>Log In</button>
                </div>
            </div>
        </div>
    );
}

export default Login;