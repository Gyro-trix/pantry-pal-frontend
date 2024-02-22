
import React, { useState } from "react";
import { saveRecipe } from "../utils/recipes";
import AddIngredient from "./AddIngredient";

function Recipes() {
    const [recipe, setRecipe] = useState({ name: "", ingredients: [], instructions: "" })
    
    const handleChange = e => {
        setRecipe((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))       
    }
   
    return (
        <div>
             
                <div className="input_group mb-3">
                    <input
                        className="form-control"
                        placeholder="Recipe Name"
                        type="text"
                        name="name"
                        onChange={handleChange} />
                </div>
                <div className="input_group mb-3">
                <AddIngredient/>
                </div>
                <div className="input_group mb-3">
                    <input
                        className="form-control"
                        placeholder="Instructions"
                        type="textfield"
                        name="instructions"
                        onChange={handleChange} />
                </div>
<button onClick={()=>saveRecipe(recipe)}>Save Recipe</button>
            
        </div>
    )

}

export default Recipes