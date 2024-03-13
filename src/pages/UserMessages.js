import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CUR_USER, MESSAGE_USER } from "../config/localStorage";
import { checkUserLogin } from "../utils/users";
import { displayMessages, getOtherUsers, submitMessage } from "../utils/messages";

function UserMessages() {

    const [content, setContent] = useState("")
    const currentUserStr = localStorage.getItem(CUR_USER)
    const currentUser = JSON.parse(currentUserStr).username
    const [userList, setUserList] = useState(getOtherUsers(currentUser))
    const navigate = useNavigate();
    //localStorage.setItem(MESSAGE_USER,userList[0] ? JSON.stringify(userList[0]):"")
    const [targetUser, setTargetUser] = useState(JSON.parse(localStorage.getItem(MESSAGE_USER)))

    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    useEffect(() => {
        localStorage.setItem(MESSAGE_USER,JSON.stringify(targetUser))
    }, [targetUser ])

    const handleContentChange = e => {
        setContent(e.target.value)
    }
    
    return (
        <div className="container col-2">
            <div id="upper">
                <div className="card row" id="users">
                    {userList.map((user, index) => {
                        return (<button type="button" className="btn btn-primary" key={index} onClick={() => setTargetUser(user)}>{user}</button>)
                    })}
                </div>
                <div className="card row" id="messages">
                    {displayMessages(targetUser, currentUser,navigate)}
                </div>
            </div>
            <div id="lower">
                <form id="messageinput">
                    <textarea
                        id="messagecontents"
                        name="content"
                        onChange={handleContentChange}>
                    </textarea>
                    <button onClick={() => submitMessage(targetUser, currentUser, content, navigate)}>Send</button>
                </form>

            </div>
        </div>
    )
}

export default UserMessages