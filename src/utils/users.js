import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export function checkUserLogin(currentUser, navigate) {
  if (currentUser === null || currentUser.trim() === "") {
    console.log("Nav")
    navigate("/login")
  }
}

export function logIn(attemptingUser, name, password) {
  //Checks if both fields have a value
  if (name.current.value && password.current.value) {
      attemptingUser.username = name.current.value
      attemptingUser.password = password.current.value
      //Check for user in local storage
      if (validateUser(allUserData, attemptingUser) === false) {
          alert("Invalid")
      } else {
          localStorage.setItem("CUR_USER", JSON.stringify(attemptingUser))
          navigate("/")
      }

  }
}
export function validateUser(allUsers, atUser) {
  for (let i = 0; i < allUsers.length; i++) {
      //console.log(allUsers[i])
      if (allUsers[i].username === atUser.username && allUsers[i].password === atUser.password) {
          attemptingUser.id = allUsers[i].id
          attemptingUser.email = allUsers[i].email
          attemptingUser.notify = allUsers[i].notify
          attemptingUser.itemlimit = allUsers[i].itemlimit
          return true
      }
  }
  return false
}

export function addUser(allUserData, name, email, password) {
  //Checks if all text fields are full
  if (name.current.value && email.current.value && password.current.value && passwordchk.current.value) {
      //Checks that both passwords and passwordchk are the same 
      if (password.current.value === passwordchk.current.value) {
          const nm = name.current.value
          const em = email.current.value
          const pw = password.current.value
          //Create ID from current date and username
          const date = new Date()
          const day = date.getUTCDate()
          const month = date.getUTCMonth() + 1
          const year = date.getUTCFullYear()
          const id = "" + year + month + day + "-" + nm
          const notify = false
          const itemlimit = 10
          //Complete entry for new user
          const newUser = { id: id, username: nm, email: em, password: pw, notify: notify, itemlimit: itemlimit}
          //Test newUser against current registered users, then adds to local storage All_USERS               
          if ( userExists(allUserData, newUser) === false) {
              userSave(allUserData, newUser)
              localStorage.setItem("CUR_USER", JSON.stringify(newUser))
              navigate("/")
          }
      }
  }
}

export function userExists(allUsers, userToAdd) {
  for (let i = 0; i < allUsers.length; i++){
      if (allUsers[i].username === userToAdd.username){
          return true
      }
  }
  return false
}

//Saves user to local storage, should work without modification
export function userSave(allUsers, userToAdd) {
  let temparr = [...allUsers,userToAdd]
  allUsers = temparr
  localStorage.setItem("ALL_USERS", JSON.stringify(allUsers))
}

//Check used to update page on if username is valid
export function nameCheck(allUserData, name) {
  const temp = {username: name.current.value}
  if (!userExists(allUserData, temp)) {
      //setColor('green')
      //setText("Username Available")
  } else {
      //setColor('red')
      //setText("Username Taken")
  }
}