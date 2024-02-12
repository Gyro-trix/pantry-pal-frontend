import React, { useEffect, useState } from "react";
import AddItems from './AddItems';
import { CUR_STORAGE, ALL_STORAGES, CUR_ITEM_LIST } from "../config/localStorage"
import {saveStorageToLocalStorage} from "../utils/storage"

function EditStorage() {
    const [allStorageData, setAllStorageData] = useState(JSON.parse(localStorage.getItem(ALL_STORAGES)));
    const [currentStorage, setCurrentStorage] = useState(JSON.parse(localStorage.getItem(CUR_STORAGE)));
    const [itemlist, setItemList] = useState(JSON.parse(localStorage.getItem(CUR_ITEM_LIST)));
    const [notifyText, setNotifyText] = useState("Edit in progress")
    const [notifyColor, setNotifyColor] = useState("black")
    //updates currentStorage as the form changes. Applies to name, type and location
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
        localStorage.setItem(CUR_STORAGE, JSON.stringify(currentStorage))
    }, [currentStorage])

    useEffect(() => {
        localStorage.setItem(ALL_STORAGES, JSON.stringify(allStorageData))
    }, [allStorageData])

    useEffect(() => {
        localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(itemlist))
        setNotifyColor("red")
        setNotifyText("Please Save")
    }, [itemlist])


    /*function saveStorageToLocalStorage(currentStorage) {
        let filteredStorage = allStorageData.filter(store => !store.id.match(new RegExp('^' + currentStorage.id + '$')))
        let itemList = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
        let modifiedCurrentStorage = {
            ...currentStorage,
            items: itemList,
        };
        let newStorageData = [...filteredStorage, modifiedCurrentStorage];
        setCurrentStorage(modifiedCurrentStorage);
        setAllStorageData(newStorageData);
    }
    */
    //Edits storage based on form and saves if the new name does not conflict with other storages
    function saveStorage() {
        saveStorageToLocalStorage(currentStorage)
        setNotifyColor("green")
        setNotifyText("Save Complete")
        // navigate("/")
    }
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
            <AddItems itemlist={itemlist} setItemList={setItemList} />
            {/*Notification text to appear above save button */}
            <p style={{ color: notifyColor  }}>{notifyText}</p>
            <button style = {{marginLeft: 5}}onClick={saveStorage}>Save Storage</button>
        </div >
    )
}

export default EditStorage;