import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {addUser} from "../utils/users"

//Used to register a new admin level user 
function Register() {
    const allUserDataStr = localStorage.getItem("ALL_USERS")
    const allUserData = JSON.parse(allUserDataStr)
    const [newUser, setNewUser] = useState()
    const navigate = useNavigate()
    //Used to update reminder text on registration page 
    const [noticeStyle, setColor] = useState('green')
    const [text, setText] = useState("Username Avaiable")

    localStorage.setItem("CUR_USER", "")
    //Adds user with data from input fields
    const handleChange = e => {
        setNewUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }



/*
    function addUser() {
        //Checks if all text fields are full
        if (name.current.value && email.current.value && password.current.value && passwordchk.current.value) {
            //Checks that both passwords and passwordchk are the same 
            if (password.current.value === passwordchk.current.value) {
                const nm = name.current.value
                const em = email.current.value
                const pw = password.current.value
                //Create ID from current date and username
                const date = new Date()
                const day = date.getUTCDate()
                const month = date.getUTCMonth() + 1
                const year = date.getUTCFullYear()
                const id = "" + year + month + day + "-" + nm
                const notify = false
                const itemlimit = 10
                //Complete entry for new user
                const newUser = { id: id, username: nm, email: em, password: pw, notify: notify, itemlimit: itemlimit}
                //Test newUser against current registered users, then adds to local storage All_USERS               
                if ( userExists(allUserData, newUser) === false) {
                    userSave(allUserData, newUser)
                    localStorage.setItem("CUR_USER", JSON.stringify(newUser))
                    navigate("/")
                }
            }
        }
    }
   
    //Check if user already exists
    function userExists(allUsers, userToAdd) {
        for (let i = 0; i < allUsers.length; i++){
            if (allUsers[i].username === userToAdd.username){
                return true
            }
        }
        return false
    }
     */
    //Saves user to local storage
    function userSave(allUsers, userToAdd) {
        let temparr = [...allUsers,userToAdd]
        allUsers = temparr
        localStorage.setItem("ALL_USERS", JSON.stringify(allUsers))
    }
    //Check used to update page on if username is valid
    function nameCheck() {
        const temp = newUser.username
        if (!userExists(allUserData, temp)) {
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
                    onChange ={handleChange} 
                    name = "username"
                     
                     />
                </div>
                <p style = {{color: noticeStyle}}>{text}</p>
                <div className="input_space">
                    <input placeholder="Email" 
                    type="text"
                    onChange ={handleChange} 
                    name = "email"
                       />
                </div>
                <div className="input_space">
                    <input placeholder="Password" 
                    type="text"
                    onChange ={handleChange} 
                    name = "password"
                      />
                </div>
                <div className="input_space">
                    <input placeholder="Re-Type Password" 
                    type="text"
                    onChange ={handleChange} 
                    name = "passwordchk"
                       />
                </div>
                </form>
                <button onClick={() => addUser(newUser,navigate)}>Register</button>
            </div>
        </div>
    );
}

export default Register;