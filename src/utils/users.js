import { ALL_USERS, CUR_USER, USER_TO_EDIT, THEME } from "../config/localStorage"
import { HOME, SIGN_IN, MANAGEUSERS, EDITUSER } from "../config/routes"
import { cleanUpMessages } from "./messages";
import { cleanUpInvites, cleanUpNotifications, gatherNotifications } from "./notifications"
import React from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//Checks if a user is logged in
export function checkUserLogin(currentUserStr, navigate) {
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null
  if (currentUserStr === null || currentUserStr.trim() === "") {
    navigate(SIGN_IN)
  } else {
    gatherNotifications(currentUser)
  }
}
//Checks is a user is logged in and if it is an admin
export function checkAdminLogin(currentUser, navigate) {
  const userData = JSON.parse(currentUser)
  if (userData.adminlevel === 3) {
    checkUserLogin(currentUser, navigate)
  } else {
    navigate(HOME)
  }
}
//Login from server
export async function  logIn(attemptingUser) {

  const themeStr = localStorage.getItem(THEME)
  const theme = JSON.parse(themeStr)
  const loginPath = 'http://localhost:5001/api/auth/';
 
   const username= attemptingUser.username
    const password= attemptingUser.password
  
  try {
    const response = await fetch(loginPath, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username: username,password: password  })
    })
    const data = await response.json()

    if (response.ok) {
      //window.location.href = data.redirectUrl
    } else {
      console.log("huh")
    }

  } catch (error) {
    console.error('Error:', error)
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
      attemptingUser.image = allUserData[i].image
      attemptingUser.friends = allUserData[i].friends
      return true
    }
  }
  return false
}
//Add a new user
export async function addUser(userToRegister) {
  const themeStr = localStorage.getItem(THEME)
  const theme = JSON.parse(themeStr)
  
  const loginPath = 'http://localhost:5001/api/auth/';
 
  const username= userToRegister.username
  const password= userToRegister.password
  const email = userToRegister.email
  
  try {
    const response = await fetch(loginPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username,password: password, name: "Temp", email: email  })
    })

    const data = await response.json()
    
    if (response.ok) {
      window.location.href = data.redirectUrl
    } else {
      console.log("huh")
    }

  } catch (error) {
    console.error('Error:', error)
  }
}
  
  
  
  //Checks for null or empty values
  /*
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
        adminlevel: 2,
        friends: []
      }
      //Test newUser against current registered users, then adds to local storage All_USERS               
      if ((userExists(newUser) === false) && (userEmailExists(newUser) === false) && (checkEmailFormat(newUser) === true)) {
        userSave(newUser)
        localStorage.setItem(CUR_USER, JSON.stringify(newUser))
        navigate(HOME)
      }
    } else {
      toast("Passwords do not match.", { position: "bottom-right", theme: theme.toast })
    }
  }
  
}*/
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

export function checkEmailFormat(userToCheck) {
  const themeStr = localStorage.getItem(THEME)
  const theme = JSON.parse(themeStr)
  const emailRegex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
  const email = userToCheck.email
  const response = emailRegex.test(email)
  if (response === false) {
    toast("Email wrong format, Example: name@place.com", { position: "bottom-right", theme: theme.toast })
  }
  return response
}

export function userEmailExists(userToCheck) {
  const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))
  if (allUserData === null || allUserData === "") {
    return false
  }
  for (let i = 0; i < allUserData.length; i++) {
    if (allUserData[i].email === userToCheck.email) {
      return true
    }
  }
  return false
}

export function userEmailExistsBesidesSelf(userToCheck) {
  const allUserData = JSON.parse(localStorage.getItem(ALL_USERS))
  if (allUserData === null || allUserData === "") {
    return false
  }
  for (let i = 0; i < allUserData.length; i++) {
    if (allUserData[i].email === userToCheck.email && !(allUserData[i].id === userToCheck.id)) {
      return true
    }
  }
  return false
}

//Saves user to local storage, should work without modification
export function userSave(userToSave) {
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  userToSave.id = "" + new Date().getTime() + "-" + userToSave.username
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
  localStorage.setItem(CUR_USER, JSON.stringify(currentUser))
  cleanUpNotifications(currentUser.id)
  gatherNotifications(currentUser)
  window.dispatchEvent(new Event("navbar"))
  window.dispatchEvent(new Event("notify"))
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
  const themeStr = localStorage.getItem(THEME)
  const theme = JSON.parse(themeStr)
  return (
    <table className={theme.table}>
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
                <td >
                  {user.username}
                </td>
                <td >
                  {user.adminlevel}
                </td>
                <td >
                  <button className={theme.button} style={{ marginRight: 16 }} onClick={() => editUser(user, navigate)}>Edit User</button>
                  <button className={theme.button} onClick={() => deleteUser(user, navigate)}>Delete User</button>
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
  cleanUpMessages(userToDelete.username)
  cleanUpInvites(userToDelete.id)
  cleanUpNotifications(userToDelete.id)
  const filteredUsers = allUserData.filter(users => !users.id.match(new RegExp('^' + userToDelete.id + '$')))
  localStorage.setItem(ALL_USERS, JSON.stringify(filteredUsers))
  navigate(MANAGEUSERS)
}
//Open user edit page
export function editUser(userToEdit, navigate) {
  localStorage.setItem(USER_TO_EDIT, JSON.stringify(userToEdit))
  navigate(EDITUSER)
}

export function getUserImage(userID) {
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []
  const filteredUser = allUserData.filter(user => user.id.match(new RegExp('^' + userID + '$')))
  return filteredUser[0].image
}

export function getUserIDByEmail(emailToSearch) {
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []
  if (allUserData.length > 0) {
    const filteredUser = allUserData.filter(users => users.email.match(new RegExp('^' + emailToSearch + '$')))
    if (filteredUser.length > 0) {
      return filteredUser[0].id
    } else {
      return "No User Found"
    }
  }

}

export function getUserNameByID(idToSearch) {
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []
  if (allUserData.length > 0) {
    const filteredUser = allUserData.filter(users => users.id.match(new RegExp('^' + idToSearch + '$')))
    if (filteredUser.length > 0) {
      return filteredUser[0].username
    } else {
      return "No User Found"
    }
  }
}

export function addFriend(currentUser, friendToAddID) {
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []
  let filteredUsers = allUserData.filter(users => !users.id.match(new RegExp('^' + currentUser.id + '$')))
  filteredUsers = filteredUsers.filter(users => !users.id.match(new RegExp('^' + friendToAddID + '$')))
  let friendUserEntry = allUserData.filter(users => users.id.match(new RegExp('^' + friendToAddID + '$')))
  let friendUser = friendUserEntry[0]

  friendUser.friends.push(currentUser.id)
  filteredUsers = [...filteredUsers, friendUser]
  currentUser.friends.push(friendToAddID)
  filteredUsers = [...filteredUsers, currentUser]

  localStorage.setItem(CUR_USER, JSON.stringify(currentUser))
  localStorage.setItem(ALL_USERS, JSON.stringify(filteredUsers))

}

export function getUserByID(idToSearch) {
  const allUserDataStr = localStorage.getItem(ALL_USERS)
  const allUserData = allUserDataStr ? JSON.parse(allUserDataStr) : []
  const filteredUser = allUserData.filter(user => user.id.match(new RegExp('^' + idToSearch + '$')))
  console.log(filteredUser)
  return filteredUser
}