import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { displayItems, addItem, addExpiryDate } from "../utils/storage"
import "react-datepicker/dist/react-datepicker.css";
import { CUR_ITEM_LIST } from "../config/localStorage";

function AddItems(props) {
    const [startDate, setStartDate] = useState(new Date())
    const [data,setData] = useState(null)
    const [ingredient,setIngredient] = useState('chicken')
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

    const handleSearch = async () => {

        const apiKey = process.env.REACT_APP_CALORIE_NINJAS_KEY
        const search = 'https://api.calorieninjas.com/v1/nutrition?query=' + ingredient

        try {
            const response = await fetch(search, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey
                }
            })
            if (!response.ok) {
                throw new Error('Response was not okay')
            }

            setData(await response.json())
        } catch (error) {
            console.error('Error', error)
        }

    }

    const handleChange = e => {
        setItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div>
            <div className="container">
                <div className="container" style={{ marginTop: 16 }} >
                    {displayItems()}
                </div>
                <div className="input-group" style={{ marginTop: 10 }}>
                    <input className="form-control"
                        style={{}}
                        type="number"
                        onChange={handleChange}
                        name="quantity"
                        placeholder="Quantity"
                    ></input>
                    <input className="form-control"
                        style={{}}
                        type="text"
                        onChange={handleChange}
                        name="name"
                        placeholder="Name"
                    ></input>
                    <input className="form-control"
                        style={{}}
                        type="text"
                        onChange={handleChange}
                        name="size"
                        placeholder="Size"
                    ></input>
                    <DatePicker
                        className="form-control"
                        style={{ borderRadius: 0.0 }}
                        selected={startDate}
                        name="expiry"
                        onChange={(date) => {
                            let expiry = addExpiryDate(date)
                            setStartDate(expiry)
                            item.expiry = expiry
                        }
                        }
                    />
                    <button type="button" className="btn btn-primary" style={{ whiteSpace: "nowrap" }} onClick={() => addItem(item)}>Add Item</button>
                    <button type="button" className="btn btn-primary" style={{ whiteSpace: "nowrap" }} onClick={() => handleSearch()}>Test</button>
                </div>
            </div>
            {JSON.stringify(data)} Hello There
        </div>
    )

}
export default AddItems;