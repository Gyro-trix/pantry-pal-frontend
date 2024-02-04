import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItems from './AddItems';

function EditStorage() {
    const navigate = useNavigate()
    //const allStorageDataStr = localStorage.getItem("ALL_STORAGES")
    const [allStorageData, setAllStorageData] = useState(JSON.parse(localStorage.getItem("ALL_STORAGES")))
    
    const [currentStorage, setCurrentStorage] = useState(
        JSON.parse(localStorage.getItem("CUR_STORAGE"))
    )
    //Useed to handle item list array for current storage
    const [itemlist, setItemList] = useState(currentStorage.items ? currentStorage.items : " ")
    localStorage.setItem("CUR_ITEM_LIST", JSON.stringify(itemlist))
    //Filters out current storage from all storages
    let [filteredStorages,setFilteredStorages] = useState("")

    const storage = useMemo(() => ({
        name: currentStorage.name,
        type: currentStorage.type,
        location: currentStorage.location,
        items: currentStorage.items,
    }), [currentStorage.name, currentStorage.type, currentStorage.location, currentStorage.items])

    const handleChange = e => {
        setCurrentStorage((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        setCurrentStorage((prev) => ({
            ...prev,
            items: itemlist,
        }))
    }, [itemlist])

    useEffect(() => {
        localStorage.setItem("CUR_STORAGE", JSON.stringify(storage))
    }, [storage])

    //useEffect(() => {
   //     localStorage.setItem("ALL_STORAGES", JSON.stringify(allStorageData))
    //}, [JSON.stringify(allStorageData)])
//
    //Adds modified storage to local storage ALL_STORAGES
    function saveStorage() {
        setItemList(JSON.parse(localStorage.getItem("CUR_ITEM_LIST")))
        console.log(allStorageData)
        setFilteredStorages(allStorageData.filter(store => !store.name.match(new RegExp('^' + currentStorage.name + '$'))))
        filteredStorages.concat([currentStorage])
        console.log(filteredStorages)
        //setAllStorageData(filteredStorages)
        //navigate("/")
    }
    //Check if current storage in editing has a shared name with other storages
    function storageExists() {
        for (let i = 0; i < filteredStorages.length; i++) {
            if (filteredStorages[i].name === currentStorage.name) {
                return true
            }
        }
        return false
    }
    //Edits storage based on form and saves if the new name does not conflict with other storages
    function editStorage() {
        if (storageExists() === false) {
            console.log("all Storage",filteredStorages)
            localStorage.setItem("CUR_STORAGE", JSON.stringify(currentStorage))
            saveStorage()

        } else {
            window.alert("Already exists")
        }

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
    //Form to edit storages that shows current storage information
    return (
        <div>
            <div className="container col">
                <form className="flex row-auto" style={{ width: 50 }} >
                    <input
                        type="text"
                        onChange={handleChange}
                        name="name"
                        defaultValue={currentStorage.name}
                    ></input>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="type"
                        defaultValue={currentStorage.type}
                    ></input>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="location"
                        defaultValue={currentStorage.location}
                    ></input>
                </form>
                <button onClick={editStorage}>Edit Storage</button>
            </div>
            <AddItems />
        </div >
    )
}

export default EditStorage;