import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function checkUserLogin(currentUser, navigate) {
    if (currentUser === null || currentUser.trim() === "") {
        navigate("/login")
    }
}

function EditStorage() {
    const storagename = useRef()
    const storagetype = useRef()
    const storagelocation = useRef()
    const navigate = useNavigate()
    const currentUser = localStorage.getItem("CUR_USER")
    const allStorageDataStr = localStorage.getItem("ALL_STORAGES")
    const allStorageData = JSON.parse(allStorageDataStr)
    const currentStorageData = JSON.parse(localStorage.getItem("CUR_STORAGE"))

    //console.log("Current STorage Data", currentStorageData, currentStorageData.location)
    
    const [name, setName] = useState(currentStorageData && currentStorageData.name? currentStorageData.name : "")
    const [type, setType] = useState(currentStorageData && currentStorageData.type? currentStorageData.type : "")
    const [location, setLocation] = useState(currentStorageData && currentStorageData.location? currentStorageData.location : "")
    const [filteredStorage, setFilteredStorage] = useState(allStorageData)

    //Checks for User
    useEffect(() => {
        checkUserLogin(currentUser, navigate)
    })

function checkStorage(storage){
    console.log(JSON.stringify(storage))
    console.log(JSON.stringify(currentStorageData))
    
    return JSON.stringify(storage) != JSON.stringify(currentStorageData)
}

    function editStorage(){
        
        
        // Filter removes storage we wish to edit
        console.log("Before: ",allStorageData,name)
        const filtered = allStorageData.filter(storage => !storage.name.includes(name))
        setFilteredStorage(filtered)
        console.log("After: ",filteredStorage)
        
        setName(storagename.current.value)
        setType(storagetype.current.value)
        setLocation(storagelocation.current.value)

        console.log(storagename.current.value,name)
        console.log(storagetype.current.value,type)
        console.log(storagelocation.current.value,location)

        // Pull all Edit Storage

        // Use the .filter() function to get rid of the old storage item in the array of all storages

        // Append the new modified one

        // push again the updated array to the local storage

        // Add logic so you can add new items to the local storage
        /*
        {
            name: "", type: "", location: "", 
            items: [
                {"name": "1"},
                {"name": ""},
                {"name": ""},
            ]
        }
        */
    }
    return (
        <div>
            <div className="container">
                <div className="input_space">
                    <input placeholder="Storage Name" type="text" defaultValue={name} ref = {storagename}/>
                </div>
                <div className="input_space">
                    <input placeholder="Storage Type" type="text" defaultValue={type} ref = {storagetype}/>
                </div>
                <br></br>
                <div className="input_space">
                    <input placeholder="Location" type="text" defaultValue={location} ref = {storagelocation} />
                </div>
                <button onClick={editStorage}>Edit Storage</button>
            </div>
        </div>
    )
}

export default EditStorage;