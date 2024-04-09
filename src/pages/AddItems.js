import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { displayItems, addItem, addExpiryDate } from "../utils/storage"
import { CUR_ITEM_LIST, THEME } from "../config/localStorage";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import AddNutrition from "./AddNutrition";


function AddItems(props) {
    const themeStr = localStorage.getItem(THEME)
    const [theme,setTheme] = useState(JSON.parse(themeStr))
    const [key, setKey] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [itemSearch, setItemSearch] = useState(null)
    const addItemRef = useRef(null)
    const itemName = useRef(null)
    const [searchBtn, setSearchBtn] = useState("Search")
    const [addNutritionBtn, setAddNutritionBtn] = useState(false)
    const [item, setItem] = useState({
        quantity: 0,
        name: "",
        size: "",
        expiry: "",
        nutrition: null,
        id: ""
    })
    const [nutrition, setNutrition] = useState({ calories: 0, serving_size_g: 0, fat_total_g: 0, fat_saturated_g: 0, protein_g: 0, sodium_mg: 0, potassium_mg: 0, cholesterol_mg: 0, carbohydrates_total_g: 0, fiber_g: 0, sugar_g: 0 })

    const { itemlist } = props;
    

    let fetchedData = ""

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
        const apiKeyType = process.env.REACT_APP_CALORIE_NINJAS_KEY_TYPE
        const search = 'https://api.calorieninjas.com/v1/nutrition?query=' + itemSearch

        if (searchBtn === "Search") {
            try {
                const response = await fetch(search, {
                    method: 'GET',
                    headers: {
                        [apiKeyType]: apiKey
                    }
                })
                if (!response.ok) {
                    throw new Error('Response was not okay')
                }


                fetchedData = await response.json()

            } catch (error) {
                console.error('Error', error)
            }


            setSearchBtn("Clear Search")
            if (fetchedData.items.length === 0) {
                toast("No results from API, please manually enter", { position: "bottom-right", theme: theme.toast })
                addItemRef.current.hidden = false
                itemName.current.value = itemSearch
                setAddNutritionBtn(false)
            } else if (fetchedData.items.length === 1) {
                let temp = fetchedData.items[0]
                delete temp.name
                setNutrition(temp)
                setAddNutritionBtn(true)
                addItemRef.current.hidden = false
                itemName.current.value = itemSearch
                itemName.current.disabled = true
            } else {
                //more than one result, does not happen with this API on the free tier
            }
        } else {
            addItemRef.current.hidden = true
            itemName.current.value = ""
            itemName.current.disabled = false
            setSearchBtn("Search")
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

    return (
        <div >

            <div className="container" style={{ zIndex: 0 }}>
                <div className="input-group" >
                    <input className="form-control"

                        type="text"
                        onChange={handleInput}
                        name="search"
                        placeholder="Search"
                    ></input>
                    <button type="button" className={theme.button} style={{ whiteSpace: "nowrap" }} onClick={handleSearch}>{searchBtn}</button>
                </div>


                <div style={{ height: 150 }}>
                    <div ref={addItemRef} style={{ marginTop: 16 }} hidden={true}>
                        <div>
                            <input className="form-control"
                                style={{ width: "48%", float: "left", marginBottom: 16, marginRight: 16 }}
                                type="number"
                                onChange={handleChange}
                                name="quantity"
                                placeholder="Quantity"
                            ></input>
                            <input className="form-control"
                                ref={itemName}
                                style={{ width: "48%", marginBottom: 16 }}
                                type="text"
                                onChange={handleChange}
                                name="name"
                                placeholder="Name"
                            ></input>
                            <input className="form-control"
                                style={{ width: "48%", float: "left", marginBottom: 16, marginRight: 16 }}
                                type="text"
                                onChange={handleChange}
                                name="size"
                                placeholder="Size"
                            ></input>
                            <div style={{ whiteSpace: "nowrap" }}>
                                <span style={{ marginRight: 16 }}>Expiry:</span>
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
                            </div>
                        </div>
                        <div style={{ marginTop: 16, float: "right" }}>
                            <button type="button" className={theme.button} style={{ whiteSpace: "nowrap" }} hidden={addNutritionBtn} onClick={() => { setKey(true) }}>Add Nutrition Info</button>
                            <button type="button" className={theme.button} style={{ whiteSpace: "nowrap", marginLeft: 16 }} onClick={() => addItem(item)}>Add Item</button>
                            <AddNutrition name={item.name} nutrition={nutrition} setNutrition={setNutrition} trigger={key} setTrigger={setKey} />
                        </div>
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