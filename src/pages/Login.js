import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Home from "./Home";

function Login() {
    const name = useRef()
    const email = useRef()
    const password = useRef()

    const navigate = useNavigate()

const handleClick = () =>{
    
    if(name.current.value&&email.current.value&&password.current.value){
       localStorage.setItem("name",name.current.value)
       localStorage.setItem("email",email.current.value)
       localStorage.setItem("password",password.current.value)
       navigate("/home")
    }
}

    return (
        <div className="container">
            <div className="input_space">
                <input placeholder="Name" type="text" ref={name} />
            </div>
            <div className="input_space">
                <input placeholder="Email" type="text" ref={email} />
            </div>
            <div className="input_space">
                <input placeholder="Password" type="password" ref={password} />
            </div>
            <button onClick = {handleClick}>Create Account</button>
            <button onClick = {handleClick}>Log In</button>

        </div>
    );
}

export default Login;