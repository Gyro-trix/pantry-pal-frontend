import { useNavigate,Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SIGN_IN, CREATE_STORAGE, USER_SETTINGS, NOTIFICATION, CREATERECIPES, DISPLAYRECIPES, MANAGEUSERS, CREATE_USER, USERMESSAGES, RECIPE_CENTRE } from "../config/routes";
import { numberOfNotifications } from "../utils/notifications";
import { CUR_USER, MESSAGE_USER } from "../config/localStorage";
import { getWindowDimensions } from "../utils/display";
import { anyNewMessages, getOtherUsers } from "../utils/messages";
import Avatar from 'react-avatar';

function NavBar() {
  const navigate = useNavigate()
  const currentUserStr = localStorage.getItem(CUR_USER)
  const currentUser = JSON.parse(currentUserStr ? currentUserStr : null)
  const [notificationCount, setNotificationCount] = useState(numberOfNotifications())
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);
  const { width, height } = windowDimensions;

  let currentUsername
  let currentAdminLevel
  let currentUserImage

  if (!(currentUserStr === null || currentUserStr.trim() === "")) {
    currentUserImage = currentUser.image
    currentUsername = currentUser.username
    currentAdminLevel = currentUser.adminlevel
  } else {
    currentUserImage = ""
    currentUsername = "No User"
    currentAdminLevel = 0
  }

  const userList = getOtherUsers(currentUsername)

  let dropDown
  let dropDownContent = <ul></ul>
  let allToDropDown = <ul></ul>
  let navBarContent = <ul></ul>
  let navBar = <ul></ul>

 
  let dot
  if (anyNewMessages(currentUsername)) {
    dot = '\u2b24'
  } else {
    dot = ''
  }
  
  useEffect(() => {
    setNotificationCount(numberOfNotifications())
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());

    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  switch (currentAdminLevel) {
    case 0:
      navBarContent = ""

      break;
    case 1:
      navBarContent = ""

      break;
    case 2:
      navBarContent = <ul className="navbar-nav">
        <li className="nav-item p-2"><Link className="nav-link active" aria-current="page" to="" >Home</Link></li>
        <li className="nav-item p-2"><Link className="nav-link" aria-current="page" to="createStorage" onClick={createStorage}>Add Storage</Link></li>
        <li className="nav-item p-2"><Link className="nav-link" aria-current="page" to="notifications" onClick={notifications}>Notifications<sup style={{ color: "red" }}>{notificationCount}</sup></Link></li>
        <li className="nav-item p-2"><Link className="nav-link" aria-current="page" to="recipes" onClick={displayRecipes}>Recipes</Link></li>
      </ul>
      dropDownContent = <ul className="dropdown-menu" style={{ padding: 8 }}>
        <li><Link className="dropdown-item" aria-current="page" to="usermessages" onClick={messages}>Messages<sup style={{ color: "red" }}>{dot}</sup></Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="userSettings" onClick={userSettings}>Settings</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="login" style={{ marginTop: 8 }} onClick={logOut}>Logout</Link></li>
      </ul>
      allToDropDown = <ul className="dropdown-menu" style={{ padding: 8 }}>
        <li><Link className="dropdown-item" aria-current="page" to="" >Home</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="createStorage" onClick={createStorage}>Add Storage</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="notifications" onClick={notifications}>Notifications<sup style={{ color: "red" }}>{notificationCount}</sup></Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="recipes" onClick={displayRecipes}>Recipes</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="usermessages" onClick={messages}>Messages<sup style={{ color: "red" }}>{dot}</sup></Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="userSettings" onClick={userSettings}>Settings</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="/login" onClick={logOut}>Logout</Link></li>
      </ul>
      break;
    case 3:
      navBarContent = <ul className="navbar-nav">
        <li className="nav-item p-2"><Link className="nav-link active" aria-current="page" to="" >Home</Link></li>
        <li className="nav-item p-2"><Link className="nav-link" aria-current="page" to="createStorage" >Add Storage</Link></li>
        <li className="nav-item p-2"><Link className="nav-link" aria-current="page" to="notifications" onClick={notifications}>Notifications<sup style={{ color: "red" }}>{notificationCount}</sup></Link></li>
        <li className="nav-item p-2"><Link className="nav-link" aria-current="page" to="createrecipes" onClick={createRecipes}>Add A Recipe</Link></li>
        <li className="nav-item p-2"><Link className="nav-link" aria-current="page" to="recipes" onClick={displayRecipes}>Recipes</Link></li>
        <li className="nav-item p-2"><Link className="nav-link" aria-current="page" to="recipecentre" onClick={recipecentre}>Recipe Centre</Link></li>
        <li className="nav-item p-2"><Link className="nav-link" aria-current="page" to="manageusers" onClick={manageUsers}>Manage Users</Link></li>
        <li className="nav-item p-2"><Link className="nav-link" aria-current="page" to="createuser" onClick={createUser}>Create User</Link></li>
      </ul>
      dropDownContent = <ul className="dropdown-menu" style={{ padding: 8 }}>
        <li><Link className="dropdown-item" aria-current="page" to="usermessages" onClick={messages}>Messages<sup style={{ color: "red" }}>{dot}</sup></Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="userSettings" onClick={userSettings}>Settings</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="login" style={{ marginTop: 8 }} onClick={logOut}>Logout</Link></li>
      </ul>
      allToDropDown = <ul className="dropdown-menu" style={{ padding: 8 }}>
        <li><Link className="dropdown-item" aria-current="page" to="" >Home</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="createStorage" onClick={createStorage}>Add Storage</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="notifications" onClick={notifications}>Notifications<sup style={{ color: "red" }}>{notificationCount}</sup></Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="createrecipes" onClick={createRecipes}>Add A Recipe</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="recipes" onClick={displayRecipes}>Recipes</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="manageusers" onClick={manageUsers}>Manage Users</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="createuser" onClick={createUser}>Create User</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="usermessages" onClick={messages}>Messages<sup style={{ color: "red" }}>{dot}</sup></Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="userSettings" onClick={userSettings}>Settings</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="login" onClick={logOut}>Logout</Link></li>
      </ul>
      break;
    default:
      navBarContent = ""

  }

  //Disable dropdown if no user
  let drop = "btn dropdown-toggle"
  if (currentUsername === "No User") {
    drop = "btn dropdown-toggle disabled"
  }

  if (width < 1000) {
    navBar = <ul></ul>
    dropDown = allToDropDown
  } else if (width >= 1000) {
    navBar = navBarContent
    dropDown = dropDownContent
  }

  function logOut() {
    localStorage.setItem(CUR_USER,"")
    navigate(SIGN_IN)
  }

  function createStorage() {
    navigate(CREATE_STORAGE)
  }

  function userSettings() {
    navigate(USER_SETTINGS)
  }

  function notifications() {
    navigate(NOTIFICATION)
  }

  function createRecipes() {
    navigate(CREATERECIPES)
  }

  function displayRecipes() {
    navigate(DISPLAYRECIPES)
  }

  function manageUsers() {
    navigate(MANAGEUSERS)
  }

  function createUser() {
    navigate(CREATE_USER)
  }

  function messages() {
    localStorage.setItem(MESSAGE_USER, userList[0] ? JSON.stringify(userList[0]) : "")
    navigate(USERMESSAGES)
  }

  function recipecentre(){
    navigate(RECIPE_CENTRE)
  }

  return (

    <nav  className="navbar navbar-expand sticky-top bg-body-tertiary" data-bs-theme="light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Pantry Pal</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {navBar}
        </div>
        <div className={"dropdown justify-content-left "} style={{ width: 160 }}>
          <button className={drop} style={{ width: 160, marginTop: 16 }} data-bs-toggle="dropdown" aria-expanded="false">
          <Avatar  style = {{marginRight:8}} size = "32" round = {true} color={Avatar.getRandomColor('sitebase', ['cyan', 'lightblue', 'blue'])} src = {currentUserImage} name={currentUsername} textSizeRatio={2}/> {currentUsername}
          </button>
          <ul>
            {dropDown}
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default NavBar;