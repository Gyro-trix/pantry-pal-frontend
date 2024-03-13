import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function UserMessages() {
    
    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate();

    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
      }, [currentUserStr, navigate])

    return (
        <div className = "container">
            <div id="upper">
                <div id="users"></div>
                <div id="messages"></div>
            </div>
            <div id="lower">
                <div id="messageinput"></div>
                <button>Send</button>
            </div>
        </div>
    )
}

export default UserMessages