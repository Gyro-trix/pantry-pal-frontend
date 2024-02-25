import { ALL_USERS, CUR_USER } from "../config/localStorage"
import { HOME, SIGN_IN } from "../config/routes"
import { gatherNotifications } from "./notifications"

export function checkUserLogin(currentUser, navigate) {
  if (currentUser === null || currentUser.trim() === "") {
    navigate(SIGN_IN)
  } else{
    gatherNotifications()
  }
}

export function logIn(attemptingUser, navigate) {
  //Checks if both fields have a value
  if (attemptingUser.username && attemptingUser.password) {
    //Check for user in local storage
    if (validateUser(attemptingUser) === false) {
      alert("Invalid Username or Password")
    } else {
      localStorage.setItem(CUR_USER, JSON.stringify(attemptingUser))
      navigate(HOME)
    }

  }
}
//Compares all users to the attempting user 
export function validateUser(attemptingUser) {
  const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))
  for (let i = 0; i < allUserData.length; i++) {
    if (allUserData[i].username === attemptingUser.username && allUserData[i].password === attemptingUser.password) {
      attemptingUser.id = allUserData[i].id
      attemptingUser.email = allUserData[i].email
      attemptingUser.notify = allUserData[i].notify
      attemptingUser.itemlimit = allUserData[i].itemlimit
      attemptingUser.expirylimit = allUserData[i].expirylimit
      attemptingUser.adminlevel = allUserData[i].adminlevel
      return true
    }
  }
  return false
}
//Add a new user
export function addUser(userToRegister, navigate) {
  //Checks for null or empty values
  if (userToRegister.username && userToRegister.email && userToRegister.password && userToRegister.passwordchk) {
    //Checks that both passwords and passwordchk are the same 
    if (userToRegister.password === userToRegister.passwordchk) {
      //Create ID from current date and username
      const newUser = {
        id: "" + new Date().getTime() + "-" + userToRegister.username,
        username: userToRegister.username,
        email: userToRegister.email,
        password: userToRegister.password,
        notify: false,
        itemlimit: 10,
        expirylimit: 7,
        adminlevel: 2
      }
      //Test newUser against current registered users, then adds to local storage All_USERS               
      if (userExists(newUser) === false) {
        userSave(newUser)
        localStorage.setItem(CUR_USER, JSON.stringify(newUser))
        navigate(HOME)
      }
    }
  }
}
//Checks if the User already exists
export function userExists(userToCheck) {
  const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))
  if (allUserData === null || allUserData === "") {
    return false
  }
  for (let i = 0; i < allUserData.length; i++) {
    if (allUserData[i].username === userToCheck.username) {
      return true
    }
  }
  return false
}
//Saves user to local storage, should work without modification
export function userSave(userToSave) {
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  let temparr
  if (!(allUserDataStr === null || allUserDataStr.trim() === "")) {
    const allUserData = JSON.parse(allUserDataStr)
    temparr = [...allUserData, userToSave]
  } else {
    temparr = [userToSave]
  }
  localStorage.setItem(ALL_USERS, JSON.stringify(temparr))
}

export function saveUserSettings(currentUser) {
  const filteredUsers = allUserData.filter(users => !users.id.match(new RegExp('^' + currentUser.id + '$')))
  const newAllUsers = [...filteredUsers, currentUser]
  localStorage.setItem(ALL_USERS, JSON.stringify(newAllUsers))
}

export function changeUserPassword(passwords) {
  const currentUser = JSON.parse(localStorage.getItem(CUR_USER))
  if (currentUser.password === passwords.currentpassword){
    if(passwords.newpassword === passwords.newpasswordcheck){
      currentUser.password = passwords.newpassword
      localStorage.setItem(CUR_USER,JSON.stringify(currentUser))
      saveUserSettings(currentUser)
      return true
    } else {
      return false
    }

  }
}

export function getCurrentUsername() {
  const currentUserStr = localStorage.getItem(CUR_USER)
  if (!(currentUserStr === null || currentUserStr.trim() === "")) {
    const currentUser = JSON.parse(currentUserStr)

    const username = currentUser.username
    return username
  } else {
    return "No User"
  }
}

export function displayUsers(){
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []
  return allUserData.map((user,index) =>{
    if (user.adminlevel <= 2){
      return (
        <div key = {index}>
          <span>{user.username}</span>
        </div>
      )
    }
  })
}

export function deleteUser(userToDelete){
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []
  const filteredUsers = allUserData.filter(users => !users.id.match(new RegExp('^' + userToDelete.id + '$')))
  localStorage.setItem(ALL_USERS, JSON.stringify(filteredUsers))
}

export function editUser(userToEdit){
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []

}