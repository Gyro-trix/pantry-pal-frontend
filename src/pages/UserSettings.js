import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserLogin, saveUserSettings, changeUserPassword } from "../utils/users"
import { CUR_USER } from "../config/localStorage"


function UserSettings() {
    const navigate = useNavigate()
    const currentUserStr = localStorage.getItem(CUR_USER)
    const [passwords, setPasswords] = useState({ currentpassword: "", newpassword: "", newpasswordcheck: "" })
    const [currentUser, setCurrentUser] = useState(currentUserStr ? JSON.parse(currentUserStr) : null)
    const [notify, setNotify] = useState(currentUser ? currentUser.notify : null)
    const [passwordNotice, setPasswordNotice] = useState("Password not Updated")
    const [passwordNoticeColor, setPasswordNoticeColor] = useState("red")

    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    useEffect(() => {
        localStorage.setItem(CUR_USER, JSON.stringify(currentUser))
    }, [currentUser])
    //Update Current user as form changes
    const handleChange = e => {
        setCurrentUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    //Sets reminder to save text if anything has changed
    const handleCheck = e => {
        setCurrentUser((prev) => ({
            ...prev,
            notify: !notify,
        }))
        setNotify(!notify)
    }
    //Collects passwords to attempt password change
    const handlePasswordChange = e => {
        setPasswords((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    if (!currentUser) return <div> Loading </div>

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h5>Welcome: {currentUser.username}</h5>
                    <label> Current Password:
                        <input
                            style={{ width: 200, marginLeft: 10 }}
                            type="password"
                            onChange={handlePasswordChange}
                            name="currentpassword"

                        ></input>
                    </label>
                    <br></br>
                    <label> New Password:
                        <input
                            style={{ width: 200, marginLeft: 10 }}
                            type="password"
                            onChange={handlePasswordChange}
                            name="newpassword"

                        ></input>
                    </label>
                    <br></br>
                    <label> Re-Type New Password:
                        <input
                            style={{ width: 200, marginLeft: 10 }}
                            type="password"
                            onChange={handlePasswordChange}
                            name="newpasswordcheck"
                        ></input>
                    </label>
                    <p style={{ color: passwordNoticeColor }}>{passwordNotice}</p>
                    <button style={{ marginLeft: 10 }} onClick={() => {
                        if (changeUserPassword(passwords) === true) {
                            setCurrentUser((prev) => ({
                                ...prev,
                                password: passwords.newpassword
                            }))
                            setPasswordNotice("Password Changed Sucessful")
                            setPasswordNoticeColor("green")
                        } else {
                            setPasswordNotice("Unable to change password")
                            setPasswordNoticeColor("red")
                        }
                    }}>Update Password</button>
                </div>
                {/* Settings column */}
                <div className="col">
                    <br></br>
                    <form></form>
                    <input type="checkbox" name="notify" checked={notify} onChange={handleCheck} />
                    <label style={{ marginLeft: 5 }}>
                        Enable Notifications
                    </label>
                    <br></br>
                    <label> Low Stock Threshold:
                        <input
                            style={{ width: 200, marginLeft: 10 }}
                            type="text"
                            onChange={handleChange}
                            name="itemlimit"
                            placeholder={currentUser.itemlimit}
                        ></input>
                    </label>
                    <br></br>
                    <label> Expiry Threshold:
                        <input
                            style={{ width: 200, marginLeft: 10 }}
                            type="text"
                            onChange={handleChange}
                            name="expirylimit"
                            placeholder={currentUser.expirylimit}
                        ></input> Days
                    </label>
                    <br></br>
                    <label> Email:
                        <input
                            style={{ width: 200, marginLeft: 10 }}
                            type="text"
                            onChange={handleChange}
                            name="email"
                            placeholder={currentUser.email}
                        ></input>
                    </label>
                    <br></br>

                    <br></br>
                    <button style={{ marginLeft: 10 }} onClick={() => saveUserSettings(currentUser)}>Update Settings</button>
                </div>
            </div>
        </div>
    )
}

export default UserSettings