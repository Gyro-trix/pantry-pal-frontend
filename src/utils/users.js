import { ALL_USERS, CUR_USER } from "../config/localStorage"
import { HOME, SIGN_IN } from "../config/routes"
import { gatherNotifications } from "./storage"
const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))

export function checkUserLogin(currentUser, navigate) {
  if (currentUser === null || currentUser.trim() === "") {
    navigate(SIGN_IN)
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
      gatherNotifications()
      navigate(HOME)
    }

  }
}
//Compares all users to the attempting user 
export function validateUser(attemptingUser) {
  for (let i = 0; i < allUserData.length; i++) {
    if (allUserData[i].username === attemptingUser.username && allUserData[i].password === attemptingUser.password) {
      attemptingUser.id = allUserData[i].id
      attemptingUser.email = allUserData[i].email
      attemptingUser.notify = allUserData[i].notify
      attemptingUser.itemlimit = allUserData[i].itemlimit
      attemptingUser.expirylimit = allUserData[i].expirylimit
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
      const date = new Date().getTime()
      const id = "" + date + "-" + userToRegister.username
      //Set if want notifications to false
      const notify = false
      //Set item limit threshold to 10
      const itemlimit = 10
      //Set expiry threshold to 7 days
      const expirylimit = 7
      //Complete entry for new user
      const newUser = { id: id, username: userToRegister.username, email: userToRegister.email, password: userToRegister.password, notify: notify, itemlimit: itemlimit, expirylimit: expirylimit }
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
export function userSave(userToAdd) {
  const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))
  let tempdata = allUserData
  let temparr = [...tempdata, userToAdd]
  localStorage.setItem(ALL_USERS, JSON.stringify(temparr))
}

export function saveUserSettings(currentUser) {
  const filteredUsers = allUserData.filter(users => !users.id.match(new RegExp('^' + currentUser.id + '$')))
  const newAllUsers = [...filteredUsers, currentUser]
  localStorage.setItem(ALL_USERS, JSON.stringify(newAllUsers))
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