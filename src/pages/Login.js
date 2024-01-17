import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const name = useRef()
    const password = useRef()
    const allUserDataStr = localStorage.getItem("ALL_USERS")
    const allUserArray = JSON.parse("[" + allUserDataStr + "]")
    const navigate = useNavigate()

    function logIn() {
        const logIn = { username: name.current.value, password: password.current.value }
        //Checks if both fields have a value
        if (name.current.value && password.current.value) {
            //Check for user in local storage
            if (ValidateUser(logIn)) {
                alert("Invalid")
            } else {
                localStorage.setItem("CUR_USER", JSON.stringify(logIn))
                navigate("/home")
            }

        }
    }


function ValidateUser(userLoggingIn) {
    let result
    for (let i = 0; i < allUserArray.length; i++) {
        if (allUserArray[i].username === userLoggingIn.username && allUserArray[i].password === userLoggingIn.password) {
            result = false
            return result
        } else {
            result = true
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