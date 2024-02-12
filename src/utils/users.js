import { ALL_USERS, CUR_USER } from "../config/localStorage"
import { SIGN_IN, HOME } from "../config/routes"

const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))

export function checkUserLogin(currentUser, navigate) {
  if (currentUser === null || currentUser.trim() === "") {
    console.log("Nav")
    navigate("/login")
  }
}

export function logIn(attemptingUser, navigate) {
  //const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))
  //Checks if both fields have a value
  if (attemptingUser.username && attemptingUser.password) {
    //Check for user in local storage
    if (validateUser(allUserData, attemptingUser) === false) {
      alert("Invalid")
    } else {
      localStorage.setItem(CUR_USER, JSON.stringify(attemptingUser))
      navigate(HOME)
    }

  }
}
export function validateUser(attemptingUser) {

  for (let i = 0; i < allUserData.length; i++) {
    //console.log(allUsers[i])
    if (allUserData[i].username === attemptingUser.username && allUserData[i].password === attemptingUser.password) {
      attemptingUser.id = allUserData[i].id
      attemptingUser.email = allUserData[i].email
      attemptingUser.notify = allUserData[i].notify
      attemptingUser.itemlimit = allUserData[i].itemlimit
      return true
    }
  }
  return false
}
//Add a new user
export function addUser(userToRegister, navigate) {
  //const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))
  //Checks for null values
  if (userToRegister.username && userToRegister.email && userToRegister.password && userToRegister.passwordchk) {
    console.log("Check 1")
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
        userSave(allUserData, newUser)
        localStorage.setItem(CUR_USER, JSON.stringify(newUser))
        navigate(HOME)
      }
    }
  }
}

export function userExists(userToCheck) {
  for (let i = 0; i < allUserData.length; i++) {
    console.log(userToCheck)
    console.log(allUserData.length, "  ", allUserData.username, "vs",userToCheck.username)
    if (allUserData[i].username === userToCheck.username) {
      console.log("User Exists")
      return true
    }
  }
  return false
}

//Saves user to local storage, should work without modification
export function userSave(allUsers, userToAdd) {
  let temparr = [...allUsers, userToAdd]
  allUsers = temparr
  localStorage.setItem(ALL_USERS, JSON.stringify(allUsers))
}

//Check used to update page on if username is valid
export function nameCheck(userToCheck) {
  if (!userExists(userToCheck)) {
    return true
  } else {
    return false

  }
}