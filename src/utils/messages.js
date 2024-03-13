import { ALL_USERS } from "../config/localStorage";

export function getUsers(currentUsername){
    const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))
    let otherUsers = []
    allUserData.forEach(element => {
        if(!(element.username === currentUsername)){
            otherUsers.push(element.username)
        }
        
        
    });
    return otherUsers
}

export function getMessages(targetUser){
    
}