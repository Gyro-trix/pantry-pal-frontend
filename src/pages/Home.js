import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function checkUserLogin(currentUser, navigate) {
  if (currentUser === null || currentUser.trim() === "") {
    navigate("/login")
  }
}

function Home() {
  const currentUser = localStorage.getItem("CUR_USER")

  const allStorageDataStr = localStorage.getItem("ALL_STORAGES")
  const allStorageData = JSON.parse(allStorageDataStr)

  const navigate = useNavigate();

  useEffect(() => {
    checkUserLogin(currentUser, navigate)
  })

  function displayStorage() {
    if ((allStorageDataStr === null) === false){
    return allStorageData.map((el) => {
      return (
        <div key = {el.name} className="card">
          <div className = "card-body" >
            <h5 className = "card-title">{el.name}</h5>
            <p className = "card-text">{el.type} & {el.location}</p>
            <a href="#" className="btn btn-primary">Add Items</a>
            <a href="#" className="btn btn-primary">Edit Details</a>
            </div>
          </div>
      )
    })
  }
  }
  

  return (
    <div>
      <NavBar />
      {displayStorage()}
    </div>
  )
}

export default Home;