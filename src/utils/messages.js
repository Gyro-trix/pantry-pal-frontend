import { ALL_USERS, USER_MESSAGES } from "../config/localStorage";
import { USERMESSAGES } from "../config/routes";


export function getOtherUsers(currentUsername) {
    const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))
    let otherUsers = []
    allUserData.forEach(element => {
        if (!(element.username === currentUsername)) {
            otherUsers.push(element.username)
        }
    });
    return otherUsers
}

export function displayMessages(targetUser, currentUser, navigate) {
    const userMessagesStr = localStorage.getItem(USER_MESSAGES)
    const userMessages = userMessagesStr ? JSON.parse(userMessagesStr) : []
    
    let messages = []
    userMessages.forEach(message => {
        if ((message.from === targetUser) && (message.to === currentUser)) {
            messages.push(message)
        } else if ((message.from === currentUser) && (message.to === targetUser)) {
            messages.push(message)
        }
    })
    let orderedMessages = messages
    return (
        <div>
            {
                orderedMessages.map((message, index) => {
                    let hideSeen = false
                    let disableDelete = false
                    if ((message.from === currentUser) || (message.seen)) {
                        hideSeen = true
                    }
                    return (
                        <div className="card" key={index}>
                            {message.from}:
                            {message.contents}
                            <span hidden={!(hideSeen) || (message.from === currentUser)}>Seen</span>
                            <button type="button" className="btn btn-primary" disabled = {disableDelete} onClick={() => deleteMessage(currentUser, message.time,navigate)}>X</button>
                            <button type="button" className="btn btn-primary" hidden={hideSeen} onClick={() => markSeen(currentUser, message.time,navigate)}>S</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export function submitMessage(targetUser, currentUser, contents,navigate) {
    const userMessagesStr = localStorage.getItem(USER_MESSAGES)
    const userMessages = userMessagesStr ? JSON.parse(userMessagesStr) : []
    const time = new Date().getTime()
    const message = { from: currentUser, to: targetUser, contents: contents, time: time, seen: false }
    let messages = [...userMessages, message]
    localStorage.setItem(USER_MESSAGES, JSON.stringify(messages))
    navigate(USERMESSAGES)
}

export function deleteMessage(currentUser, time, navigate) {
    const userMessagesStr = localStorage.getItem(USER_MESSAGES)
    const userMessages = userMessagesStr ? JSON.parse(userMessagesStr) : []
    let tempMessages = []
    userMessages.forEach(message => {
        if (!((message.from === currentUser) && (message.time === time))) {
            tempMessages = [...tempMessages, message]
        }
    })
    localStorage.setItem(USER_MESSAGES, JSON.stringify(tempMessages))
    navigate(USERMESSAGES)
}

export function markSeen(currentUser, time, navigate) {
    const userMessagesStr = localStorage.getItem(USER_MESSAGES)
    const userMessages = userMessagesStr ? JSON.parse(userMessagesStr) : []
    let tempMessages = []
    userMessages.forEach(message => {
        if ((message.to === currentUser) && (message.time === time)) {
            message.seen = true
        }
        tempMessages = [...tempMessages, message]
    })
    localStorage.setItem(USER_MESSAGES, JSON.stringify(tempMessages))
    navigate(USERMESSAGES)
}