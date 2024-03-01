import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userExists, userSave } from "../utils/users"
import { CUR_USER } from "../config/localStorage"
import { checkAdminLogin } from "../utils/users";

function CreateUser() {

    const [newUser, setNewUser] = useState({ id: "", username: "", password: "", email: "", adminlevel: 2, notify: false, itemlimit: 99, expirylimit: 99 })
    const navigate = useNavigate()
    //Used to update reminder text on registration page 
    const [noticeStyle, setColor] = useState('green')
    const [text, setText] = useState("Username Available")
    const currentUserStr = localStorage.getItem(CUR_USER)

    useEffect(() => {
        checkAdminLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

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

    const onRadioChange = e => {
        setNewUser((prev) => ({
            ...prev,
            adminlevel: Number(e.target.value),
        }))
    }

    //Register form
    return (
            <div className="card w-50 mb-3" style={{ margin: "auto", padding: 16,marginTop:32 }}>
                
                <div className="card-body">
                    <h4> Create User </h4>
                    <form className="flex row-auto" style = {{marginTop: 16}} >
                        <div className="input_space" >
                            <input placeholder="Username"
                                type="text"
                                onChange={handleChange}
                                name="username"
                                onBlur={handleCheck}
                            />
                        </div>
                        <p style={{ color: noticeStyle, marginTop: 16 }}>{text}</p>
                        <div className="input_space" style={{ marginTop: 16 }}>
                            <input placeholder="Email"
                                type="text"
                                onChange={handleChange}
                                name="email"
                            />
                        </div>
                        <div style={{ marginTop: 16 }}>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" checked={newUser.adminlevel === 3} value={3} disabled />
                                <label className="form-check-label" htmlFor="inlineRadio1">3</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" checked={newUser.adminlevel === 2} onChange={onRadioChange} value={2} />
                                <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" checked={newUser.adminlevel === 1} onChange={onRadioChange} value={1} />
                                <label className="form-check-label" htmlFor="inlineRadio3">1</label>
                            </div>
                            Admin Level
                        </div>
                        <div className="input_space" style={{ marginTop: 16 }}>
                            <input placeholder="Password"
                                type="text"
                                onChange={handleChange}
                                name="password"
                            />
                        </div>
                        <div className="input_space" style={{ marginTop: 16 }}>
                            <input placeholder="Re-Type Password"
                                type="text"
                                onChange={handleChange}
                                name="passwordchk"
                            />
                        </div>
                    </form>
                    <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => userSave(newUser)}>Save User</button>
                </div>
            </div>
        
    );

}
export default CreateUser