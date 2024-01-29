import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


//function checkUserLogin(currentUser, navigate) {
//  if (currentUser === null || currentUser.trim() === "") {
//    navigate("/login")
//  }
//}

function Home() {

  const allStorageDataStr = localStorage.getItem("ALL_STORAGES")
  const allStorageData = JSON.parse(allStorageDataStr)

  const navigate = useNavigate();

  function openEditStoragePage(singleStorageData) {
    localStorage.setItem("CUR_STORAGE", JSON.stringify(singleStorageData))
    navigate("/EditStorage")
  }
  //Does delete, no comfirmation
  function deleteStorage(allStorage, singleStorageData) {
    localStorage.setItem("CUR_STORAGE", JSON.stringify(singleStorageData))
    console.log(singleStorageData.name)
    allStorage = allStorage.filter(storage => !storage.name.match(new RegExp('^' + singleStorageData.name + '$')))
    localStorage.setItem("ALL_STORAGES", JSON.stringify(allStorage))
    window.location.reload()
  }

  function displayStorage() {
    if ((allStorageDataStr === null) === false) {
      return allStorageData.map((singleStorageData) => {

        return (
          <div key={singleStorageData.name} className="card" style={{ marginTop: 10 }}>
            <div className="card-body">
              <h5 className="card-title">{singleStorageData.name}</h5>
              <p className="card-text">{singleStorageData.type} & {singleStorageData.location}</p>
              <a href="#" className="btn btn-primary" style={{ marginRight: 15 }} onClick={() => openEditStoragePage(singleStorageData)}>Edit Storage</a>
              <a href="#" className="btn btn-primary" onClick={() => {if(window.confirm('Delete the item?')){deleteStorage(allStorageData, singleStorageData)}}} >Delete Storage</a>
            </div>
          </div>
        )
      })
    }
  }
  return (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      {displayStorage()}
    </div>
  )
}
export default Home;