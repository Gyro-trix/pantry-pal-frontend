import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const name = useRef()
    const password = useRef()
    const allUserDataStr = localStorage.getItem("ALL_USERS")
    const allUserArray = JSON.parse("[" + allUserDataStr + "]")
    const navigate = useNavigate()

    function logIn() {
    if (name.current.value&&password.current.value){
        //check for user in local storage
    }
       
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