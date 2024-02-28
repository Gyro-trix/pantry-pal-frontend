import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { displayItems,addItem,addExpiryDate} from "../utils/storage"
import "react-datepicker/dist/react-datepicker.css";
import { CUR_ITEM_LIST } from "../config/localStorage";

function AddItems(props) {
    const [startDate,setStartDate] = useState(new Date())

    const [item, setItem] = useState({
        quantity: 0,
        name: "",
        size: "",
        expiry: "",
        id: ""
    })
    const {itemlist} = props;

    useEffect(() => {
        localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(itemlist))
    }, [itemlist])


    const handleChange = e => {
        setItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div>
            <div className="container">
                <div className = "container overflow-y-auto" style ={{background: "lightgrey",maxHeight: 200}} >
                {displayItems()}
                </div>
                <form className="col" style = {{marginTop: 10  }}>
                    <input
                        style={{ width: 75}}
                        type="number"
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
                <button type="button" className="btn btn-primary" style={{ whiteSpace: "nowrap", marginTop: 16 }} onClick={() => addItem(item)}>Add Item</button>
            </div>
        </div>
    )

}
export default AddItems;