import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, userExists } from "../utils/users"
import { CUR_USER } from "../config/localStorage"

function CreateUser(){

    const [newUser, setNewUser] = useState()
    const navigate = useNavigate()
    //Used to update reminder text on registration page 
    const [noticeStyle, setColor] = useState('green')
    const [text, setText] = useState("Username Available")
    //Clears current User
    localStorage.setItem(CUR_USER, "")
    //Adds user with data from input fields
    const handleChange = e => {
        setNewUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))        
    }

    const handleCheck = () =>{
        if (!userExists(newUser)) {
            setColor('green')
            setText("Username Available")
        } else {
            setColor('red')
            setText("Username Taken")
        }
    }

    //Register form
    return (
        <div>
            <div className="container">
                <form className="flex row-auto" style={{ width: 100 }} >
                    <div className="input_space">
                        <input placeholder="Username"
                            type="text"
                            onChange={handleChange}
                            name="username"
                            onBlur={handleCheck}
                        />
                    </div>
                    <p style={{ color: noticeStyle }}>{text}</p>
                    <div className="input_space">
                        <input placeholder="Email"
                            type="text"
                            onChange={handleChange}
                            name="email"
                        />
                    </div>
                    <div className="input_space">
                        <input placeholder="Password"
                            type="text"
                            onChange={handleChange}
                            name="password"
                        />
                    </div>
                    <div className="input_space">
                        <input placeholder="Re-Type Password"
                            type="text"
                            onChange={handleChange}
                            name="passwordchk"
                        />
                    </div>
                </form>
                <button onClick={() => addUser(newUser, navigate)}>Register</button>
            </div>
        </div>
    );

}
export default CreateUser