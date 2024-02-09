import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export function checkUserLogin(currentUser, navigate) {
  if (currentUser === null || currentUser.trim() === "") {
    console.log("Nav")
    navigate("/login")
  }
}