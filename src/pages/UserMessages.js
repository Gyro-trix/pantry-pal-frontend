import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CUR_USER } from "../config/localStorage";
import { checkUserLogin } from "../utils/users";
import { displayMessages, getOtherUsers, submitMessage } from "../utils/messages";

function UserMessages() {
    
    const [message, setMessage] = useState({ from: "", to: "", content: "", time: "" })
    const [targetUser, setTargetUser] = useState("Matt")
    const [content, setContent] = useState("")
    const currentUserStr = localStorage.getItem(CUR_USER)
    const currentUser = JSON.parse(currentUserStr).username
    const [userList, setUserList] = useState(getOtherUsers(currentUser))
    const navigate = useNavigate();
    
    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    const handleContentChange = e => {
        setContent(e.target.value)
    }
console.log(userList)
    return (
        <div className="container col-2">
            <div  id="upper">
                <div className="card row" id="users">
                    {userList.map((user,index)=>{
                        return(<button key ={index} onClick={()=>setTargetUser(user)}>{user}</button>)
                    })}
                </div>
                <div className="card row" id="messages">
                    {displayMessages(targetUser,currentUser)}
                </div>
            </div>
            <div id="lower">
                <form id="messageinput">
                    <textarea
                        id="messagecontents"
                        name="content"
                        onChange={handleContentChange}>
                    </textarea>
                    <button onClick={() => submitMessage(targetUser, currentUser, content)}>Send</button>
                </form>

            </div>
        </div>
    )
}

export default UserMessages