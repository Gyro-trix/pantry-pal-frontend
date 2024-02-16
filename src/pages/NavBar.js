import { useNavigate } from "react-router-dom";
import React, { useEffect,useState } from "react";
import { CUR_USER, NOTIFICATIONS } from "../config/localStorage";
import { SIGN_IN, CREATE_STORAGE, USER_SETTINGS,NOTIFICATION } from "../config/routes";
import { checkUserLogin } from "../utils/users"
import { numberOfNotifications } from "../utils/storage";

function NavBar() {
  const navigate = useNavigate()
  const currentUser = localStorage.getItem(CUR_USER)
  const [notificationCount, setNotificationCount] = useState(numberOfNotifications())
  
  useEffect(() => {
    checkUserLogin(currentUser, navigate)
    setNotificationCount(numberOfNotifications())
  }, [currentUser, navigate])
  
  function logOut() {
    localStorage.setItem(NOTIFICATIONS, "")
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
              <a className="nav-link" aria-current="page" href="/notifications#" onClick={notifications}>Notifications<sup style = {{color: "red"}}>{notificationCount}</sup></a>
            </li>
          </ul>
        </div>
        <div className="dropdown justify-content-left" style ={{width:160}}>
              <button className="btn dropdown-toggle" style = {{ width:160}}data-bs-toggle="dropdown" aria-expanded="false">
                Current User
              </button>
              <ul className="dropdown-menu" style = {{padding: 8}}>
                <li><a className="dropdown-item" aria-current="page" href="/userSettings#"  onClick={userSettings}>Settings</a></li>
                <li><a className="dropdown-item" aria-current="page" href="/login#" style = {{marginTop: 8}} onClick={logOut}>Logout</a></li>
              </ul>
        </div>    
      </div>
    </nav>
  )
}
export default NavBar;