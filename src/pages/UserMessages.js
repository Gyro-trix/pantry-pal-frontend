import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CUR_USER, MESSAGE_USER, THEME } from "../config/localStorage";
import { checkUserLogin, getUserImage, getUserNameByID } from "../utils/users";
import { displayMessages, inviteUser, newMessagesForUser, submitMessage } from "../utils/messages";
import Avatar from 'react-avatar';
import { displayInvitesSmall, displayPendingInvites } from "../utils/notifications";

function UserMessages() {
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)
    const [content, setContent] = useState("")
    const currentUserStr = localStorage.getItem(CUR_USER)
    const currentUser = JSON.parse(currentUserStr)
    const currentUsername = currentUser.username
    const [inviteEmail, setInviteEmail] = useState("")
    const [userList, setUserList] = useState(currentUser.friends ? currentUser.friends : [])
    const navigate = useNavigate();
    if(userList.length >0){
        localStorage.setItem(MESSAGE_USER, userList[0] ? JSON.stringify(userList[0]) : "")
    }
    const targetUserStr = localStorage.getItem(MESSAGE_USER)
    const [targetUser, setTargetUser] = useState(targetUserStr ? JSON.parse(targetUserStr) : "")

    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    useEffect(() => {
        localStorage.setItem(MESSAGE_USER, JSON.stringify(targetUser))
    }, [targetUser])

    const handleContentChange = e => {
        setContent(e.target.value)
    }

    const handleInvite = e => {
        setInviteEmail(e.target.value)
    }

    return (
        <div className="container " style={{ padding: 8 , minHeight:480}}>
            <div id="upper" className="row" style={{ padding: 8 }}>
                <div className="card col-4" id="users" style={{ display: "grid", margin: 8, paddingBottom: 8 }}>
                    {userList.map((user, index) => {
                        let dot = ''
                        let uname = getUserNameByID(user)
                        if (newMessagesForUser(uname, currentUsername)) {
                            dot = '\u2b24'
                        }
                        return (<button type="button" className={theme.button} key={index} style={{ marginTop: 16, maxHeight:58 }} onClick={() => setTargetUser(uname)}>
                            <Avatar size="32" round={true} color={Avatar.getRandomColor('sitebase', theme.avatar)} src={getUserImage(uname)} name={uname} textSizeRatio={2} />
                            <span style={{ marginLeft: 8 }}>{uname}</span><sup style={{ color: "red" }}>{dot}</sup></button>)
                    })}
                    <div className="card col" style={{ marginTop: "auto" }}>
                    {displayInvitesSmall(currentUser)}
                    {displayPendingInvites(currentUser)}
                        <div className="col">
                            <div className="card" style={{ padding: 16,border:0 }}>
                                <form>
                                    <input
                                        className="form-control"
                                        style={{ marginRight: 16 }}
                                        type="text"
                                        onChange={handleInvite}
                                        name="invite"
                                        placeholder="Invite by Email"
                                    ></input>
                                </form>
                                <button type="button" className={theme.button} style={{ marginTop: 16 }} onClick={() => { 
                                    inviteUser(currentUser, inviteEmail)
                                 window.location.reload()
                                 }}>Invite</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" col-7 " id="messages" style={{ margin: 8 }}>

                    <div className="card row" style={{ minHeight: 64, padding: 8 }}>
                        {displayMessages(targetUser, currentUsername, navigate)}
                    </div>
                    <div className="card row" style={{ marginTop: 16 }}>
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
                            <button type="button" className={theme.button} style={{ marginTop: 8, right: 8, float: "right" }} onClick={() => submitMessage(targetUser, currentUsername, content, navigate)}>Send</button>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserMessages