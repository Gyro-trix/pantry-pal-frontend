import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function checkUserLogin(currentUser, navigate) {
  if (currentUser === null || currentUser.trim() === "") {
    console.log("Nav")
    navigate("/login")
  }
}

function NavBar() {
  const navigate = useNavigate()
  const currentUser = localStorage.getItem("CUR_USER")
 

  useEffect(() => {
    checkUserLogin(currentUser, navigate)
  }, [currentUser, navigate])

  function logOut() {
    navigate("/login")
  }

  function createStorage() {
    navigate("/createStorage")
  }

  function userSettings(){
    navigate("/userSettings")
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
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/#" >Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/createStorage#"onClick={createStorage}>Add Storage</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/userSettings#"onClick={userSettings}>Settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/login#" onClick={logOut}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default NavBar;