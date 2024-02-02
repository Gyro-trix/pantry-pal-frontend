import React, { useRef, useEffect, useState } from "react";

function Items() {
    const [item, setItem] = useState({
        quantity: "",
        name: "",
        size: "",
        expiry: "",
    })
    const [itemlist,setItemList] = useState([])
   
    useEffect(() => {
        localStorage.setItem("CUR_ITEM_LIST",JSON.stringify(itemlist))
    }, [itemlist])
 

    const handleChange = e => {
        setItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function addItem() {
        if(item.quantity&&item.name&&item.size&&item.expiry){
            setItemList([...itemlist,item])
            console.log(item)
            console.log(itemlist)
        } else {
            window.alert("Missing Info")
        }
        
    }

    return (
        <div>
            <div className="container">
                <form className="flex">
                    <input
                        type="text"
                        onChange={handleChange}
                        name="quantity"
                        placeholder="Quantity"
                    ></input>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="name"
                        placeholder="Name"
                    ></input>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="size"
                        placeholder="Size"
                    ></input>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="expiry"
                        placeholder="Expiry"
                    ></input>
                </form>
                <button onClick={addItem}>Add Item</button>
            </div>
        </div>
    )

}
export default Items;