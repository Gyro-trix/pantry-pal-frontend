import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserLogin, saveUserSettings, adminPasswordChange } from "../utils/users"
import { CUR_USER, USER_TO_EDIT } from "../config/localStorage"


function UserSettings() {
    const navigate = useNavigate()
    const currentUserStr = localStorage.getItem(CUR_USER)
    const userToEditStr = localStorage.getItem(USER_TO_EDIT)
    const [passwords, setPasswords] = useState({ currentpassword: "", newpassword: "", newpasswordcheck: "" })
    const [userToEdit, setUserToEdit] = useState(userToEditStr ? JSON.parse(userToEditStr) : null)
    const [notify, setNotify] = useState(userToEdit ? userToEdit.notify : null)
    const [passwordNotice, setPasswordNotice] = useState("Password not Updated")
    const [passwordNoticeColor, setPasswordNoticeColor] = useState("red")

    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    useEffect(() => {
        localStorage.setItem(USER_TO_EDIT, JSON.stringify(userToEdit))
    }, [userToEdit])
    //Update Current user as form changes
    const handleChange = e => {
        setUserToEdit((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    //Sets reminder to save text if anything has changed
    const handleCheck = e => {
        setUserToEdit((prev) => ({
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

    if (!userToEdit) return <div> Loading </div>

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h5>Welcome: {userToEdit.username}</h5>
                    <form>
                        <label> Current Password:
                            <input
                                style={{ width: 200, marginLeft: 10 }}
                                type="password"
                                onChange={handlePasswordChange}
                                name="currentpassword"
                                autoComplete="current-password"
                            ></input>
                        </label>
                        <br></br>
                        <label> New Password:
                            <input
                                style={{ width: 200, marginLeft: 10 }}
                                type="password"
                                onChange={handlePasswordChange}
                                name="newpassword"
                                autoComplete="new-password"
                            ></input>
                        </label>
                        <br></br>
                        <label> Re-Type New Password:
                            <input
                                style={{ width: 200, marginLeft: 10 }}
                                type="password"
                                onChange={handlePasswordChange}
                                name="newpasswordcheck"
                                autoComplete="new-password"
                            ></input>
                        </label>
                    </form>
                    <p style={{ color: passwordNoticeColor }}>{passwordNotice}</p>
                    <button style={{ marginLeft: 10 }} onClick={() => {
                        if (adminPasswordChange(passwords) === true) {
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
                            placeholder={userToEdit.itemlimit}
                        ></input>
                    </label>
                    <br></br>
                    <label> Expiry Threshold:
                        <input
                            style={{ width: 200, marginLeft: 10 }}
                            type="text"
                            onChange={handleChange}
                            name="expirylimit"
                            placeholder={userToEdit.expirylimit}
                        ></input> Days
                    </label>
                    <br></br>
                    <label> Email:
                        <input
                            style={{ width: 200, marginLeft: 10 }}
                            type="text"
                            onChange={handleChange}
                            name="email"
                            placeholder={userToEdit.email}
                        ></input>
                    </label>
                    <br></br>

                    <br></br>
                    <button style={{ marginLeft: 10 }} onClick={() => saveUserSettings(userToEdit)}>Update Settings</button>
                </div>
            </div>
        </div>
    )
}

export default UserSettings