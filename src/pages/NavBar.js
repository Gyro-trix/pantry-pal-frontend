import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SIGN_IN, CREATE_STORAGE, USER_SETTINGS, NOTIFICATION, RECIPES } from "../config/routes";
import { numberOfNotifications } from "../utils/storage";
import { CUR_USER } from "../config/localStorage";

function NavBar() {
  const navigate = useNavigate()
  const currentUserStr = localStorage.getItem(CUR_USER)
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

  const [notificationCount, setNotificationCount] = useState(numberOfNotifications())

  //Disable dropdown if no user
  let dropdown = "btn dropdown-toggle"
  if (currentUsername === "No User") {
    dropdown = "btn dropdown-toggle disabled"
  }
  let recipeLink
  if (currentAdminLevel === 3) {
    recipeLink = <li className="nav-item p-2">
      <a className="nav-link" aria-current="page" href="/recipes#" onClick={recipes}>Add A Recipe</a>
    </li>
  } else if (currentAdminLevel <= 2) {
    recipeLink = ""
  }




  useEffect(() => {
    setNotificationCount(numberOfNotifications())
  }, [])

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

  function recipes() {
    navigate(RECIPES)
  }


  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#">Pantry Pal</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item p-2">
              <a className="nav-link active" aria-current="page" href="/#" >Home</a>
            </li>
            <li className="nav-item p-2">
              <a className="nav-link" aria-current="page" href="/createStorage#" onClick={createStorage}>Add Storage</a>
            </li>
            <li className="nav-item p-2">
              <a className="nav-link" aria-current="page" href="/notifications#" onClick={notifications}>Notifications<sup style={{ color: "red" }}>{notificationCount}</sup></a>
            </li>
            {recipeLink}
          </ul>
        </div>
        <div className={"dropdown justify-content-left "} style={{ width: 160 }}>
          <button className={dropdown} style={{ width: 160 }} data-bs-toggle="dropdown" aria-expanded="false">
            {currentUsername}
          </button>
          <ul className="dropdown-menu" style={{ padding: 8 }}>
            <li><a className="dropdown-item" aria-current="page" href="/userSettings#" onClick={userSettings}>Settings</a></li>
            <li><a className="dropdown-item" aria-current="page" href="/login#" style={{ marginTop: 8 }} onClick={logOut}>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default NavBar;