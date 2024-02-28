import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserSettings, adminPasswordChange, checkAdminLogin } from "../utils/users"
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
        checkAdminLogin(currentUserStr, navigate)
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
    const onRadioChange = e => {
        setUserToEdit((prev) => ({
            ...prev,
            adminlevel:Number(e.target.value),
        }))
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
            <h5>Account For: {userToEdit.username}</h5>
            <div className="row">
                <div className="col">
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
                            setUserToEdit((prev) => ({
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
                    <form>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" checked={userToEdit.adminlevel === 3} value={3} disabled />
                            <label className="form-check-label" htmlFor="inlineRadio1">3</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" checked={userToEdit.adminlevel === 2} onChange = {onRadioChange}value={2} />
                            <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" checked={userToEdit.adminlevel === 1} onChange = {onRadioChange}value={1} />
                            <label className="form-check-label" htmlFor="inlineRadio3">1</label>
                        </div>
                    </form>

                    <br></br>

                    <input type="checkbox" name="notify" checked={notify} onChange={(e) => {
                        setUserToEdit((prev) => ({
                            ...prev,
                            notify: !notify,
                        }))
                        setNotify(!notify)
                        console.log(notify)
                    }} />
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
                    <button style={{ marginLeft: 10 }} onClick={() => { saveUserSettings(userToEdit) }}>Update Settings</button>
                </div>
            </div>
        </div>
    )
}

export default UserSettings