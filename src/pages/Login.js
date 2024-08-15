import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logIn } from "../utils/users"
import { REGISTER } from "../config/routes"
import { CUR_USER, THEME } from "../config/localStorage"
import About from "./About"
import * as Icon from 'react-bootstrap-icons';
import { lightTheme } from "../utils/display"



function Login() {
    //Treats navigating to Log In as logging out
    localStorage.setItem(CUR_USER, "")
    const navigate = useNavigate()
    const themeStr = localStorage.getItem(THEME)
    const theme = (themeStr !== null && themeStr !== "") ? JSON.parse(themeStr)  : lightTheme
    const [attemptingUser, setAttemptingUser] = useState({ id: " ", username: " ", email: " ", password: " ", notify: " ", itemlimit: " ", expirylimit: " " })
 

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
        <div className="container" style={{ margin: "auto" }}>
            <div className="row">
                <div className="col w-75 mb-3" >

                    <div className="card " style={{ minHeight: "100%", marginTop: 64,  animation: "fadeIn 3s" }}>
                        <h1 style={{ textAlign: "center", marginTop: 16, marginBottom: 16 }} >Pantry Pal</h1>
                        <div><About /></div>

                    </div>
                </div>
                <div className="col ">
                    <div className="card " style={{ margin:"auto",padding: 32, marginTop: 64, minWidth: 400, maxWidth: 400, animation: "fadeIn 3s" }}>
                        <form>
                            <div className="input_group mb-3" style={{ animation: "fadeIn2 2s" }}>
                                <input className="form-control"

                                    placeholder="Username"
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    onChange={handleChange} />
                            </div>
                            <div className="input_group mb-3 " style={{ animation: "fadeIn2 2s" }}>
                                <input className="form-control"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    onChange={handleChange} />
                            </div>
                        </form>
                        <div style={{ animation: "fadeIn2 2s" }} className="col d-flex justify-content-between">
                            <button type="button" className={theme.button} style={{ width: 96, marginRight: 32 }} onClick={goRegister}>Register</button>
                            <button type="button" className={theme.button} style={{ width: 96, whiteSpace: "nowrap" }} onClick={() => logIn(attemptingUser,navigate)}>Log In</button>
                        </div>
                    </div>
                    <div className="card w-50 mb-3" style={{ margin:"auto",marginTop: 32, maxWidth: 400, minWidth: 400, padding: 16, animation: "fadeIn 3s" }}>
                        <span style={{ margin: "auto" }}>
                        <a href="https://github.com/Gyro-trix" target="_blank" rel="noreferrer"><Icon.Github style={{ marginRight: 32 }} size={36} /></a>
                        <a href="mailto:matthew.d.garrett@hotmail.com" target="_blank" rel="noreferrer"><Icon.EnvelopeAtFill style={{ marginRight: 32 }} size={36} /></a>
                        <a href="https://www.linkedin.com/in/matthew-garrett-a2987477/" target="_blank" rel="noreferrer"><Icon.Linkedin size={36} /></a>
                        </span>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;