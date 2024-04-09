import { ALL_STORAGES, CUR_ITEM_LIST, CUR_STORAGE, CALORIES, THEME } from "../config/localStorage"
import { ADJUSTSTORAGE, EDIT_STORAGE, HOME } from "../config/routes"
import { toast } from 'react-toastify';
import { demoStorage } from "./demos";
import "react-toastify/dist/ReactToastify.css";
import Nutrition from "../pages/Nutrition";
import React, { useState } from "react";
import Avatar from 'react-avatar';
import * as Icon from 'react-bootstrap-icons';
import { lightTheme } from "./display";


export function createStorage(storageToAdd, navigate) {
    const allStorageDataStr = localStorage.getItem(ALL_STORAGES)
    const allStorageData = JSON.parse(allStorageDataStr)
    const themeStr = localStorage.getItem(THEME)
    const theme = (themeStr !== null && themeStr !== "") ? JSON.parse(themeStr)  : lightTheme
    const newStorage = { id: storageToAdd.name.toLowerCase() + "-" + new Date().getTime(), name: storageToAdd.name, type: storageToAdd.type, location: storageToAdd.location, owner: storageToAdd.owner, items: [] }
    if (allStorageDataStr === null) {
        localStorage.setItem(ALL_STORAGES, JSON.stringify([newStorage]))
        navigate(HOME)
    } else {
        if (storageExists(allStorageData, newStorage) === false) {
            saveStorage(allStorageData, newStorage)
            navigate(HOME)
        } else {
            toast("Name Already Used", { position: "bottom-right", theme: theme.toast })
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
    const allStorageDataStr = localStorage.getItem(ALL_STORAGES)
    const allStorageData = JSON.parse(allStorageDataStr)
    const itemlist = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    let modifiedStorage = [...allStorageData]
    modifiedStorage.forEach((storage,index)=> {
        if (storage.id === currentStorage.id){
            storage = {
                ...currentStorage,
                items:itemlist
            }
            console.log(storage)
            modifiedStorage.splice(index,1,storage)
            localStorage.setItem(CUR_STORAGE, JSON.stringify(storage))
        }
    })
    console.log(modifiedStorage)
    localStorage.setItem(ALL_STORAGES, JSON.stringify(modifiedStorage))
/*
    let filteredStorage = allStorageData.filter(store => !store.id.match(new RegExp('^' + currentStorage.id + '$')))
    let itemList = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    let modifiedCurrentStorage = {
        ...currentStorage,
        items: itemList,
    };*/

    
    //localStorage.setItem(CUR_STORAGE, JSON.stringify(modifiedCurrentStorage))
    //localStorage.setItem(ALL_STORAGES, JSON.stringify(newStorageData))
}

export function displayItems() {
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)
    const itemlist = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    if ((itemlist === null) === false) {
        return (
            <table className={theme.table} style={{ background: "white" }}>
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
                        const [key, setKey] = useState(false)
                        const nutrition = item.nutrition ? item.nutrition : { No_Data: "avaiable" }
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
                                <td style={{ textAlign: "center" }}>
                                    <button type="button" className={theme.button} onClick={() => { setKey(true) }}><Icon.Eye size={20} /></button>

                                    <div>
                                        <Nutrition name={item.name} nutrition={nutrition} trigger={key} setTrigger={setKey} />
                                    </div>
                                </td>
                                <td>
                                    <button type="button" className={theme.button} onClick={() => deleteItem(index)}>Delete</button>
                                </td>

                            </tr>

                        )
                    })}
                </tbody>
            </table>

        )

    }
}

export function displayAdjustableItems(navigate) {
    const themeStr = localStorage.getItem(THEME)
    const theme = (themeStr !== null && themeStr !== "") ? JSON.parse(themeStr)  : lightTheme
    const itemlist = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    let quantList = []
    if ((itemlist === null) === false) {
        return (
            <div>
                <table className={theme.table} style={{ background: "white" }}>
                    <tbody>
                        <tr key="header">
                            <th scope="col">Quantity</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Expiry</th>
                            <th scope="col">Nutrition</th>
                        </tr>
                        {itemlist.map((item, index) => {
                            const [key, setKey] = useState(false)
                            const [quantity, setQuantity] = useState(Number(item.quantity))

                            const nutrition = item.nutrition ? item.nutrition : { No_Data: "avaiable" }
                            quantList[index] = quantity

                            return (
                                <tr key={item.id}>
                                    <td>
                                        <button className={theme.button}
                                            onClick={() => {
                                                setQuantity(quantity + 1)
                                                quantList[index] = quantity
                                            }}><Icon.ChevronUp /></button>
                                        <span style={{ marginLeft: 16, marginRight: 16 }}>{quantity}</span>
                                        <button className={theme.button}
                                            onClick={() => {
                                                if (quantity === 0) {
                                                    setQuantity(0)
                                                    quantList[index] = 0
                                                } else {
                                                    setQuantity(quantity - 1)
                                                    quantList[index] = quantity
                                                }
                                            }}><Icon.ChevronDown /></button>
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
                                    <td style={{ textAlign: "center" }}>
                                        <button type="button" className={theme.button} onClick={() => { setKey(true) }}><Icon.Eye size={20} /></button>

                                        <div>
                                            <Nutrition name={item.name} nutrition={nutrition} trigger={key} setTrigger={setKey} />
                                        </div>
                                    </td>


                                </tr>

                            )
                        })}
                    </tbody>
                </table>
                <div className="container">
                    <button className={theme.button} style={{}} onClick={() => { saveItemQuantity(quantList, navigate) }}>Save</button>
                </div>
            </div>
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
    const themeStr = localStorage.getItem(THEME)
    const theme = (themeStr !== null && themeStr !== "") ? JSON.parse(themeStr)  : lightTheme
    let itemlist = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    if (item.quantity && item.name && item.size && item.expiry) {
        item.id = new Date().getTime() + "-" + item.name
        itemlist = [...itemlist, item]
        localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(itemlist))
        localStorage.setItem(CALORIES, "")
        window.location.reload()
    } else {
        toast("Missing Information", { position: "bottom-right", theme: theme.toast })
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
export function displayStorage(currentUser, storageDataStr, storageData, navigate) {
    const allStorageDataStr = localStorage.getItem(ALL_STORAGES)
    const allStorageData = JSON.parse(allStorageDataStr)

    const themeStr = localStorage.getItem(THEME)
    const theme = (themeStr !== null && themeStr !== "") ? JSON.parse(themeStr)  : lightTheme
    let editButton
    let adjustButton
    let deleteButton
    if (currentUser !== null) {
        if (currentUser.adminlevel === 1) {
            editButton = true
            adjustButton = false
            deleteButton = true
        } else {
            editButton = false
            adjustButton = true
            deleteButton = false
        }
    }

    if ((storageDataStr === null) === false) {
        return storageData.map((singleStorageData) => {
            let storageImage = singleStorageData.image ? singleStorageData.image : ""

            return (

                <div key={singleStorageData.id} className="card mb-3" style={{ display: "grid", marginLeft: 16, marginTop: 16, maxWidth: "48%", minWidth: "48%" }}>
                    <div className="row g-0 d-flex" >
                        <div className="col-md-6" style={{ padding: 16, minWidth: 232 }}>
                            <Avatar unstyle={true} size={200} color={Avatar.getRandomColor('sitebase', theme.avatar)} src={storageImage} name={singleStorageData.name} textSizeRatio={1.5} />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body" >
                                <h4 className="card-title">{singleStorageData.name}</h4>
                                <p className="card-text">{singleStorageData.type} at {singleStorageData.location}</p>

                            </div>
                        </div>
                        <div className="col d-flex justify-content-between" style={{ padding: 16, marginTop: "auto" }}>
                            <button hidden={editButton} className={theme.button} style={{ whiteSpace: "nowrap" }} onClick={() => openEditStoragePage(singleStorageData, navigate)}>Edit Storage</button>
                            <button hidden={adjustButton} className={theme.button} style={{ whiteSpace: "nowrap" }} onClick={() => openAdjustStoragePage(singleStorageData, navigate)}>Adjust Storage Contents</button>
                            <button hidden={deleteButton} className={theme.button} style={{ whiteSpace: "nowrap", marginLeft: 16 }} onClick={() => { if (window.confirm('Delete the item?')) { deleteStorage(allStorageData, singleStorageData) } }} >Delete Storage</button>
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

export function openAdjustStoragePage(singleStorageData, navigate) {
    localStorage.setItem(CUR_STORAGE, JSON.stringify(singleStorageData))
    localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(singleStorageData.items))
    navigate(ADJUSTSTORAGE)
}
//Delete Storage
export function deleteStorage(allStorage, singleStorageData) {
    localStorage.setItem(CUR_STORAGE, JSON.stringify(singleStorageData))
    allStorage = allStorage.filter(storage => !storage.id.match(new RegExp('^' + singleStorageData.id + '$')))
    localStorage.setItem(ALL_STORAGES, JSON.stringify(allStorage))
    window.location.reload()
}

export function saveItemQuantity(quantityList, navigate) {
    const currentStorage = JSON.parse(localStorage.getItem(CUR_STORAGE))
    const currentItemList = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    let count = 0
    currentItemList.forEach(item => {
        item.quantity = quantityList[count]
        count++
    });
    localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(currentItemList))
    saveStorageToLocalStorage(currentStorage)
    navigate(HOME)
}

export function createDemoStorage() {
    const allStorageDataStr = localStorage.getItem(ALL_STORAGES)
    const allStorageData = allStorageDataStr ? JSON.parse(allStorageDataStr) : []
    if (allStorageData.length === 0) {
        localStorage.setItem(ALL_STORAGES, JSON.stringify([demoStorage]))
    }
}
