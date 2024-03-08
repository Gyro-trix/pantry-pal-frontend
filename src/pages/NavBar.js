import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SIGN_IN, CREATE_STORAGE, USER_SETTINGS, NOTIFICATION, CREATERECIPES, DISPLAYRECIPES, MANAGEUSERS, CREATE_USER } from "../config/routes";
import { numberOfNotifications } from "../utils/notifications";
import { CUR_USER } from "../config/localStorage";
import { getWindowDimensions } from "../utils/display";

function NavBar() {
  const navigate = useNavigate()
  const currentUserStr = localStorage.getItem(CUR_USER)
  const [notificationCount, setNotificationCount] = useState(numberOfNotifications())
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);
  const { width, height } = windowDimensions;



  let currentUsername
  let currentAdminLevel
  if (!(currentUserStr === null || currentUserStr.trim() === "")) {
    const currentUser = JSON.parse(currentUserStr)
    currentUsername = currentUser.username
    currentAdminLevel = currentUser.adminlevel
  } else {
    currentUsername = "No User"
    currentAdminLevel = 0
  }

  let dropDown
  let dropDownContent = <ul></ul>
  let allToDropDown = <ul></ul>
  let navBarContent = <ul></ul>
  let navBar = <ul></ul>
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
        <li className="nav-item p-2"><a className="nav-link active" aria-current="page" href="/#" >Home</a></li>
        <li className="nav-item p-2"><a className="nav-link" aria-current="page" href="/createStorage#" onClick={createStorage}>Add Storage</a></li>
        <li className="nav-item p-2"><a className="nav-link" aria-current="page" href="/notifications#" onClick={notifications}>Notifications<sup style={{ color: "red" }}>{notificationCount}</sup></a></li>
        <li className="nav-item p-2"><a className="nav-link" aria-current="page" href="/recipes#" onClick={displayRecipes}>Recipes</a></li>
      </ul>
      dropDownContent = <ul className="dropdown-menu" style={{ padding: 8 }}>
        <li><a className="dropdown-item" aria-current="page" href="/userSettings#" onClick={userSettings}>Settings</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/login#" style={{ marginTop: 8 }} onClick={logOut}>Logout</a></li>
      </ul>
      allToDropDown = <ul className="dropdown-menu" style={{ padding: 8 }}>
        <li><a className="dropdown-item" aria-current="page" href="/#" >Home</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/createStorage#" onClick={createStorage}>Add Storage</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/notifications#" onClick={notifications}>Notifications<sup style={{ color: "red" }}>{notificationCount}</sup></a></li>
        <li><a className="dropdown-item" aria-current="page" href="/recipes#" onClick={displayRecipes}>Recipes</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/userSettings#" onClick={userSettings}>Settings</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/login#" onClick={logOut}>Logout</a></li>
      </ul>
      break;
    case 3:
      navBarContent = <ul className="navbar-nav">
        <li className="nav-item p-2"><a className="nav-link active" aria-current="page" href="/#" >Home</a></li>
        <li className="nav-item p-2"><a className="nav-link" aria-current="page" href="/createStorage#" onClick={createStorage}>Add Storage</a></li>
        <li className="nav-item p-2"><a className="nav-link" aria-current="page" href="/notifications#" onClick={notifications}>Notifications<sup style={{ color: "red" }}>{notificationCount}</sup></a></li>
        <li className="nav-item p-2"><a className="nav-link" aria-current="page" href="/createrecipes#" onClick={createRecipes}>Add A Recipe</a></li>
        <li className="nav-item p-2"><a className="nav-link" aria-current="page" href="/recipes#" onClick={displayRecipes}>Recipes</a></li>
        <li className="nav-item p-2"><a className="nav-link" aria-current="page" href="/manageusers#" onClick={manageUsers}>Manage Users</a></li>
        <li className="nav-item p-2"><a className="nav-link" aria-current="page" href="/createuser#" onClick={createUser}>Create User</a></li>
      </ul>
      dropDownContent = <ul className="dropdown-menu" style={{ padding: 8 }}>
        <li><a className="dropdown-item" aria-current="page" href="/userSettings#" onClick={userSettings}>Settings</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/login#" style={{ marginTop: 8 }} onClick={logOut}>Logout</a></li>
      </ul>
      allToDropDown = <ul className="dropdown-menu" style={{ padding: 8 }}>
        <li><a className="dropdown-item" aria-current="page" href="/#" >Home</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/createStorage#" onClick={createStorage}>Add Storage</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/notifications#" onClick={notifications}>Notifications<sup style={{ color: "red" }}>{notificationCount}</sup></a></li>
        <li><a className="dropdown-item" aria-current="page" href="/createrecipes#" onClick={createRecipes}>Add A Recipe</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/recipes#" onClick={displayRecipes}>Recipes</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/manageusers#" onClick={manageUsers}>Manage Users</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/createuser#" onClick={createUser}>Create User</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/userSettings#" onClick={userSettings}>Settings</a></li>
        <li><a className="dropdown-item" aria-current="page" href="/login#" onClick={logOut}>Logout</a></li>
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

  return (

    <nav style = {{minWidth:600}} className="navbar navbar-expand bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#">Pantry Pal</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {navBar}
        </div>
        <div className={"dropdown justify-content-left "} style={{ width: 160 }}>
          <button className={drop} style={{ width: 160, marginTop: 16 }} data-bs-toggle="dropdown" aria-expanded="false">
            {currentUsername}
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