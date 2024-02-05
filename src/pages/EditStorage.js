import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import AddItems from './AddItems';

function EditStorage() {
    const navigate = useNavigate()
    const [allStorageData, setAllStorageData] = useState(JSON.parse(localStorage.getItem("ALL_STORAGES")))
    const [currentStorage, setCurrentStorage] = useState(JSON.parse(localStorage.getItem("CUR_STORAGE")))
    //Makes itemlist based on array
    const [itemlist, setItemList] = useState(JSON.parse(localStorage.getItem("CUR_ITEM_LIST")))   
    //Filters based on current storage name
    const [filteredStorages, setFilteredStorages] = useState(allStorageData.filter(store => !store.name.match(new RegExp('^' + currentStorage.name + '$'))))
    //
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
    //Edits storage based on form and saves if the new name does not conflict with other storages
    function editStorage() {
        if (storageExists() === false) {
            setAllStorageData([...filteredStorages,currentStorage])
                 
            //saveStorage()

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
    const handleItem = e => {
        setItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function addItem() {
        if (item.quantity && item.name && item.size && item.expiry) {
            setItemList([...itemlist, item])
        } else {
            window.alert("Missing Information")
        }

    }
    //Delete item based on index in itemlist
    function deleteItem(indextodelete) {
        setItemList(oldItemList => {
            return oldItemList.filter((_, i) => i !== indextodelete)
        })

    }
    //displays items in current storage
    function displayItems() {
        if ((itemlist === null) === false) {
            return itemlist.map((item, index) => {
                return (
                    <div key={item.name+index} className="card" style={{ marginTop: 10 }}>
                        <div className="card-body">
                            <p className="card-text">Item Name: {item.name} Quantity:{item.quantity} Size:{item.size} Expiry:{item.expiry}</p>
                            <button onClick={() => deleteItem(index)}>Delete Item</button>
                        </div>
                    </div>
                )
            })
        }
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
            <div>
            <div className="container">
                {displayItems()}
                <form className="col" style = {{marginTop: 10  }}>
                    <input
                        style={{ width: 75}}
                        type="text"
                        onChange={handleItem}
                        name="quantity"
                        placeholder="Quantity"
                    ></input>
                    <input
                        style = {{marginLeft: 5  }}
                        type="text"
                        onChange={handleItem}
                        name="name"
                        placeholder="Name"
                    ></input>
                    <input
                        style={{ width: 100 ,marginLeft: 5  }}
                        type="text"
                        onChange={handleItem}
                        name="size"
                        placeholder="Size"
                    ></input>
                    <input
                        style = {{marginLeft: 5  }}
                        type="text"
                        onChange={handleItem}
                        name="expiry"
                        placeholder="Expiry"
                    ></input>
                </form>
                <button style = {{marginTop: 10  }} onClick={addItem}>Add Item</button>
            </div>
        </div>
        </div >
    )
}

export default EditStorage;