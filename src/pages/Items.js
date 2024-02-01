import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Items() {
    const [item, setItem] = useState({
        quantity: "",
        name: "",
        size: "",
        expiry: "",
    })

    const handleChange = e => {
        setItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function addItem() {
        console.log(item)
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