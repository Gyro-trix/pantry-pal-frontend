import React, { useState, useEffect } from "react";


function UserSettings() {
    
    const allUserDataStr = localStorage.getItem("ALL_USERS")
    const allUserData = JSON.parse(allUserDataStr)
    const currentUserStr = localStorage.getItem("CUR_USER")
    console.log("Settings")
    const [currentUser, setCurrentUser] = useState(JSON.parse(currentUserStr))
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
        
        setCurrentUser((prev) => ({
            ...prev,
            notify: !notify,
        }))
        setNotify(!notify)
    }

    function saveToUsers() {
        const filteredUsers = allUserData.filter(users => !users.id.match(new RegExp('^' + currentUser.id + '$')))
        const newAllUsers = [...filteredUsers, currentUser]
        localStorage.setItem("ALL_USERS", JSON.stringify(newAllUsers))
    }

    return (
        <div>
            <h5>Welcome: {currentUser.username}</h5>
            <br></br>
            <form></form>
            <input type="checkbox" name ="notify"  checked = {notify} onChange={handleCheck}/>
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
            <label> Email:
                <input
                    style={{ width: 200, marginLeft: 10 }}
                    type="text"
                    onChange={handleChange}
                    name="email"
                    placeholder={currentUser.email}
                ></input>
            </label>
            <button style={{ marginLeft: 10 }} onClick={saveToUsers}>Update User</button>
        </div>
    )
}

export default UserSettings