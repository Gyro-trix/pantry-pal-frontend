import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditStorage() {
    const storagename = useRef()
    const storagetype = useRef()
    const storagelocation = useRef()
    const navigate = useNavigate()
    const currentUser = localStorage.getItem("CUR_USER")
    const allStorageDataStr = localStorage.getItem("ALL_STORAGES")
    const allStorageData = JSON.parse(allStorageDataStr)
    const currentStorageData = JSON.parse(localStorage.getItem("CUR_STORAGE"))
    const [name, setName] = useState(currentStorageData && currentStorageData.name ? currentStorageData.name : "")
    const [type, setType] = useState(currentStorageData && currentStorageData.type ? currentStorageData.type : "")
    const [location, setLocation] = useState(currentStorageData && currentStorageData.location ? currentStorageData.location : "")
    const [items, setItems] = useState(currentStorageData && currentStorageData.items ? currentStorageData.items : "")
    //filterStorage is allStorageData without currentStorageData, filter by name using a Regular Expression match the name String
    const [filteredStorage, setFilteredStorage] = useState(allStorageData.filter(storage => !storage.name.match(new RegExp('^' + name + '$'))))
    const [temp, setTemp] = useState({ name: name, type: type, location: location, items: items })

   
    useEffect(() => {
        setTemp({ name: name, type: type, location: location, items: items }); // This will always use latest value of count
    }, [name, type, location, items])
    //Testing purpose to show object to be added
    //useEffect(() => {
    //    localStorage.setItem("TEST", JSON.stringify(temp))
    //}, [temp])
    useEffect(() => {
        saveStorage(allStorageData, temp)
    }, [filteredStorage, temp])

    function saveStorage(allStorage, newStorage) {
        let temparr = [...filteredStorage, newStorage]
        allStorage = temparr
        localStorage.setItem("ALL_STORAGES", JSON.stringify(allStorage))
    }


    function editStorage() {
        //Filter removes storage we wish to edit using a Regular Expression of the name
        //setFilteredStorage(allStorageData.filter(storage => !storage.name.match( new RegExp('^' + name + '$')  )))
        //Set form values as the replacements     
        setName(storagename.current.value)
        setType(storagetype.current.value)
        setLocation(storagelocation.current.value)
        setItems([])
        setTemp({ name: name, type: type, location: location, items: items })
        //setFilteredStorage([...filteredStorage, temp])
        //localStorage.setItem("TEST", JSON.stringify(temp))
        saveStorage(allStorageData, temp)


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
                    <input placeholder="Storage Name" type="text" defaultValue={name} ref={storagename} />
                </div>
                <div className="input_space">
                    <input placeholder="Storage Type" type="text" defaultValue={type} ref={storagetype} />
                </div>
                <br></br>
                <div className="input_space">
                    <input placeholder="Location" type="text" defaultValue={location} ref={storagelocation} />
                </div>
                <button onClick={editStorage}>Edit Storage</button>
            </div>
        </div>
    )
}

export default EditStorage;