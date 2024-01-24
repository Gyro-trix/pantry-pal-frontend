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
  const navigate = useNavigate();

  useEffect(() => {
    checkUserLogin(currentUser, navigate)
  })

  function logOut() {
    localStorage.setItem("CUR_USER", "")
    navigate("/login")
  }

  function storage() {
    navigate("/storage")
  }

  return (
    <div>
      <NavBar />
      
    </div>


  )
}


export default Home;