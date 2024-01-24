import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function checkUserLogin(currentUser, navigate) {
  if (currentUser === null || currentUser.trim() === "") {
    navigate("/login")
  }
}



function Home() {
  const currentUser = localStorage.getItem("CUR_USER")
  const navigate = useNavigate();

  useEffect(() => {
    checkUserLogin(currentUser, navigate)
  })

  function logOut(){
    localStorage.setItem("CUR_USER", "")
    navigate("/login")
  }

  function storage(){
    navigate("/storage")
  }

  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" >Pantry Pal</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" >Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={storage}>Add Inventory</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={logOut}>Setting</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " onClick={logOut}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>


  )
}


export default Home;