import { ALL_USERS, CUR_USER, USER_TO_EDIT } from "../config/localStorage"
import { HOME, SIGN_IN, MANAGEUSERS, EDITUSER } from "../config/routes"
import { gatherNotifications } from "./notifications"
//Checks if a user is logged in
export function checkUserLogin(currentUser, navigate) {
  if (currentUser === null || currentUser.trim() === "") {
    navigate(SIGN_IN)
  } else {
    gatherNotifications()
  }
}
//Checks is a user is logged in and if it is an admin
export function checkAdminLogin(currentUser, navigate){
  const userData = JSON.parse(currentUser)
  if(userData.adminlevel === 3){
    checkUserLogin(currentUser, navigate)
  } else {
    navigate(HOME)
  }
}
//Basic login function
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
        id: "",
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
  userToSave.id ="" + new Date().getTime() + "-" + userToSave.username
  let temparr
  if (!(allUserDataStr === null || allUserDataStr.trim() === "")) {
    const allUserData = JSON.parse(allUserDataStr)
    temparr = [...allUserData, userToSave]
  } else {
    temparr = [userToSave]
  }
  localStorage.setItem(ALL_USERS, JSON.stringify(temparr))
}
//Save current user to all users in local storage
export function saveUserSettings(currentUser) {
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []
  const filteredUsers = allUserData.filter(users => !users.id.match(new RegExp('^' + currentUser.id + '$')))
  const newAllUsers = [...filteredUsers, currentUser]
  localStorage.setItem(ALL_USERS, JSON.stringify(newAllUsers))
}
//Changes current users passwords
export function changeUserPassword(passwords) {
  const currentUser = JSON.parse(localStorage.getItem(CUR_USER))
  if (currentUser.password === passwords.currentpassword) {
    if (passwords.newpassword === passwords.newpasswordcheck) {
      currentUser.password = passwords.newpassword
      localStorage.setItem(CUR_USER, JSON.stringify(currentUser))
      saveUserSettings(currentUser)
      return true
    } else {
      return false
    }

  }
}
//Admin change password
export function adminPasswordChange(passwords) {
  const userToEdit = JSON.parse(localStorage.getItem(USER_TO_EDIT))
  if (userToEdit.password === passwords.currentpassword) {
    if (passwords.newpassword === passwords.newpasswordcheck) {
      userToEdit.password = passwords.newpassword
      localStorage.setItem(USER_TO_EDIT, JSON.stringify(userToEdit))
      saveUserSettings(userToEdit)
      return true
    } else {
      return false
    }

  }
}
//Returns the current users username
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
//Display each user admin level 2 or less and provides edit and delete options
export function displayUsers(navigate) {
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []
  return (
    <table className="table table-info table-striped">
      <tbody>
        <tr key="header">
          <th scope="col">Username</th>
          <th scope="col">Admin Level</th>
          <th scope="col">Options</th>
        </tr>
        {allUserData.map(user => {
          if (user.adminlevel <= 2) {
            return (
              <tr key={user.id}>
                <td>
                  {user.username}
                </td>
                <td>
                  {user.adminlevel}
                </td>
                <td>
                  <button onClick={() => editUser(user, navigate)}>Edit User</button>
                  <button onClick={() => deleteUser(user, navigate)}>Delete User</button>
                </td>
              </tr>
            )
          } else {
            return ("")
          }
        })}
      </tbody>
    </table>
  )
}
//Filters out userToDelete and restores in local storage
export function deleteUser(userToDelete, navigate) {
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []
  const filteredUsers = allUserData.filter(users => !users.id.match(new RegExp('^' + userToDelete.id + '$')))
  localStorage.setItem(ALL_USERS, JSON.stringify(filteredUsers))
  navigate(MANAGEUSERS)
}
//Open user edit page
export function editUser(userToEdit, navigate) {
  localStorage.setItem(USER_TO_EDIT, JSON.stringify(userToEdit))
  navigate(EDITUSER)
}