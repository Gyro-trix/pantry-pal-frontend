import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logIn } from "../utils/users"
import { REGISTER } from "../config/routes"
import { CUR_USER,ALL_USERS } from "../config/localStorage"


function Login() {
    //Treats navigating to Log In as logging out
    localStorage.setItem(CUR_USER, "")
    const navigate = useNavigate()

    const allUserDataStr = [localStorage.getItem(ALL_USERS)]
    const [attemptingUser, setAttemptingUser] = useState({ id: " ", username: " ", email: " ", password: " ", notify: " ", itemlimit: " ", expirylimit: " " })
    //Creates default admin account on first run
    if (allUserDataStr[0] === null) {
        localStorage.setItem(ALL_USERS, JSON.stringify([{ id: "TrueAdmin", username: "Admin", email: "Admin",password: "Admin", notify: true, expirylimit: 99, itemlimit: 99 ,adminlevel: 3 }]))
    }
    const handleChange = e => {
        setAttemptingUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function goRegister() {
        navigate(REGISTER)
    }

    return (
        <div>
            <div className="card w-50 mb-3" style={{padding: 32, margin:"auto", marginTop:64, minWidth:400, maxWidth:400 }}>
                <form>
                <div className="input_group mb-3" >
                    <input className="form-control"
                        placeholder="Username"
                        type="text"
                        name="username"
                        autoComplete="username"
                        onChange={handleChange} />
                </div>
                <div className="input_group mb-3 ">
                    <input className="form-control"
                        placeholder="Password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        onChange={handleChange} />
                </div>
                </form>
                <div className = "col d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" style={{ width: 96, marginRight: 32 }} onClick={goRegister}>Register</button>
                    <button type="button" className="btn btn-primary" style={{ width: 96, whiteSpace: "nowrap" }} onClick={() => logIn(attemptingUser, navigate)}>Log In</button>
                </div>
            </div>
        </div>
    );
}

export default Login;