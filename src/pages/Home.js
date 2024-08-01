import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { displayStorage } from "../utils/storage";
import { ALL_STORAGES, CUR_ITEM_LIST, CUR_USER, THEME } from "../config/localStorage"
import { checkUserLogin } from "../utils/users"
import { getWindowDimensions } from "../utils/display";



function Home() {
  const themeStr = localStorage.getItem(THEME)
  const [theme,setTheme] = useState(JSON.parse(themeStr))
  const allStorageDataStr = localStorage.getItem(ALL_STORAGES)
  const allStorageData = JSON.parse(allStorageDataStr)
  localStorage.setItem(CUR_ITEM_LIST, JSON.stringify([]))
  const currentUserStr = localStorage.getItem(CUR_USER)
  const currentUser = currentUserStr ?JSON.parse(currentUserStr):null
  const navigate = useNavigate();
/*
useEffect(() => {
    checkUserLogin(currentUserStr, navigate)
  }, [currentUserStr, navigate])
*/
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);
  const { width, height } = windowDimensions;

  useEffect(() => {
    function handleUpdate() {
        setTheme(JSON.parse(localStorage.getItem(THEME)))
    }

    window.addEventListener('home', handleUpdate);
    return () => window.removeEventListener('home', handleUpdate);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <div>
    <div className="container w-90" style={{ padding: 32, height: height - 70, width: width, minWidth: 700 }}>
      <p  className={theme.button}>TESTING</p>
    </div>
    <div className="container w-90" style={{ padding: 32, height: height - 70, width: width, minWidth: 700 }}>
      <p hidden ={true} className={theme.button}></p>
      <div className="row row-cols-auto" style={{ animation: "moveToRight 1s", margin: "auto" }}>
        {displayStorage(currentUser, allStorageDataStr, allStorageData, navigate)}
      </div>
    </div>
</div>
  )
}
export default Home;