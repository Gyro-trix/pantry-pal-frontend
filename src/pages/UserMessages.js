import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CUR_USER, MESSAGE_USER } from "../config/localStorage";
import { checkUserLogin } from "../utils/users";
import { displayMessages, getOtherUsers, newMessagesForUser, submitMessage } from "../utils/messages";

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
        localStorage.setItem(MESSAGE_USER, JSON.stringify(targetUser))
    }, [targetUser])

    const handleContentChange = e => {
        setContent(e.target.value)
    }

    return (
        <div className="container " style={{ padding: 8 }}>
            <div id="upper" className="row" style={{ padding: 8 }}>
                <div className="card col" id="users" style={{ margin: 8, paddingBottom: 8 }}>
                    {userList.map((user, index) => {
                        let dot = ''
                        if (newMessagesForUser(user, currentUser)) {
                            dot = '\u2b24'
                        }
                        return (<button type="button" className="btn btn-primary" key={index} style={{ marginTop: 8 }} onClick={() => setTargetUser(user)}>{user}<sup style={{ color: "red" }}>{dot}</sup></button>)
                    })}
                </div>
                <div className="card col-8 " id="messages" style={{ margin: 8, paddingBottom: 8 }}>
                    {displayMessages(targetUser, currentUser, navigate)}
                </div>
            </div>
            <div id="lower" className="card">

                <form id="messageinput" style={{ padding: 8 }}>
                    <textarea
                        id="messagecontents"
                        name="content"
                        className="card"
                        placeholder="Type Here"
                        rows={3}
                        style={{ width: "100%" }}
                        onChange={handleContentChange}>
                    </textarea>
                    <button type="button" className="btn btn-primary" style={{ marginTop: 8, right: 8, float: "right" }} onClick={() => submitMessage(targetUser, currentUser, content, navigate)}>Send</button>
                </form>

            </div>
        </div>
    )
}

export default UserMessages