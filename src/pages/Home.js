import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function checkUserLogin(currentUser, navigate) {
  console.log("Check User is Logged In, User: ", currentUser, ".");
  if(currentUser == null || currentUser.trim() == ""){
    console.log("User NOT Logged In. Redirecting to /login");
    navigate("/login")
  }else{
    console.log("User Logged In Successfully");
  }
}

function Home() {
  const currentUser = localStorage.getItem("CUR_USER");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Update the document title using the browser API
    checkUserLogin(currentUser, navigate);
  });
  return (
    <div className="card" style={{ width: "50%" }}>
      Hello World
    </div>
  );
}


export default Home;