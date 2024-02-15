import { ALL_STORAGES, CUR_ITEM_LIST, CUR_STORAGE, CUR_USER, NOTIFICATIONS } from "../config/localStorage"
import { EDIT_STORAGE, HOME, } from "../config/routes"

const allStorageDataStr = localStorage.getItem(ALL_STORAGES)
const allStorageData = JSON.parse(allStorageDataStr)
let itemlist = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))

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
            alert("Name Already Used")
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
    if ((itemlist === null) === false) {
        return itemlist.map((item, index) => {
            return (
                <div key={item.name + index} className="card" style={{ marginTop: 10 }}>
                    <div className="card-body">
                        <p className="card-text">Item Name: {item.name} Quantity:{item.quantity} Size:{item.size} Expiry:{displayDate(item.expiry)}</p>
                        <button onClick={() => deleteItem(index)}>Delete Item</button>
                    </div>
                </div>

            )
        })
    }
}

export function deleteItem(indextodelete) {
    itemlist = itemlist.filter((_, i) => i !== indextodelete)
    localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(itemlist))
    window.location.reload()

}

export function addItem(item) {
    if (item.quantity && item.name && item.size && item.expiry) {
        itemlist = [...itemlist, item]
        localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(itemlist))
        window.location.reload()
    } else {
        window.alert("Missing Info")
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
                <div key={singleStorageData.name} className="card col" style={{ width: "48%", height: 250, marginLeft: 10, marginTop: 10 }}>
                    <div className="card-body" >
                        <h5 className="card-title">{singleStorageData.name}</h5>
                        <p className="card-text">{singleStorageData.type} & {singleStorageData.location}</p>
                        <button className="btn btn-primary" style={{ marginRight: 10 }} onClick={() => openEditStoragePage(singleStorageData, navigate)}>Edit Storage</button>
                        <button className="btn btn-primary" onClick={() => { if (window.confirm('Delete the item?')) { deleteStorage(allStorageData, singleStorageData) } }} >Delete Storage</button>
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

export function gatherNotifications() {
    const currentUser = JSON.parse(localStorage.getItem(CUR_USER))
    const storages = JSON.parse(localStorage.getItem(ALL_STORAGES))
    let notifications = []
    if (storages.length !== 0) {
        if (currentUser.notify === true) {
            storages.forEach((storage) => {
                let tempitems = storage.items
                let tempname = storage.name
                tempitems.forEach((item) => {
                    
                    if (item.quantity <= currentUser.itemlimit) {
                        let itemnotif = {
                            owner: " ",
                            storage: " ",
                            item: " ",
                            trigger: " "
                        }
                            itemnotif.owner = currentUser.id
                            itemnotif.storage = tempname
                            itemnotif.item = item.name
                        itemnotif.trigger = "Number of Items"
                        notifications.push(itemnotif)
                    }
                    if (expiryCompare(item.expiry) <= currentUser.expirylimit){
                        let expirynotif = {
                            owner: " ",
                            storage: " ",
                            item: " ",
                            trigger: " "
                        }
                        expirynotif.owner = currentUser.id
                        expirynotif.storage = tempname
                        expirynotif.item = item.name
                        expirynotif.trigger = "Expired"
                        notifications.push(expirynotif)
                    }
                    
                })
            })
            localStorage.setItem(NOTIFICATIONS, JSON.stringify(notifications))
        }
    }
}

export function expiryCompare(date) {
    const expirydate = new Date(date)
    const currentdate = new Date()
    const datediff = expirydate.getTime() - currentdate.getTime()
    const daydiff = (datediff / (1000 * 60 * 60 * 24)).toFixed(0)
    if (daydiff < 0) {
        console.log("expired")
    } else {
        return daydiff
    }
}