import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { displayItems,addItem,addExpiryDate} from "../utils/storage"

import "react-datepicker/dist/react-datepicker.css";

function AddItems(props) {
    const [startDate,setStartDate] = useState(new Date())

    const [item, setItem] = useState({
        quantity: "",
        name: "",
        size: "",
        expiry: "",
    })
    const {itemlist} = props;

    useEffect(() => {
        localStorage.setItem("CUR_ITEM_LIST", JSON.stringify(itemlist))
    }, [itemlist])


    const handleChange = e => {
        setItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
/*
    function addExpiryDate(date){
        setStartDate(date)
        const day = date.getUTCDate()
        const month = date.getUTCMonth() + 1
        const year = date.getUTCFullYear()
        item.expiry = "" + month +"/"+ day +"/"+ year +""
    }
*/
    return (
        <div>
            <div className="container">
                {displayItems(itemlist)}
                <form className="col" style = {{marginTop: 10  }}>
                    <input
                        style={{ width: 75}}
                        type="text"
                        onChange={handleChange}
                        name="quantity"
                        placeholder="Quantity"
                    ></input>
                    <input
                        style = {{marginLeft: 5  }}
                        type="text"
                        onChange={handleChange}
                        name="name"
                        placeholder="Name"
                    ></input>
                    <input
                        style={{ width: 100 ,marginLeft: 5  }}
                        type="text"
                        onChange={handleChange}
                        name="size"
                        placeholder="Size"
                    ></input>
                    <DatePicker 
                    selected={startDate}
                    name = "expiry" 
                    onChange={(date) => {
                        let expiry = addExpiryDate(date)
                        setStartDate(expiry)
                        item.expiry = expiry
                        }
                    } 
                    />
                </form>
                <button style = {{marginTop: 10}} onClick={() => addItem(item)}>Add Item</button>
            </div>
        </div>
    )

}
export default AddItems;