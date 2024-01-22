import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";


function Storage() {
    const storagename = useRef()
    const storagetype = useRef()
    
    return (
        
        
        <div className="container">
            <div className="input_space">
                <input placeholder="Storage Name" type="text" ref={storagename} />
            </div>
            <div className="input_space">
                <input placeholder="Password" type="text" ref={storagetype} />
            </div>
            <button >Register</button>
            <button >Log In</button>

        </div>
    )
}

export default Storage;