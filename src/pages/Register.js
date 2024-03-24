import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, userEmailExists, userExists } from "../utils/users"
import { CUR_USER } from "../config/localStorage"

//Used to register a new admin level user 
function Register() {
    const [newUser, setNewUser] = useState()
    const navigate = useNavigate()
    //Used to update reminder text on registration page 
    const [noticeStyle, setColor] = useState('green')
    const [text, setText] = useState("Username Available")
    const [emailTextColor, setEmailTextColor] = useState('green')
    const [emailText, setEmailText] = useState("Email Not Used")
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
        if (!userExists(newUser)) {
            setColor('green')
            setText("Username Available")
        } else {
            setColor('red')
            setText("Username Taken")
        }
    }

    const handleEmailChk = () => {
        if (!userEmailExists(newUser)) {
            setEmailTextColor('green')
            setEmailText("Email Not Used")
        } else {
            setEmailTextColor('red')
            setEmailText("EMail already in use")
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
                />
                <div className="container" style={{ textAlign: "center" }}>
                    <p style={{ color: noticeStyle, whiteSpace: "nowrap", marginTop: 16 }}>{text}</p>
                </div>
                <input className="form-control"
                    style={{ marginTop: 16 }}
                    placeholder="Email"
                    type="text"
                    onChange={handleChange}
                    name="email"
                    onBlur={handleEmailChk}
                />
                <div className="container" style={{ textAlign: "center" }}>
                    <p style={{ color: emailTextColor, whiteSpace: "nowrap", marginTop: 16 }}>{emailText}</p>
                </div>
                <input className="form-control"
                    style={{ marginTop: 16 }}
                    placeholder="Password"
                    type="text"
                    onChange={handleChange}
                    name="password"
                />


                <input className="form-control"
                    style={{ marginTop: 16 }}
                    placeholder="Re-Type Password"
                    type="text"
                    onChange={handleChange}
                    name="passwordchk"
                />

            </form>
            <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => addUser(newUser, navigate)}>Register</button>

        </div>
    );
}

export default Register;