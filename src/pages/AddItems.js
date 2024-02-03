import React, { useRef, useEffect, useState } from "react";

function AddItems() {
    const [item, setItem] = useState({
        quantity: "",
        name: "",
        size: "",
        expiry: "",
    })
    const [itemlist, setItemList] = useState(JSON.parse(localStorage.getItem("CUR_ITEM_LIST")))

    useEffect(() => {
        localStorage.setItem("CUR_ITEM_LIST", JSON.stringify(itemlist))
    }, [itemlist.length])


    const handleChange = e => {
        setItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function addItem() {
        if (item.quantity && item.name && item.size && item.expiry) {
            setItemList([...itemlist, item])
        } else {
            window.alert("Missing Info")
        }

    }
    //Delete item based on index in itemlist
    function deleteItem(indextodelete) {
        setItemList(oldItemList => {
            return oldItemList.filter((_,i) => i !== indextodelete)
        })

    }

    function displayItems() {
        let count = 0
        if ((itemlist === null) === false) {
            return itemlist.map((item,index) => {
                return (
                    <div key={item.name} className="card" style={{ marginTop: 10 }}>
                        <div className="card-body">
                            <p className="card-text">Item Name: {item.name} Quantity:{item.quantity} Size:{item.size} Expiry:{item.expiry}</p>
                            <button onClick={() => deleteItem(index)}>Delete Item</button>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <div>
            <div className="container">
                {displayItems()}
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
export default AddItems;