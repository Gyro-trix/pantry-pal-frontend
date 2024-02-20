import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItems from './AddItems';
import { CUR_STORAGE, ALL_STORAGES, CUR_ITEM_LIST,CUR_USER } from "../config/localStorage"
import { saveStorageToLocalStorage } from "../utils/storage"
import { checkUserLogin} from "../utils/users"

function EditStorage() {
    const allStorageData = JSON.parse(localStorage.getItem(ALL_STORAGES));
    const currentUserStr = localStorage.getItem(CUR_USER)
    const [currentStorage, setCurrentStorage] = useState(JSON.parse(localStorage.getItem(CUR_STORAGE)));
    const [itemlist, setItemList] = useState(JSON.parse(localStorage.getItem(CUR_ITEM_LIST)));
    const [notifyText, setNotifyText] = useState("Edit in progress")
    const [notifyColor, setNotifyColor] = useState("black")
    const navigate = useNavigate()
    //updates currentStorage as the form changes. Applies to name, type and location
    const handleChange = e => {
        setCurrentStorage((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

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
        setNotifyText("   Please Save")
    }, [itemlist])

    return (
        <div className="card w-50 mb-3" style={{ background: "lightblue", padding: 16, margin: "auto", marginTop: 64 }}>
            {/*Edit Storage Form */}
            <div className="container flex row">
                <form className="flex row-auto"  >
                    <div className="input_group mb-3">
                        <label>Storage Name:
                            <input
                                className="form-control"
                                type="text"
                                onChange={handleChange}
                                name="name"
                                defaultValue={currentStorage.name}
                            ></input>
                        </label>
                    </div>
                    <div className="input_group mb-3">
                        <label>Storage Type:
                            <input
                                className="form-control"
                                type="text"
                                onChange={handleChange}
                                name="type"
                                defaultValue={currentStorage.type}
                            ></input>
                        </label>
                    </div>
                    <div className="input_group mb-3">
                        <label>Storage Location:
                            <input
                                className="form-control"
                                type="text"
                                onChange={handleChange}
                                name="location"
                                defaultValue={currentStorage.location}
                            ></input>
                        </label>
                    </div>
                </form>
                <AddItems itemlist={itemlist} setItemList={setItemList} />
            </div>
            {/*Notification text to appear above save button */}
            <div>
            <p style={{ color: notifyColor, marginTop: 16 }}>{notifyText}</p>
            </div>
            <button type="button" className="btn btn-primary" style={{ whiteSpace: "nowrap", marginTop: 16 }} onClick={() => {
                saveStorageToLocalStorage(currentStorage)
                setNotifyColor("green")
                setNotifyText("   Save Completed")
            }}>Save Storage</button>
        </div >
    )
}

export default EditStorage;