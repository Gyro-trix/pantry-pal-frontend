import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function checkUserLogin(currentUser, navigate) {
    if (currentUser === null || currentUser.trim() === "") {
        navigate("/login")
    }
}

function CreateStorage() {
    const storagename = useRef()
    const storagetype = useRef()
    const storagelocation = useRef()
    const navigate = useNavigate()
    const currentUser = localStorage.getItem("CUR_USER")
    const allStorageDataStr = localStorage.getItem("ALL_STORAGES")
    const allStorageData = JSON.parse(allStorageDataStr)
    //Checks for User
    useEffect(() => {
        checkUserLogin(currentUser, navigate)
    })
    //Gets form information and checks before saving to local storage
    function addStorage() {
        if (storagename && storagetype && storagelocation) {
            const sname = storagename.current.value
            const stype = storagetype.current.value
            const sloc = storagelocation.current.value
            const newStorage = { name: sname, type: stype, location: sloc, items: [] }
console.log(allStorageDataStr)
            if (allStorageDataStr === null) {
                localStorage.setItem("ALL_STORAGES", JSON.stringify([newStorage]))
                navigate("/")
            } else {
                if (storageExists(allStorageData, newStorage) === false) {
                    saveStorage(allStorageData, newStorage)
                    navigate("/")
                } else {
                    alert("Name Already Used")
                }
            }
            
            //window.location.reload(true);
        }
    }
    //Save 'storage' to local storage
    function saveStorage(allStorage, newStorage) {
        let temparr = [...allStorage, newStorage]
        allStorage = temparr
        localStorage.setItem("ALL_STORAGES", JSON.stringify(allStorage))
    }

    function storageExists(allStorage, storageToAdd) {
        for (let i = 0; i < allStorage.length; i++) {
            if (allStorage[i].name === storageToAdd.name) {
                return true
            }
        }
        return false
    }

    function currentStorages() {
        if(allStorageDataStr === null){
            return
        }
        return allStorageData.map((el) => {
            console.log(el.name)
            return (
                <li key={el.name}><a className="dropdown-item" href="#">{el.name}</a></li>
            )
        })
    }

    /*Old add item function, saving for possible future reference
    function addItem() {
       if (item.current.value) {
           setItemList([...itemlist, item.current.value])
            console.log(itemlist)
        }
    }
*/
    return (
        <div>
            <div className="container">

                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Add New Storage
                    </button>
                    <ul className="dropdown-menu">
                    <li key="Create New"><a className="dropdown-item" href="#">Create New</a></li>
                        {currentStorages()}
                    </ul>
                </div>


                <div className="input_space">
                    <input placeholder="Storage Name" type="text" ref={storagename} />
                </div>
                <div className="input_space">
                    <input placeholder="Storage Type" type="text" ref={storagetype} />
                </div>
                <br></br>
                <div className="input_space">
                    <input placeholder="Location" type="text" ref={storagelocation} />
                </div>


                <button onClick={addStorage}>Add Storage</button>
            </div>
        </div>
    )
}

export default CreateStorage;