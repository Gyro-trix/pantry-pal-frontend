import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CUR_USER, MESSAGE_USER } from "../config/localStorage";
import { checkUserLogin, getUserImage, getUserNameByID } from "../utils/users";
import { displayMessages, newMessagesForUser, submitMessage } from "../utils/messages";
import Avatar from 'react-avatar';

function UserMessages() {

    const [content, setContent] = useState("")
    const currentUserStr = localStorage.getItem(CUR_USER)
    const currentUser = JSON.parse(currentUserStr)
    const currentUsername = currentUser.username
    const [userList, setUserList] = useState(currentUser.friends)
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
                        let uname = getUserNameByID(user)
                        if (newMessagesForUser(uname, currentUsername)) {
                            dot = '\u2b24'
                        }
                        return (<button type="button" className="btn" key={index} style={{ marginTop: 16,background: "white",borderColor:"lightgrey" }} onClick={() => setTargetUser(uname)}>
                            <Avatar size = "32" round = {true} color={Avatar.getRandomColor('sitebase', ['cyan', 'lightblue', 'blue'])} src = {getUserImage(uname)} name={uname} textSizeRatio={2}/>
                            <span style ={{marginLeft:8}}>{uname}</span><sup style={{ color: "red" }}>{dot}</sup></button>)
                    })}
                </div>
                <div className=" col-8 " id="messages" style={{ margin: 8 }}>

                    <div className="card row" style={{ minHeight: 64, padding:8 }}>
                        {displayMessages(targetUser, currentUsername, navigate)}
                    </div>
                    <div className="card row" style ={{marginTop:16}}>
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
                            <button type="button" className="btn btn-primary" style={{ marginTop: 8, right: 8, float: "right" }} onClick={() => submitMessage(targetUser, currentUsername, content, navigate)}>Send</button>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserMessages