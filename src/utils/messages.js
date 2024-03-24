import { ALL_USERS, USER_MESSAGES } from "../config/localStorage";
import { USERMESSAGES } from "../config/routes";
import Avatar from 'react-avatar';
import { getUserImage } from "./users";

export function getOtherUsers(currentUsername) {
    const allUserStr = localStorage.getItem(ALL_USERS)
    const allUserData = allUserStr ? JSON.parse(allUserStr) :[]
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
                    let hideDelete = false
                    const toStyle = { marginTop: 8, padding: 8, background: "white", marginLeft: 48 }
                    const fromStyle = { marginTop: 8, padding: 8, background: "lightcyan", marginRight: 48 }
                    let style = {}
                    if (message.from === currentUser) {
                        hideDelete = false
                        style = toStyle
                    } else {
                        hideDelete = true
                        style = fromStyle
                    }
                    if ((message.from === currentUser) || (message.seen)) {
                        hideSeen = true
                    }
                    return (
                        <div className="card" style={style} key={index}>
                            <span style={{ fontSize: 12 }}><Avatar  style = {{marginRight:8}} size = "24" round = {true} color={Avatar.getRandomColor('sitebase', ['cyan', 'lightblue', 'blue'])} src={getUserImage(message.from)} name={message.from} textSizeRatio={2}/>
                            {message.from}:</span>
                            <span style={{ marginLeft: 8, marginTop: 8, marginBottom: 8 }}>{message.contents}</span>
                            <form>
                                <span style={{ fontSize: 12 }} hidden={!(hideSeen) || (message.from === currentUser)}>Seen</span>
                                <button type="button" className="btn btn-primary" style={{ float: "right", fontSize: 12 }} hidden={hideDelete} onClick={() => deleteMessage(currentUser, message.time, navigate)}>X</button>
                                <button type="button" className="btn btn-primary" style={{ float: "right", fontSize: 12 }} hidden={hideSeen} onClick={() => markSeen(currentUser, message.time, navigate)}>S</button>
                            </form>
                        </div>
                    )
                })
            }
        </div>
    )
}

export function submitMessage(targetUser, currentUser, contents, navigate) {
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

export function newMessagesForUser(fromUser, currentUser) {
    const userMessagesStr = localStorage.getItem(USER_MESSAGES)
    const userMessages = userMessagesStr ? JSON.parse(userMessagesStr) : []
    let answer = false
    userMessages.every(message => {
        if ((message.to === currentUser) && (message.from === fromUser) && (message.seen === false)) {
            answer = true
            return false
        }
        return true
    })
    return answer
}

export function anyNewMessages(currentUser) {
    const userMessagesStr = localStorage.getItem(USER_MESSAGES)
    const userMessages = userMessagesStr ? JSON.parse(userMessagesStr) : []
    let answer = false
    userMessages.every(message => {
        if ((message.to === currentUser) && (message.seen === false)) {
            answer = true
            return false
        }
        return true
    })
    return answer
}

export function inviteUser(currentUser,emailToSearch){
    const allUserStr = localStorage.getItem(ALL_USERS)
    const allUserData = allUserStr ? JSON.parse(allUserStr) :[]
    

}