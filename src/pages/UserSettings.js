import React, { useState, useEffect } from "react";

function UserSettings() {
    const allUsers = JSON.parse(localStorage.getItem("ALL_USERS"))
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("CUR_USER")))
    const [notify,setNotify] = useState(currentUser.notify)
    
    useEffect(() => {
        localStorage.setItem("CUR_USER", JSON.stringify(currentUser))
    }, [currentUser])

    const handleChange = e => {
        setCurrentUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleCheck = e => {
        setNotify(!notify)
        setCurrentUser((prev) => ({
            ...prev,
            notify: notify,
        }))
        console.log(notify)
    }

    function saveToUsers() {
        const filteredUsers = allUsers.filter(users => !users.id.match(new RegExp('^' + currentUser.id + '$')))
        const newAllUsers = [...filteredUsers, currentUser]
        localStorage.setItem("ALL_USERS", JSON.stringify(newAllUsers))
    }

    return (
        <div>
            <h5>Welcome: {currentUser.username}</h5>
            <br></br>
            <form></form>
            <input type="checkbox" name ="notify" checked = {!notify} onChange={handleCheck}/>
            <label style={{ marginLeft: 5 }}>
                Enable Notifications
            </label>
            <br></br>
            <br></br>
            <label> Email:
                <input
                    style={{ width: 200, marginLeft: 10 }}
                    type="text"
                    onChange={handleChange}
                    name="email"
                    placeholder={currentUser.email}
                ></input>
                <button style={{ marginLeft: 10 }} onClick={saveToUsers}>Update User</button>
            </label>
        </div>
    )
}

export default UserSettings