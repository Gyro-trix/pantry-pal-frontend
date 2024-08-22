import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SIGN_IN, CREATE_STORAGE, USER_SETTINGS, NOTIFICATION, CREATERECIPES, DISPLAYRECIPES, MANAGEUSERS, CREATE_USER, USERMESSAGES, RECIPE_CENTRE } from "../config/routes";
import { numberOfNotifications } from "../utils/notifications";
import { CUR_USER, MESSAGE_USER, THEME } from "../config/localStorage";
import { changeTheme, getWindowDimensions, storageTotal } from "../utils/display";
import { anyNewMessages } from "../utils/messages";
import Logov1 from '../images/Logov1.png'
import Avatar from 'react-avatar';
import * as Icon from 'react-bootstrap-icons';
import { lightTheme } from "../utils/display";

function NavBar() {
  const navigate = useNavigate()
  const currentUserStr = localStorage.getItem(CUR_USER)
  const currentUser = JSON.parse(currentUserStr ? currentUserStr : null)

  const themeStr = localStorage.getItem(THEME)
  const [theme, setTheme] = useState((themeStr !== null && themeStr !== "") ? JSON.parse(themeStr) : lightTheme)
  const [notificationCount, setNotificationCount] = useState(numberOfNotifications())
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);
  const { width } = windowDimensions;

  let themeSwitch = true
  let currentUsername
  let currentAdminLevel
  let currentUserImage
  let currentUserID
  let dropdownHidden
  let friendsList

  if (!(currentUserStr === null || currentUserStr.trim() === "")) {
    dropdownHidden = false
    currentUserImage = currentUser.image
    currentUsername = currentUser.name
    currentUserID = currentUser.id
    currentAdminLevel = currentUser.adminlevel
    friendsList = currentUser.friends
  } else {
    dropdownHidden = true
    currentUserImage = ""
    currentUsername = "No User"
    currentUserID = "No ID"
    currentAdminLevel = 0
    friendsList = []
  }

  if (theme.name === "dark") {
    themeSwitch = true
  } else if (theme.name === "light") {
    themeSwitch = false
  }

  let dropDown
  let dropDownContent = <ul></ul>
  let allToDropDown = <ul></ul>
  let navBarContent = <ul></ul>
  let navBar = <ul></ul>


  let dot
  if (anyNewMessages(currentUserID)) {
    dot = '\u2b24'
  } else {
    dot = ''
  }

  useEffect(() => {
    setNotificationCount(numberOfNotifications())
    console.log(storageTotal())
  }, [])

  useEffect(() => {
    function handleRefresh() {
      setNotificationCount(numberOfNotifications())

    }
    window.addEventListener('notify', handleRefresh);
    return () => window.removeEventListener('notify', handleRefresh);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());

    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleProfile() {
      setTheme(JSON.parse(localStorage.getItem(THEME)));
    }
    window.addEventListener('navbar', handleProfile);
    return () => window.removeEventListener('navbar', handleProfile);
  }, []);

  switch (currentAdminLevel) {
    case 0:
      navBarContent = ""

      break;
    case 1:
      navBarContent = <ul className="navbar-nav">
        <li className="nav-item p-2"><Link className="nav-link active" aria-current="page" to="" >Home</Link></li>
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
        <li><Link className="dropdown-item" aria-current="page" to="notifications" onClick={notifications}>Notifications<sup style={{ color: "red" }}>{notificationCount}</sup></Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="recipes" onClick={displayRecipes}>Recipes</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="usermessages" onClick={messages}>Messages<sup style={{ color: "red" }}>{dot}</sup></Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="userSettings" onClick={userSettings}>Settings</Link></li>
        <li><Link className="dropdown-item" aria-current="page" to="/login" onClick={logOut}>Logout</Link></li>
      </ul>

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

      </ul>
      dropDownContent = <ul className="dropdown-menu" style={{ padding: 8 }}>
        <li className="nav-item p-2"><Link className="dropdown-item" aria-current="page" to="manageusers" onClick={manageUsers}>Manage Users</Link></li>
        <li className="nav-item p-2"><Link className="dropdown-item" aria-current="page" to="createuser" onClick={createUser}>Create User</Link></li>
        <li className="nav-item p-2"><Link className="dropdown-item" aria-current="page" to="usermessages" onClick={messages}>Messages<sup style={{ color: "red" }}>{dot}</sup></Link></li>
        <li className="nav-item p-2"><Link className="dropdown-item" aria-current="page" to="userSettings" onClick={userSettings}>Settings</Link></li>
        <li className="nav-item p-2"><Link className="dropdown-item" aria-current="page" to="login" style={{ marginTop: 8 }} onClick={logOut}>Logout</Link></li>
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
  let drop = "nav-link dropdown-toggle"
  if (currentUsername === "No User") {
    drop = "nav-link dropdown-toggle disabled"
  }

  if (width < 1000) {
    navBar = <ul></ul>
    dropDown = allToDropDown
  } else if (width >= 1000) {
    navBar = navBarContent
    dropDown = dropDownContent
  }

  function logOut() {
    localStorage.setItem(CUR_USER, "")
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
    if (friendsList.length > 0) {
      localStorage.setItem(MESSAGE_USER, friendsList[0] ? JSON.stringify(friendsList[0]) : "")
    }
    navigate(USERMESSAGES)
  }

  function recipecentre() {
    navigate(RECIPE_CENTRE)
  }

  function delayThemeSwitch() {

    changeTheme()
    setTheme(JSON.parse(localStorage.getItem(THEME)))
    
  }

  return (

    <nav className="navbar navbar-expand sticky-top bg-body-tertiary" data-bs-theme={theme.navbar}>
      <div className="container-fluid">
        <Link className="navbar-brand" aria-current="page" to="" ><img src={Logov1} width={48} height={48} alt="Logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {navBar}
        </div>
        <div>
          <Icon.SunFill color="powderblue" hidden={themeSwitch} style={{ animation: "fadeIn 1s" }} onClick={() => delayThemeSwitch()} size={24} />
          <Icon.MoonFill color="grey" hidden={!themeSwitch} style={{ animation: "fadeIn 1s" }} onClick={() => delayThemeSwitch()} size={24} />
        </div>
        <div className="dropdown justify-content-left " hidden={dropdownHidden} style={{ marginLeft: 16, marginRight: 32, width: 160 }}>
          <a href="/" className={drop} style={{ color: theme.dropdown, width: 160, marginTop: 16 }} data-bs-toggle="dropdown" aria-expanded="false">
            <Avatar size="32" round={true} color={Avatar.getRandomColor('sitebase', theme.avatar)} src={currentUserImage} name={currentUsername} textSizeRatio={2} /><sup style={{ marginLeft: -8, color: "red" }}>{dot}</sup> <span style={{ marginLeft: 16 }}>{currentUsername}</span>
          </a>
          <ul>
            {dropDown}
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default NavBar;