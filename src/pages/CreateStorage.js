import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";



function CreateStorage() {
    const storagename = useRef()
    const storagetype = useRef()
    const storagelocation = useRef()
    const navigate = useNavigate()
    const allStorageDataStr = localStorage.getItem("ALL_STORAGES")
    const allStorageData = JSON.parse(allStorageDataStr)
    //Gets form information and checks before saving to local storage
    function addStorage() {
        if (storagename && storagetype && storagelocation) {
            const sname = storagename.current.value
            const stype = storagetype.current.value
            const sloc = storagelocation.current.value
            const newStorage = { id: sname.toLowerCase() + "-" + new Date().getTime(), name: sname, type: stype, location: sloc, items: [] }

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
    return (
        <div>
            <div className="container ">
                <form className="flex row-auto" style={{ width: 200 }} >
                    <input
                        placeholder="Storage Name"
                        type="text"
                        ref={storagename} />
                    <input
                        placeholder="Storage Type"
                        type="text"
                        ref={storagetype} />
                    <input
                        placeholder="Location"
                        type="text"
                        ref={storagelocation} />
                </form>
                <button onClick={addStorage}>Add Storage</button>
            </div>
            <div className="container">

            </div>
        </div>
    )
}

export default CreateStorage;