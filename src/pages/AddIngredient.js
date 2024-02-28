import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { addIngredient,displayIngredients } from "../utils/recipes";


function AddIngredient() {
const navigate = useNavigate()
    const [ingredient, setIngredient] = useState({
        amount: 0,
        name: ""
    })
    



    const handleChange = e => {
        setIngredient((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div>
            
            <div className="container">
                <div className = "container overflow-y-auto" style ={{background: "lightgrey",maxHeight: 200}} >
                {displayIngredients(navigate)}
                </div>
                <form className="col" style = {{marginTop: 10  }}>
                    <input
                        style={{ width: 75}}
                        type="number"
                        onChange={handleChange}
                        name="amount"
                        placeholder="Quantity"
                    ></input>
                    <input
                        style = {{marginLeft: 5  }}
                        type="text"
                        onChange={handleChange}
                        name="name"
                        placeholder="Name"
                    ></input>
                   
                </form>
                <button type="button" className="btn btn-primary" style={{ whiteSpace: "nowrap", marginTop: 16 }} onClick = {()=> {addIngredient(ingredient)}} >Add Ingredient</button>
            </div>
        </div>
    )

}
export default AddIngredient;