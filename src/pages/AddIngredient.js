import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addIngredient,displayIngredients } from "../utils/recipes";
import { INGREDIENTS } from "../config/localStorage";


function AddIngredient(props) {
const navigate = useNavigate()
    const [ingredient, setIngredient] = useState({
        amount: 0,
        name: ""
    })
    
    const {ingredients} = props

    useEffect(() => {
        localStorage.setItem(INGREDIENTS, JSON.stringify(ingredients))
    }, [ingredients])

    const handleChange = e => {
        setIngredient((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div>
            <div className="container">
                <div className = "container overflow-y-auto" style ={{maxHeight: 200}} >
                {displayIngredients(navigate)}
                </div>
                <div className = "input-group">
                    <input className="form-control"
                        style={{maxWidth: 104,marginTop:16}}
                        type="number"
                        onChange={handleChange}
                        name="amount"
                        placeholder="Quantity"
                    ></input>
                    <input className="form-control"
                        style = {{ marginTop:16 }}
                        type="text"
                        onChange={handleChange}
                        name="name"
                        placeholder="Name"
                    ></input>
                   <button type="button" className="btn btn-primary" style={{ whiteSpace: "nowrap", marginTop:16}} onClick = {()=> {addIngredient(ingredient)}} >Add Ingredient</button>
                </div>
            </div>
        </div>
    )

}
export default AddIngredient;