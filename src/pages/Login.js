import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const name = useRef()
    const password = useRef()
    const allUserDataStr = [localStorage.getItem("ALL_USERS")]
    const allUserArray = allUserDataStr
    const navigate = useNavigate()
    const attemptingUser = {id: " ", username: " ", email: " " ,password: " " }
    //Insures current user variable is entered if the user goes back to login
    localStorage.setItem("CUR_USER","")
    //One way to deal with ALL_USER starting with null, could also check for null later and adjust
    if (allUserDataStr[0] === null) {
        localStorage.setItem("ALL_USERS", JSON.stringify([{ id: "TrueAdmin", username: "Admin", email: "Admin" }]))
    }

    function logIn() {
        
        //Checks if both fields have a value
        if (name.current.value && password.current.value) {
            attemptingUser.username = name.current.value
            attemptingUser.password = password.current.value
            //Check for user in local storage
            if (validateUser()) {
                alert("Invalid")
            } else {
                localStorage.setItem("CUR_USER", JSON.stringify(attemptingUser))
                navigate("/")
            }

        }
    }


    function validateUser() {
        let result
        for (let i = 0; i < allUserArray.length; i++) {
            if (allUserArray[i].username === attemptingUser.username && allUserArray[i].password === attemptingUser.password) {
                attemptingUser.id = allUserArray[i].id
                attemptingUser.email = allUserArray[i].email
                result = true
                return result
            } else {
                result = false
            }
        }
        return result
    }
    function goRegister() {
        navigate("/register")
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