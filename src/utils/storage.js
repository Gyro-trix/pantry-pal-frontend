import { ALL_STORAGES } from "../config/localStorage"
import { HOME } from "../config/routes"

const allStorageDataStr = localStorage.getItem(ALL_STORAGES)
const allStorageData = JSON.parse(allStorageDataStr)

export function createStorage(storageToAdd, navigate) {       
        const newStorage = { id: storageToAdd.name.toLowerCase() + "-" + new Date().getTime(), name: storageToAdd.name, type: storageToAdd.type, location: storageToAdd.loc, items: [] }
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
    localStorage.setItem("ALL_STORAGES", JSON.stringify(allStorage))
}

export function storageExists(allStorage, storageToAdd) {
    for (let i = 0; i < allStorage.length; i++) {
        if (allStorage[i].name === storageToAdd.name) {
            return true
        }
    }
    return false
}