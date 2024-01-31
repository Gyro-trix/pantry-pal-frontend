import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Items(){
const itemquantity = useRef()
const itemname = useRef()
const itemsize = useRef()
const itemexpiry = useRef()

const currentStorageData = JSON.parse(localStorage.getItem("CUR_STORAGE"))

function addItem(){
    const newItem = {quantity: itemquantity,name: itemname,size: itemsize ,expiry: itemexpiry}
    const temparr = [...currentStorageData.items,newItem]
    
}
    // Create Data list based in items in current storage

// Add item with Quantity, Name, Size, ??Expiry??

return (
    <div>
        <div className="container">
            <div className="input_space">
                <input placeholder="Quantity" type="text" defaultValue={itemquantity} ref={itemquantity} />
            </div>
            <div className="input_space">
                <input placeholder="Item Name" type="text" defaultValue={itemname} ref={itemname} />
            </div>
            <br></br>
            <div className="input_space">
                <input placeholder="Size" type="text" defaultValue={itemsize} ref={itemsize} />
            </div>
            <br></br>
            <div className="input_space">
                <input placeholder="Expiry" type="text" defaultValue={itemexpiry} ref={itemexpiry} />
            </div>
            <button onClick={addItem}>Add Item</button>
        </div>
    </div>
)

}
export default Items;