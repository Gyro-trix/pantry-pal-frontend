import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

//Used to register a new admin level user 
function Register() {
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const passwordchk = useRef()
    const allUserData = [localStorage.getItem("ALL_USERS")]
    const navigate = useNavigate()
    //Used to update reminder text on registration page 
    const [noticeStyle, setColor] = useState('green')
    const [text, setText] = useState("Username Avaiable")
    //Adds user with data from input fields
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
                //Complete entry for new user
                const newUser = { id: id, username: nm, email: em, password: pw }
                //Test newUser against current registered users, then adds to local storage All_USERS               
                if (userExists(allUserData, newUser)=== false) {
                    userSave(allUserData, newUser)
                    localStorage.setItem("CUR_USER", JSON.stringify(newUser))
                    navigate("/")
                }
            }
        }
    }
    //Check if user already exists
    function userExists(allUsers, userToAdd) {
        for (let user in allUsers){
            if (user.username === userToAdd.username){
                return true
            }
        }
        return false
    }
    //Saves user to local storage
    function userSave(allUsers, userToAdd) {
        allUsers.push(userToAdd)
        localStorage.setItem("ALL_USERS", JSON.stringify(allUsers))
    }
    //Check used to update page on if username is valid
    function nameCheck() {
        const temp = {username: name.current.value}
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
                <div className="input_space">
                    <input placeholder="Name" type="text" ref={name} onChange={nameCheck} />
                </div>
                <p style = {{color: noticeStyle}}>{text}</p>
                <div className="input_space">
                    <input placeholder="Email" type="text" ref={email} />
                </div>
                <div className="input_space">
                    <input placeholder="Password" type="password" ref={password} />
                </div>
                <div className="input_space">
                    <input placeholder="Re-Type Password" type="password" ref={passwordchk} />
                </div>
                <button onClick={addUser}>Register</button>
            </div>
        </div>
    );
}

export default Register;