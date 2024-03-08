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
        <div className="container" style = {{padding:32}}>
            <div className="row">
                <div className="col">
                    <div className = "card" style = {{padding:16}}>
                    <h5>Welcome: {currentUser.username}</h5>
                    <form>
                    <label style = {{marginTop:16}}>  Current Password:
                        <input
                            className="form-control"
                            style={{ width: 200, marginLeft: 8 }}
                            type="password"
                            onChange={handlePasswordChange}
                            name="currentpassword"

                        ></input>
                    </label>
                    <br></br>
                    <label style = {{marginTop:16}}> New Password:
                        <input
                            className="form-control"
                            style={{ width: 200, marginLeft: 8 }}
                            type="password"
                            onChange={handlePasswordChange}
                            name="newpassword"

                        ></input>
                    </label>
                    <br></br>
                    <label style = {{marginTop:16}}> Re-Type New Password:
                        <input
                            className="form-control"
                            style={{ width: 200, marginLeft: 8 }}
                            type="password"
                            onChange={handlePasswordChange}
                            name="newpasswordcheck"
                        ></input>
                    </label>
                    </form>
                    <p style={{ color: passwordNoticeColor,marginTop:32 }}>{passwordNotice}</p>
                    <button type="button" className="btn btn-primary" style={{ marginLeft: 8, marginTop:32 }} onClick={() => {
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
                    
                </div>
                {/* Settings column */}
                <div className="col">
                <div className = "card" style = {{padding:16}}>
                    
                    <form style = {{marginTop:32}}>
                     <label className="form-control" style={{ marginLeft: 8 }}>   
                    <input type="checkbox" name="notify" checked={notify} onChange={handleCheck} />
                        <span style={{ marginLeft: 8, whiteSpace:"nowrap" }}>Enable Notifications</span>
                    </label>
                    </form>
                    <label style = {{marginTop:16}}> Low Stock Threshold:
                        <input
                            className="form-control"
                            style={{ marginLeft: 8 }}
                            type="text"
                            onChange={handleChange}
                            name="itemlimit"
                            placeholder={currentUser.itemlimit}
                        ></input>
                    </label>
                    
                    <label style = {{marginTop:16}}> Expiry Threshold (Days):
                        <input
                            className="form-control"
                            style={{ marginLeft: 8 }}
                            type="text"
                            onChange={handleChange}
                            name="expirylimit"
                            placeholder={currentUser.expirylimit}
                        ></input> 
                    </label>
                    
                    <label style = {{marginTop:16}}> Email:
                        <input
                            className="form-control"
                            style={{  marginLeft: 8 }}
                            type="text"
                            onChange={handleChange}
                            name="email"
                            placeholder={currentUser.email}
                        ></input>
                    </label>
                   
                    <button type="button" className="btn btn-primary" style={{ marginLeft: 8, marginTop: 64 }} onClick={() => saveUserSettings(currentUser)}>Update Settings</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettings