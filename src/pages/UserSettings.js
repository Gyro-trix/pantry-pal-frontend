import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserLogin, saveUserSettings } from "../utils/users"
import { CUR_USER } from "../config/localStorage"


function UserSettings() {
    const navigate = useNavigate()
    const currentUserStr = localStorage.getItem(CUR_USER)
    const [currentUser, setCurrentUser] = useState(currentUserStr ? JSON.parse(currentUserStr) : null)
    const [notify, setNotify] = useState(currentUser ? currentUser.notify : null)

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



    if (!currentUser) return <div> Loading </div>

    return (
        <div>
            <h5>Welcome: {currentUser.username}</h5>
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
                ></input>
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
            <button style={{ marginLeft: 10 }} onClick={() => saveUserSettings(currentUser)}>Update User</button>
        </div>
    )
}

export default UserSettings