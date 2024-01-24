import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function checkUserLogin(currentUser, navigate) {
    if (currentUser === null || currentUser.trim() === "") {
        navigate("/login")
    }
}

function Storage() {
    const storagename = useRef()
    const storagetype = useRef()
    //const itementered = useRef()
    const [item, setItem] = useState('')
    const [itemlist, setItemList] = useState([])
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("CUR_USER")
    const allStorageData = [localStorage.getItem("ALL_STORAGES")]

    //Checks for User
    useEffect(() => {
        checkUserLogin(currentUser, navigate)
    })

    function addStorage() {
        console.log(itemlist)
        console.log(allStorageData)
    }

    function addItem() {
        if (item.current.value) {
            setItemList([...itemlist, item.current.value])
            console.log(itemlist)
        }
    }

    return (
        <div className="container">
            <div className="input_space">
                <input placeholder="Storage Name" type="text" ref={storagename} />
            </div>
            <div className="input_space">
                <input placeholder="Storage Type" type="text" ref={storagetype} />
            </div>
            <br></br>
            <div className="input_space">
                <input value={item} onChange ={setItem(e => e.target.value)} />
            </div>
            
           

            <button onClick={addItem}>Add Item</button>
            <br></br>
            <button onClick={addStorage}>Add Storage</button>
        </div>
    )
}

export default Storage;