
import React, { useState } from "react";
import { saveRecipe, displayRecipe } from "../utils/recipes";
import AddIngredient from "./AddIngredient";
import { useNavigate } from "react-router-dom";


function Recipes() {
    const [recipe, setRecipe] = useState({ name: "", ingredients: [], instructions: "" })
    const [recipeIndex, setRecipeIndex] = useState(0)
    const navigate = useNavigate()
    const handleChange = e => {
        setRecipe((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div>
            <div>
                {displayRecipe(recipeIndex)}
                <button onClick={() => {
                    if (recipeIndex <= 0){
                        setRecipeIndex(0)
                    } else {
                        setRecipeIndex(recipeIndex - 1)
                    }
                }}>Previous</button>
                <button onClick={() => {
                    setRecipeIndex(recipeIndex + 1)
                }}>Next</button>
            </div>
            <div className="input_group mb-3">

                <input
                    className="form-control"
                    placeholder="Recipe Name"
                    type="text"
                    name="name"
                    onChange={handleChange} />
            </div>
            <div className="input_group mb-3">
                <AddIngredient />
            </div>
            <div className="input_group mb-3">
                <input
                    className="form-control"
                    placeholder="Instructions"
                    type="textfield"
                    name="instructions"
                    onChange={handleChange} />
            </div>
            <button onClick={() => saveRecipe(recipe,navigate)}>Save Recipe</button>

        </div>
    )

}

export default Recipes