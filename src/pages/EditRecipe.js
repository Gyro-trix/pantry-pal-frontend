import React, { useState, useEffect } from "react";
import { saveOverRecipe } from "../utils/recipes";
import { RECIPETOEDIT,CUR_USER, INGREDIENTS } from "../config/localStorage"
import { checkAdminLogin } from "../utils/users";
import { useNavigate } from "react-router-dom";


function EditRecipe() {
    const recipeDataStr = localStorage.getItem(RECIPETOEDIT)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : ""
    const [recipe, setRecipe] = useState({ id: recipeData.id, name: recipeData.name, instructions: recipeData.instructions, ingredients: recipeData.ingredients })
    const [ingredients,setIngredients] = useState(JSON.parse(localStorage.getItem(INGREDIENTS)))
    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate()

    useEffect(() => {
        checkAdminLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    useEffect(() => {
        localStorage.setItem(RECIPETOEDIT, JSON.stringify(recipe))
    }, [recipe])

    useEffect(() => {
        localStorage.setItem(INGREDIENTS, JSON.stringify(ingredients))
    }, [ingredients])

    useEffect(() => {
        setRecipe((prev) => ({
            ...prev,
            ingredients: ingredients,
        }))
    }, [ingredients])

    const handleChange = e => {
        setRecipe((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className = "container" style = {{background:"lightblue",padding:16}}>
            <div className="input_group mb-3" style = {{marginTop:16}}>
                <input
                    className="form-control"
                    placeholder="Recipe Name"
                    type="text"
                    name="name"
                    defaultValue = {recipe.name}
                    onChange={handleChange} />
            </div>
            <div className="input_group mb-3">
                
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
            <button type="button" className="btn btn-primary" onClick={() => saveOverRecipe(recipe,navigate)}>Save Recipe</button>

        </div>
    )
}
export default EditRecipe