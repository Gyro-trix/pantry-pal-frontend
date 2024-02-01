import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Items(){
const itemquantity = useRef()
const itemname = useRef()
const itemsize = useRef()
const itemexpiry = useRef()

const currentStorageData = JSON.parse(localStorage.getItem("CUR_STORAGE"))
const [currentItems, setCurrentItems] = useState(currentStorageData.items)

const [quantity, setQuantity] = useState(currentItems && currentItems.quantity ? currentItems.quantity : "")
const [name, setName] = useState(currentItems && currentItems.name ? currentItems.name : "")
const [size, setSize] = useState(currentItems && currentItems.size ? currentItems.size : "")
const [expiry, setExpiry] = useState(currentItems && currentItems.expiry ? currentItems.expiry : "")

const [tempitem,setTempItem] = useState({quantity: quantity,name: name,size: size ,expiry: expiry})

useEffect(() => {
    setTempItem({quantity: quantity,name: name,size: size ,expiry: expiry})
     
}, [name, quantity, size, expiry])


function saveItem(curStorageItems,itemToSave){
    const temparr = [...curStorageItems,itemToSave]
    curStorageItems = temparr
}

function addItem(){
    setQuantity(itemquantity.current.value)
    setName(itemname.current.value)
    setSize(itemsize.current.value)
    setExpiry(itemexpiry.current.value)
    //setTempItem({quantity: quantity,name: name,size: size ,expiry: expiry})
    console.log(tempitem)

    //const newItem = {quantity: itemquantity.current.value,name: itemname.current.value,size: itemsize.current.value ,expiry: itemexpiry.current.value}
    //setCurrentItems(newItem)
    
    //currentStorageData.items = currentItems
    
    //const temparr =  [...currentStorageData.items,newItem]
    //console.log(newItem)
    //saveItem(currentStorageData.items, newItem)
    //currentStorageData.items = temparr
    //console.log(currentStorageData.items)
    //localStorage.setItem("CUR_STORAGE",JSON.stringify(currentStorageData))
}
    // Create Data list based in items in current storage

// Add item with Quantity, Name, Size, ??Expiry??

return (
    <div>
        <div className="container">
            <div className="input_space">
                <input placeholder="Quantity" type="text"  ref={itemquantity} />
            </div>
            <div className="input_space">
                <input placeholder="Item Name" type="text"  ref={itemname} />
            </div>
            <br></br>
            <div className="input_space">
                <input placeholder="Size" type="text"  ref={itemsize} />
            </div>
            <br></br>
            <div className="input_space">
                <input placeholder="Expiry" type="text" ref={itemexpiry} />
            </div>
            <button onClick={addItem}>Add Item</button>
        </div>
    </div>
)

}
export default Items;