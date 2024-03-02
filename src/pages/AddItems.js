import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { displayItems, addItem, addExpiryDate } from "../utils/storage"
import "react-datepicker/dist/react-datepicker.css";
import { CUR_ITEM_LIST } from "../config/localStorage";

function AddItems(props) {
    const [startDate, setStartDate] = useState(new Date())

    const [item, setItem] = useState({
        quantity: 0,
        name: "",
        size: "",
        expiry: "",
        id: ""
    })
    const { itemlist } = props;

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
                <div className="container" style={{marginTop:16 }} >
                    {displayItems()}
                </div>
                <div className="input-group" style={{ marginTop: 10 }}>
                    <input className="form-control"
                        style={{ }}
                        type="number"
                        onChange={handleChange}
                        name="quantity"
                        placeholder="Quantity"
                    ></input>
                    <input className="form-control"
                        style={{  }}
                        type="text"
                        onChange={handleChange}
                        name="name"
                        placeholder="Name"
                    ></input>
                    <input className="form-control"
                        style={{  }}
                        type="text"
                        onChange={handleChange}
                        name="size"
                        placeholder="Size"
                    ></input>
                    <DatePicker
                        className="form-control"
                        style = {{borderRadius: 0.0}}
                        selected={startDate}
                        name="expiry"
                        onChange={(date) => {
                            let expiry = addExpiryDate(date)
                            setStartDate(expiry)
                            item.expiry = expiry
                        }
                        }
                    />
                    <button type="button" className="btn btn-primary" style={{ whiteSpace: "nowrap"}} onClick={() => addItem(item)}>Add Item</button>

                </div>
            </div>
        </div>
    )

}
export default AddItems;