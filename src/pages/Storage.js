import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function checkUserLogin(currentUser, navigate) {
    if (currentUser === null || currentUser.trim() === "") {
        navigate("/login")
    }
}

function Storage() {
    const storagename = useRef()
    const storagetype = useRef()
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("CUR_USER")
    const allStorageData = [localStorage.getItem("ALL_STORAGES")]
    useEffect(() => {
        checkUserLogin(currentUser, navigate)
    })
    
    function addStorage(){

    }
    
    return (
        <div className="container">
            <div className="input_space">
                <input placeholder="Storage Name" type="text" ref={storagename} />
            </div>
            <div className="input_space">
                <input placeholder="Storage Type" type="text" ref={storagetype} />
            </div>
            <button >Add Storage</button>
        </div>
    )
}

export default Storage;