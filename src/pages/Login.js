import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logIn } from "../utils/users"
import { REGISTER } from "../config/routes"
import { CUR_USER, ALL_USERS, THEME } from "../config/localStorage"
import { createDemoStorage } from "../utils/storage"
import { createDemoRecipe } from "../utils/recipes"
import About from "./About"
import * as Icon from 'react-bootstrap-icons';



function Login() {
    //Treats navigating to Log In as logging out
    localStorage.setItem(CUR_USER, "")
    const navigate = useNavigate()
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)
    const allUserDataStr = [localStorage.getItem(ALL_USERS)]
    const [attemptingUser, setAttemptingUser] = useState({ id: " ", username: " ", email: " ", password: " ", notify: " ", itemlimit: " ", expirylimit: " " })
    //Creates admin and demo users
    if (allUserDataStr[0] === null) {
        const demoUsers = [
            { id: "TrueAdmin", username: "Admin", email: "Admin", password: "Admin", notify: true, expirylimit: 99, itemlimit: 99, adminlevel: 3, manager: null, friends: [] },
            { id: "DemoLevel2", username: "Demo2", email: "Demo2", password: "Demo2", notify: true, expirylimit: 99, itemlimit: 99, adminlevel: 2, manager: "TrueAdmin", friends: [] },
            { id: "DemoLevel1", username: "Demo1", email: "Demo1", password: "Demo1", notify: true, expirylimit: 99, itemlimit: 99, adminlevel: 1, manager: "DemoLevel2", friends: [] }
        ]
        localStorage.setItem(ALL_USERS, JSON.stringify(demoUsers))
    }
    createDemoStorage()
    createDemoRecipe()


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
        <div className ="container" style ={{margin:"auto", marginTop:32}}>
            <div className="row">
                <div className="col w-75 mb-3" >
                    
                    <div className="card " style={{textAlign:"center",minHeight:298, padding: 16, marginTop: 64, marginLeft:32,  animation: "fadeIn 3s" }}>
                        <h1>Pantry Pal</h1>
                        <About />
                    </div>
                </div>
                <div className="col w-25 mb-3">
                    <div className="card w-50 mb-3" style={{ padding: 32, marginTop: 64, minWidth: 400, maxWidth: 400, animation: "fadeIn 3s" }}>
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
                            <button type="button" className={theme.button} style={{ width: 96, whiteSpace: "nowrap" }} onClick={() => logIn(attemptingUser, navigate)}>Log In</button>
                        </div>
                    </div>
                    <div className="card w-50 mb-3" style={{marginTop:32,maxWidth: 400,minWidth: 400,padding:16,animation: "fadeIn 3s"}}>
                        <span style={{margin:"auto"}}><Icon.Github style ={{marginRight:32}} size ={36}/><Icon.EnvelopeAtFill style ={{marginRight:32}} size ={36}/><Icon.Linkedin size ={36}/></span>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;