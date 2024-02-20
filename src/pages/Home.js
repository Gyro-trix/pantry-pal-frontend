import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { displayStorage} from "../utils/storage";
import { ALL_STORAGES, CUR_ITEM_LIST, CUR_USER } from "../config/localStorage"
import { checkUserLogin } from "../utils/users"
import { } from "../config/localStorage"

function Home() {

  const allStorageDataStr = localStorage.getItem(ALL_STORAGES)
  const allStorageData = JSON.parse(allStorageDataStr)
  localStorage.setItem(CUR_ITEM_LIST, JSON.stringify([]))
  const currentUserStr = localStorage.getItem(CUR_USER)
  const navigate = useNavigate();

  useEffect(() => {
    checkUserLogin(currentUserStr, navigate)
  }, [currentUserStr, navigate])

  return (
    <div className="card w-90" style={{ background: "lightblue", padding: 32 }}>
      <div className="row row-cols-auto" >
        {displayStorage(allStorageDataStr, allStorageData, navigate)}
      </div>
    </div>
  )
}
export default Home;