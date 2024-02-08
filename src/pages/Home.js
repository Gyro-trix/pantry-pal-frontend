//import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const allStorageDataStr = localStorage.getItem("ALL_STORAGES")
  const allStorageData = JSON.parse(allStorageDataStr)
  localStorage.setItem("CUR_ITEM_LIST", JSON.stringify([]))
  const navigate = useNavigate();

  function openEditStoragePage(singleStorageData) {
    localStorage.setItem("CUR_STORAGE", JSON.stringify(singleStorageData))
    localStorage.setItem("CUR_ITEM_LIST", JSON.stringify(singleStorageData.items))
    navigate("/EditStorage")
  }
  //Delete Storage
  function deleteStorage(allStorage, singleStorageData) {
    localStorage.setItem("CUR_STORAGE", JSON.stringify(singleStorageData))
    allStorage = allStorage.filter(storage => !storage.id.match(new RegExp('^' + singleStorageData.id + '$')))
    localStorage.setItem("ALL_STORAGES", JSON.stringify(allStorage))
    window.location.reload()
  }

  function displayStorage() {
    if ((allStorageDataStr === null) === false) {
      return allStorageData.map((singleStorageData) => {
        return (

          <div key={singleStorageData.name} className="card col" style={{marginLeft: 5,marginTop: 10}}>
            <div className="card-body" >
              <h5 className="card-title">{singleStorageData.name}</h5>
              <p className="card-text">{singleStorageData.type} & {singleStorageData.location}</p>
              <button className="btn btn-primary" style={{ marginRight: 10 }} onClick={() => openEditStoragePage(singleStorageData)}>Edit Storage</button>
              <button className="btn btn-primary" onClick={() => { if (window.confirm('Delete the item?')) { deleteStorage(allStorageData, singleStorageData) } }} >Delete Storage</button>
            </div>
          </div>

        )
      })
    }
  }
  return (
    <div class="container text-center">
      <div className = "row row-cols-2" style={{ marginTop: 15, marginBottom: 15 }}>
        {displayStorage()}
      </div>
    </div>
  )
}
export default Home;