import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, checkEmailFormat, userEmailExists, userExists } from "../utils/users"
import { CUR_USER, THEME } from "../config/localStorage"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


//Used to register a new admin level user 
function Register() {
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)
    const [newUser, setNewUser] = useState(null)
    const navigate = useNavigate()
    
    //Clears current User
    localStorage.setItem(CUR_USER, "")
    //Adds user with data from input fields
    const handleChange = e => {
        setNewUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleCheck = () => {
        if (!(newUser === null)) {
            if (userExists(newUser)) {
                toast("Username Taken", { position: "bottom-right", theme: theme.toast })
            }
        }
    }

    const handleEmailChk = () => {
        if (!(newUser === null)) {
            if (userEmailExists(newUser)) {
                toast("Email Already In Use", { position: "bottom-right", theme: theme.toast })
            }
            checkEmailFormat(newUser)
        }
    }

    //Register form
    return (
        <div className="card w-25 mb-3" style={{ padding: 32, margin: "auto", marginTop: 32, minWidth: 400 }}>

            <form className="flex row-auto"  >

                <input className="form-control"
                    placeholder="Username"
                    type="text"
                    onChange={handleChange}
                    name="username"
                    onBlur={handleCheck}
                    autoComplete="username"
                />

                <input className="form-control"
                    style={{ marginTop: 16 }}
                    placeholder="Email"
                    type="text"
                    onChange={handleChange}
                    name="email"
                    onBlur={handleEmailChk}
                    autoComplete="new-email"
                />

                <input className="form-control"
                    style={{ marginTop: 16 }}
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    autoComplete="new-password"
                />


                <input className="form-control"
                    style={{ marginTop: 16 }}
                    placeholder="Re-Type Password"
                    type="password"
                    onChange={handleChange}
                    name="passwordchk"
                    autoComplete="new-password"
                />

            </form>
            <button type="button" className={theme.button} style={{ marginTop: 16 }} onClick={() => addUser(newUser)}>Register</button>

        </div>
    );
}

export default Register;