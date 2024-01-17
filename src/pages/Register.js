import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const passwordchk = useRef()
    const allUserDataStr = localStorage.getItem("ALL_USERS")
    const allUserArray = JSON.parse("[" + allUserDataStr + "]")
    const navigate = useNavigate()

    const [text, setText] = useState("Username Avaiable")
    //One way to deal with ALL_USER starting with null, could also check for null later and adjust
    const filler = { id: "TrueAdmin", username: "Admin", email: "Admin" }
    if (allUserDataStr === null) {
        let temp = JSON.stringify(filler)
        localStorage.setItem("ALL_USERS", temp)
    }


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
                if (UserCompare(allUserDataStr, newUser)) {
                    UserSave(allUserDataStr, newUser)
                    localStorage.setItem("CUR_USER", JSON.stringify(newUser))
                    navigate("/home")
                }
            }
        }
    }
    //Search for user currently already registered
    function UserCompare(allUsers, userToAdd) {
        let tempjson = JSON.parse('[' + allUsers + ']')
        let result
        for (let i = 0; i < tempjson.length; i++) {
                if (tempjson[i].username === userToAdd.username) {
                    result = false
                    return result
                } else {
                    result = true
                }
                
        }
        return result
    }
    //Saves user to local storage
    function UserSave(allUsers, userToAdd) {
        let temp = allUsers + "," + JSON.stringify(userToAdd)
        localStorage.setItem("ALL_USERS", temp)
    }
    function nameCheck() {
        const temp = {username: name.current.value}
        if (UserCompare(allUserDataStr, temp)) {
            setText("Username Available")
        } else {
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
                {text}
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