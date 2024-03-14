import { ALL_STORAGES, CUR_ITEM_LIST, CUR_STORAGE,CALORIES } from "../config/localStorage"
import { EDIT_STORAGE, HOME } from "../config/routes"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Nutrition from "../pages/Nutrition";
import React, {useState} from "react";

const allStorageDataStr = localStorage.getItem(ALL_STORAGES)
const allStorageData = JSON.parse(allStorageDataStr)


export function createStorage(storageToAdd, navigate) {
    const newStorage = { id: storageToAdd.name.toLowerCase() + "-" + new Date().getTime(), name: storageToAdd.name, type: storageToAdd.type, location: storageToAdd.location, items: [] }
    if (allStorageDataStr === null) {
        localStorage.setItem(ALL_STORAGES, JSON.stringify([newStorage]))
        navigate(HOME)
    } else {
        if (storageExists(allStorageData, newStorage) === false) {
            saveStorage(allStorageData, newStorage)
            navigate(HOME)
        } else {
            toast("Name Already Used", { position: "bottom-right" })
        }
    }

}

export function saveStorage(allStorage, newStorage) {
    let temparr = [...allStorage, newStorage]
    allStorage = temparr
    localStorage.setItem(ALL_STORAGES, JSON.stringify(allStorage))

}

export function storageExists(allStorage, storageToAdd) {
    for (let i = 0; i < allStorage.length; i++) {
        if (allStorage[i].name === storageToAdd.name) {
            return true
        }
    }
    return false
}

export function saveStorageToLocalStorage(currentStorage) {
    let filteredStorage = allStorageData.filter(store => !store.id.match(new RegExp('^' + currentStorage.id + '$')))
    let itemList = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    let modifiedCurrentStorage = {
        ...currentStorage,
        items: itemList,
    };
    let newStorageData = [...filteredStorage, modifiedCurrentStorage];
    localStorage.setItem(CUR_STORAGE, JSON.stringify(modifiedCurrentStorage))
    localStorage.setItem(ALL_STORAGES, JSON.stringify(newStorageData))
}

export function displayItems() {
    
    const itemlist = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    if ((itemlist === null) === false) {
        return (
            <table className="table table-info table-striped" style={{ background: "white" }}>
                <tbody>
                    <tr key="header">
                        <th scope="col">Quantity</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Size</th>
                        <th scope="col">Expiry</th>
                        <th scope="col">Nutrition</th>
                        <th scope="col">Delete</th>
                    </tr>
                    {itemlist.map((item, index) => {
                        const [key,setKey] = useState(false)
                        return (
                            
                            <tr key={item.id}>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.size}
                                </td>
                                <td>
                                    {displayDate(item.expiry)}
                                </td>
                                <td>
                                <button type="button" className="btn btn-primary" onClick={()=> {setKey(true)}}>_</button>
                                <div>
                                <Nutrition name= {item.name} nutrition = {item.nutrition} trigger = {key} setTrigger={setKey}/>
                                </div>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-primary" onClick={() => deleteItem(index)}>Delete</button>
                                </td>
                                
                            </tr>
                            
                        )
                    })}
                </tbody>
            </table>

        )

    }
}

export function deleteItem(indextodelete) {
    let itemlist = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    itemlist = itemlist.filter((_, i) => i !== indextodelete)
    localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(itemlist))
    window.location.reload()

}

export function addItem(item) {
    let itemlist = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    if (item.quantity && item.name && item.size && item.expiry) {
        item.id = new Date().getTime() + "-" + item.name
        itemlist = [...itemlist, item]
        localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(itemlist))
        localStorage.setItem(CALORIES,"")
        window.location.reload()
    } else {
        toast("Missing Information", { position: "bottom-right" })
    }

}

export function addExpiryDate(date) {
    const expiry = date
    return expiry
}

export function displayDate(date) {
    const tempdate = new Date(date)
    const day = tempdate.getUTCDate()
    const month = tempdate.getUTCMonth() + 1
    const year = tempdate.getUTCFullYear()
    const dateStr = month + "/" + day + "/" + year
    return dateStr
}
//Working on below
export function displayStorage(storageDataStr, storageData, navigate) {
    if ((storageDataStr === null) === false) {
        return storageData.map((singleStorageData) => {
            return (
                <div className="col w-25" key={singleStorageData.name} >
                    <div className="card" style={{ marginLeft: 16, marginTop: 16, minWidth: 320 }}>
                        <div className="card-body" >
                            <h4 className="card-title">{singleStorageData.name}</h4>
                            <p className="card-text">{singleStorageData.type} at {singleStorageData.location}</p>
                            <div className="col d-flex justify-content-between">
                                <button className="btn btn-primary" style={{ marginRight: 16 }} onClick={() => openEditStoragePage(singleStorageData, navigate)}>Edit Storage</button>
                                <button className="btn btn-primary" onClick={() => { if (window.confirm('Delete the item?')) { deleteStorage(allStorageData, singleStorageData) } }} >Delete Storage</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
}


export function openEditStoragePage(singleStorageData, navigate) {
    localStorage.setItem(CUR_STORAGE, JSON.stringify(singleStorageData))
    localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(singleStorageData.items))
    navigate(EDIT_STORAGE)
}
//Delete Storage
export function deleteStorage(allStorage, singleStorageData) {
    localStorage.setItem(CUR_STORAGE, JSON.stringify(singleStorageData))
    allStorage = allStorage.filter(storage => !storage.id.match(new RegExp('^' + singleStorageData.id + '$')))
    localStorage.setItem(ALL_STORAGES, JSON.stringify(allStorage))
    window.location.reload()
}
