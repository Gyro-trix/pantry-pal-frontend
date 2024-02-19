import { ALL_STORAGES, CUR_ITEM_LIST, CUR_STORAGE, CUR_USER, NOTIFICATIONS } from "../config/localStorage"
import { EDIT_STORAGE, HOME } from "../config/routes"

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
    const itemlist = JSON.parse(localStorage.getItem(CUR_ITEM_LIST))
    if ((itemlist === null) === false) {
        return itemlist.map((item, index) => {
            return (
                <div key={item.name + index} className="card" style={{ marginTop: 10 }}>
                    <div className="card-body">
                        <p className="card-text">Item Name: {item.name} Quantity:{item.quantity} Size:{item.size} Expiry:{displayDate(item.expiry)}</p>
                        <button type="button" className="btn btn-primary" onClick={() => deleteItem(index)}>Delete Item</button>
                    </div>
                </div>

            )
        })
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
                <div className="col w-25" key={singleStorageData.name} >
                    <div className="card" style={{ marginLeft: 10, marginTop: 10 }}>
                        <div className="card-body" >
                            <h4 className="card-title">{singleStorageData.name}</h4>
                            <p className="card-text">{singleStorageData.type} at {singleStorageData.location}</p>
                            <div className="col d-flex justify-content-between">
                                <button className="btn btn-primary" style={{ marginRight: 10 }} onClick={() => openEditStoragePage(singleStorageData, navigate)}>Edit Storage</button>
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

export function gatherNotifications() {
    const allStoragesStr = localStorage.getItem(ALL_STORAGES)
    const currentUserStr = localStorage.getItem(CUR_USER)
    const allNotificationsStr = localStorage.getItem(NOTIFICATIONS)
    if (!(currentUserStr === null || currentUserStr.trim() === "")) {
        const currentUser = JSON.parse(currentUserStr)
        const storages = allStoragesStr ? JSON.parse(allStoragesStr) : []
        const allNotifications = allNotificationsStr ? JSON.parse(allNotificationsStr) : []
        let allModifiedNotifications = [...allNotifications]
        if (!(storages === null)) {
            if (currentUser.notify === true) {
                storages.forEach((storage) => {
                    storage.items.forEach((item) => {
                        let itemnotif = null;
                        if (item.quantity <= currentUser.itemlimit) {
                            itemnotif = {
                                owner: currentUser.id,
                                storage: storage.name,
                                item: item.name,
                                type: "Low",
                                id: `${currentUser.id}-${storage.name}-${item.name}`,
                                dismissed: false
                            }
                        }
                        if (expiryCompare(item.expiry) <= currentUser.expirylimit) {
                            itemnotif = {
                                owner: currentUser.id,
                                storage: storage.name,
                                item: item.name,
                                type: "Expired",
                                id: `${currentUser.id}-${storage.name}-${item.name}`,
                                dismissed: false
                            }
                        }
                        if (itemnotif) {
                            let exists = false;
                            console.log("All Notifs", allNotifications, "Item Notifs", itemnotif)
                            if (allNotifications) {
                                allNotifications.forEach(n => {
                                    if (n["id"] === itemnotif["id"]) {
                                        exists = true;
                                        console.log(`Notification: ${itemnotif["id"]} found, skipping it`)
                                    }
                                });
                            }
                            if (exists === false) {
                                allModifiedNotifications.push(itemnotif)
                            }

                        }
                    })
                })
                localStorage.setItem(NOTIFICATIONS, JSON.stringify(allModifiedNotifications))
            }
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

export function dismissNotification(notificationID){
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    const notifications = JSON.parse(notificationsStr)
    notifications.forEach((notification) => {
        if(notificationID === notification.id){
            notification.dismissed = true
            console.log(notification.dismissed)
            localStorage.setItem(NOTIFICATIONS, JSON.stringify(notifications))
        }
    })
    
    
}

export function displayNotifications(type) {
    const notificationsStr = localStorage.getItem(NOTIFICATIONS)
    if (!(notificationsStr === null || notificationsStr.trim() === "")) {
        const notifications = JSON.parse(notificationsStr)
        return notifications.map((notification) => {
            if (notification.type === type && notification.dismissed === false) {
                return (
                    <div key={notification.id} className="card-body">
                        {notification.item} in {notification.storage} is {notification.type} of {notification.id}
                        <button  type="button" className="btn btn-primary" onClick = {() => dismissNotification(notification.id)}>Dismiss</button>
                    </div>
                )
            } else {
                return ""
            }
        })
    }
}

export function numberOfNotifications() {
    const notificationStr = localStorage.getItem(NOTIFICATIONS)
    if (!(notificationStr === null || notificationStr.trim() === "")) {
        const notifications = JSON.parse(notificationStr)
        const count = notifications.length
        console.log("Getting Number")
        return count
    } else {
        return ""
    }

}