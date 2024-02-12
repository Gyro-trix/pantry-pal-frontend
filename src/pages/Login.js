import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {REGISTER} from "../config/routes"

function Login() {
    //Insures current user variable is entered if the user goes back to login
    localStorage.setItem("CUR_USER", "")
    const navigate = useNavigate()
    const name = useRef()
    const password = useRef()
    const allUserDataStr = [localStorage.getItem("ALL_USERS")]
    const attemptingUser = { id: " ", username: " ", email: " ", password: " ", notify: " ", itemlimit: " " }
    //One way to deal with ALL_USER starting with null, could also check for null later and adjust
    if (allUserDataStr[0] === null) {
        localStorage.setItem("ALL_USERS", JSON.stringify([{ id: "TrueAdmin", username: "Admin", email: "Admin" }]))
    }
    const allUserData = JSON.parse(localStorage.getItem("ALL_USERS"))
    //console.log(allUserData)
    function logIn() {
        //Checks if both fields have a value
        if (name.current.value && password.current.value) {
            attemptingUser.username = name.current.value
            attemptingUser.password = password.current.value
            //Check for user in local storage
            if (validateUser(allUserData, attemptingUser) === false) {
                alert("Invalid")
            } else {
                localStorage.setItem("CUR_USER", JSON.stringify(attemptingUser))
                navigate("/")
            }

        }
    }
    function validateUser(allUsers, atUser) {
        for (let i = 0; i < allUsers.length; i++) {
            //console.log(allUsers[i])
            if (allUsers[i].username === atUser.username && allUsers[i].password === atUser.password) {
                attemptingUser.id = allUsers[i].id
                attemptingUser.email = allUsers[i].email
                attemptingUser.notify = allUsers[i].notify
                attemptingUser.itemlimit = allUsers[i].itemlimit
                return true
            }
        }
        return false
    }

    function goRegister() {
        localStorage.setItem("CUR_USER",JSON.stringify({ id: "TrueAdmin", username: "Admin", email: "Admin" }))
        navigate(REGISTER)
    }

    return (
        <div className="container">
            <div className="input_space">
                <input placeholder="Name" type="text" ref={name} />
            </div>
            <div className="input_space">
                <input placeholder="Password" type="password" ref={password} />
            </div>
            <button onClick={goRegister}>Register</button>
            <button onClick={logIn}>Log In</button>

        </div>
    );
}

export default Login;