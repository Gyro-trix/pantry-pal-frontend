import { ALL_STORAGES,CUR_ITEM_LIST,CUR_STORAGE } from "../config/localStorage"
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
    localStorage.setItem(CUR_STORAGE,JSON.stringify(modifiedCurrentStorage))
    localStorage.setItem(ALL_STORAGES,JSON.stringify(newStorageData))
}