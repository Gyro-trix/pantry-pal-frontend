import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { displayItems, addItem, addExpiryDate } from "../utils/storage"
import "react-datepicker/dist/react-datepicker.css";
import { CUR_ITEM_LIST } from "../config/localStorage";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function AddItems(props) {

    const [startDate, setStartDate] = useState(new Date())
    //const [data, setData] = useState({ "items": [{ "name": "chicken", "calories": 222.6, "serving_size_g": 100, "fat_total_g": 12.9, "fat_saturated_g": 3.7, "protein_g": 23.7, "sodium_mg": 72, "potassium_mg": 179, "cholesterol_mg": 92, "carbohydrates_total_g": 0, "fiber_g": 0, "sugar_g": 0 }] })
    const [data, setData] = useState({items:[]})
    const [itemSearch, setItemSearch] = useState(null)
    const addItemRef = useRef(null)
    const itemName = useRef(null)
    const [item, setItem] = useState({
        quantity: 0,
        name: "",
        size: "",
        expiry: "",
        nutrition: null,
        id: ""
    })

    const [nutrition, setNutrition] = useState({
        calories: 0,
        serving_size_g: 0,
        fat_total_g: 0,
        fat_saturated_g: 0,
        protein_g: 0,
        sodium_mg: 0,
        potassium_mg: 0,
        cholesterol_mg: 0,
        carbohydrates_total_g: 0,
        fiber_g: 0,
        sugar_g: 0
    })
    const { itemlist } = props;

    useEffect(() => {
        localStorage.setItem(CUR_ITEM_LIST, JSON.stringify(itemlist))
    }, [itemlist])

    useEffect(() => {
        setItem((prev) => ({
            ...prev,
            nutrition: nutrition,
            name: itemSearch,
        }))
    }, [nutrition, itemSearch])



    const handleSearch = async () => {
        
                const apiKey = process.env.REACT_APP_CALORIE_NINJAS_KEY
                const search = 'https://api.calorieninjas.com/v1/nutrition?query=' + itemSearch
        
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
        
        if (data.items.length === 0) {
            toast("No results from API, please manually enter",{position: "bottom-right"})
            addItemRef.current.hidden = false
            itemName.current.value = itemSearch
        } else if(data.items.length === 1){
            //Single result
            setNutrition(data.items[0])
            //removes the items name making only nutritional information
            removeName()
            addItemRef.current.hidden = false
            itemName.current.value = itemSearch
            itemName.current.disabled = true
        } else {
            //more than one result
        }


    }

    const handleInput = e => {
        setItemSearch(e.target.value)
    }

    const handleChange = e => {
        setItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const removeName = () => {
        setNutrition(current => {
            const { name, ...rest } = current
            return rest
        })
    }

    return (
        <div >
            
            <div className="container" style={{zIndex:0}}>
                    <div className="input-group" >
                        <input className="form-control"
                            
                            type="text"
                            onChange={handleInput}
                            name="search"
                            placeholder="Search"
                        ></input>
                        <button type="button" className="btn btn-primary" style={{ whiteSpace: "nowrap" }} onClick={handleSearch}>Search</button>
                    </div>

                
                <div style={{ height: 90 }}>
                    <div ref={addItemRef} className="input-group" style={{ marginTop: 10 }} hidden={true}>
                        <input className="form-control"
                            style={{}}
                            type="number"
                            onChange={handleChange}
                            name="quantity"
                            placeholder="Quantity"
                        ></input>
                        <input className="form-control"
                            ref={itemName}
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

                    </div>
                    

                </div>
                
            
            
        </div>
        <div className="container" style={{ marginTop: 16 }} >
                        {displayItems()}
                    </div>
        </div>
    )

}
export default AddItems;