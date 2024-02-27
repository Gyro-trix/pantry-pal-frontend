
import React, { useState, useEffect } from "react";
import { saveRecipe, displayRecipe } from "../utils/recipes";
import AddIngredient from "./AddIngredient";
import { useNavigate } from "react-router-dom";
import { RECIPETOADD } from "../config/localStorage";


function CreateRecipes() { 
    const recipeToAddStr = localStorage.getItem(RECIPETOADD)
    const recipeToAddData = recipeToAddStr ? JSON.parse(recipeToAddStr) : ""
    const [recipe, setRecipe] = useState({ name: recipeToAddData.name, ingredients: recipeToAddData.ingredients, instructions: recipeToAddData.instructions })
    const [recipeIndex, setRecipeIndex] = useState(0)
    const navigate = useNavigate()
    
    useEffect(() => {
        localStorage.setItem(RECIPETOADD, JSON.stringify(recipe))
    }, [recipe])
    
    const handleChange = e => {
        setRecipe((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }


    return (
        <div>
            <div>
                {displayRecipe(recipeIndex,navigate)}
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
                    defaultValue = {recipe.name}
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
                    defaultValue = {recipe.instructions}
                    onChange={handleChange} />
            </div>
            <button onClick={() => saveRecipe(recipe,navigate)}>Save Recipe</button>

        </div>
    )

}

export default CreateRecipes