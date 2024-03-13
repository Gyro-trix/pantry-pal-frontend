import { ALL_USERS, USER_MESSAGES } from "../config/localStorage";


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

export function displayMessages(targetUser, currentUser) {
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
                return (
                    <div className = "card" key={index}>
                        {message.from}:
                        {message.contents}
                        <button onClick={()=>deleteMessage(currentUser,message.time)}>X</button>
                    </div>
                )
            })
        }
        </div>
    )
}

export function submitMessage(targetUser, currentUser, contents) {
    const userMessagesStr = localStorage.getItem(USER_MESSAGES)
    const userMessages = userMessagesStr ? JSON.parse(userMessagesStr) : []
    const time = new Date().getTime()
    const message = { from: currentUser, to: targetUser, contents: contents, time: time,seen:false }
    let messages = [...userMessages, message]
    localStorage.setItem(USER_MESSAGES, JSON.stringify(messages))
}

export function deleteMessage(currentUser,time){
    const userMessagesStr = localStorage.getItem(USER_MESSAGES)
    const userMessages = userMessagesStr ? JSON.parse(userMessagesStr) : []
    let tempMessages = []
    userMessages.forEach(message =>{
        if(!((message.from === currentUser)&&(message.time === time))){
            tempMessages = [...tempMessages,message]
        }
    })

    localStorage.setItem(USER_MESSAGES,JSON.stringify(tempMessages))
}