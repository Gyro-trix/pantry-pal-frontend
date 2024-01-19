import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function checkUserLogin(currentUser,navigate){
  if(currentUser === null || currentUser.trim() ===""){
    navigate("/login")
  }
}

function Home() {
  const currentUser = localStorage.getItem("CUR_USER")
  const navigate = useNavigate();

  useEffect(() => {
    checkUserLogin(currentUser,navigate)
  })
  
  return (
    <div className="card" style={{ width: "50%" }}>
      HOME PAGE
    </div>
  );
}


export default Home;