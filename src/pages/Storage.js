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
    const storagelocation = useRef()
    const [itemlist, setItemList] = useState([])
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("CUR_USER")
    const allStorageData = [localStorage.getItem("ALL_STORAGES")]

    //Checks for User
    useEffect(() => {
        checkUserLogin(currentUser, navigate)
    })

    function addStorage() {
        if(storagename && storagetype && storagelocation){
            const sname = storagename.current.value
            const stype = storagetype.current.value
            const sloc = storagelocation.current.name

            const newstorage = { name: sname, type: stype, location: sloc, items: [] }
        }
    }

    function saveStorage(allStorage){

    }

    //function addItem() {
    //    if (item.current.value) {
    //        setItemList([...itemlist, item.current.value])
    //        console.log(itemlist)
    //    }
    //}

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
                <input placeholder="Location" type="text" ref={storagelocation}  />
            </div>
            
          
            <button onClick={addStorage}>Add Storage</button>
        </div>
    )
}

export default Storage;