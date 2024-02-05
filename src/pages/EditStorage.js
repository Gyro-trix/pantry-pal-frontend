import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItems from './AddItems';

function EditStorage() {
    const navigate = useNavigate()
    const [allStorageData, setAllStorageData] = useState(JSON.parse(localStorage.getItem("ALL_STORAGES")));
    const [currentStorage, setCurrentStorage] = useState(JSON.parse(localStorage.getItem("CUR_STORAGE")));
    const [itemlist, setItemList] = useState(JSON.parse(localStorage.getItem("CUR_ITEM_LIST")));

    //Makes itemlist based on array
    //Filters based on current storage name
    const [filteredStorages, setFilteredStorages] = useState(allStorageData.filter(store => !store.name.match(new RegExp('^' + currentStorage.name + '$'))))
    // individual item
    const [notifyText, setNotifyText] = useState("Edit in progress")
    const [notifyColor, setNotifyColor] = useState("black")
    const [item, setItem] = useState({
        quantity: "",
        name: "",
        size: "",
        expiry: "",
    })
    //updates currentStorage as the form changes. Applies to name, type and location
    const handleChange = e => {
        setCurrentStorage((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        console.log("test")
    }
    useEffect(() => {
        setCurrentStorage((prev) => ({
            ...prev,
            items: itemlist,
        }))
    }, [itemlist])
    useEffect(() => {
        localStorage.setItem("CUR_STORAGE", JSON.stringify(currentStorage))
    }, [currentStorage])
    useEffect(() => {
        localStorage.setItem("ALL_STORAGES", JSON.stringify(allStorageData))
    }, [allStorageData])
    useEffect(() => {
        localStorage.setItem("CUR_ITEM_LIST", JSON.stringify(itemlist))
    }, [itemlist])

    //Check if current storage in editing has a shared name with other storages
    function storageExists() {
        for (let i = 0; i < filteredStorages.length; i++) {
            if (filteredStorages[i].name === currentStorage.name) {
                return true
            }
        }
        return false
    }
    function saveStorageToLocalStorage(){
        console.log("saveStorageToLocalStorage");
        let filteredStorage = allStorageData.filter(store => !store.id.match(new RegExp('^' + currentStorage.id + '$')));
        console.log("filtered",filteredStorage)
        let itemList = JSON.parse(localStorage.getItem("CUR_ITEM_LIST"))
        let modifiedCurrentStorage = {
            ...currentStorage,
            items: itemlist,
        };
        let newStorageData = [...filteredStorage, modifiedCurrentStorage];
        setCurrentStorage(modifiedCurrentStorage);
        setAllStorageData(newStorageData);
    }
    //Edits storage based on form and saves if the new name does not conflict with other storages
    function editStorage() {
        if (storageExists() === false) {
            
            saveStorageToLocalStorage()
            setNotifyText("Save Complete")
            setNotifyColor("green")
            // navigate("/")
        } else {
            setNotifyText("Unable to save, storage name already exists")
            setNotifyColor("red")
            window.alert("Already exists")
        }
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




    //Form to edit storages that shows current storage information
    return (
        <div>
            {/*Edit Storage Form */}
            <div className="container flex row">
                <form className="flex row-auto" style={{ width: 100 }} >
                    <label>Storage Name:
                        <input
                            type="text"
                            onChange={handleChange}
                            name="name"
                            defaultValue={currentStorage.name}
                        ></input>
                    </label>
                    <label>Storage Type:
                        <input
                            type="text"
                            onChange={handleChange}
                            name="type"
                            defaultValue={currentStorage.type}
                        ></input>
                    </label>
                    <label>Storage Location:
                        <input
                            type="text"
                            onChange={handleChange}
                            name="location"
                            defaultValue={currentStorage.location}
                        ></input>
                    </label>
                </form>
                
            </div>
            {/*Form for Adding Items*/}
            <AddItems itemlist={itemlist} setItemList={setItemList} />
            <button onClick={editStorage}>Edit Storage</button>
        </div >
    )
}

export default EditStorage;