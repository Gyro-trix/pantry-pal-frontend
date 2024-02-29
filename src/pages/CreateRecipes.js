
import React, { useState, useEffect } from "react";
import { saveRecipe, displayRecipe, getNumberOfRecipes } from "../utils/recipes";
import AddIngredient from "./AddIngredient";
import { useNavigate } from "react-router-dom";
import { RECIPETOADD,CUR_USER, INGREDIENTS } from "../config/localStorage";
import { checkAdminLogin } from "../utils/users";


function CreateRecipes() { 
    
    const recipeToAddStr = localStorage.getItem(RECIPETOADD)
    const recipeToAddData = recipeToAddStr ? JSON.parse(recipeToAddStr) : ""
    const [recipe, setRecipe] = useState({ name: recipeToAddData.name, ingredients: recipeToAddData.ingredients, instructions: recipeToAddData.instructions })
    const [recipeIndex, setRecipeIndex] = useState(0)
    const ingredientsStr = localStorage.getItem(INGREDIENTS)
    const [ingredients,setIngredients] = useState(ingredientsStr ? JSON.parse(ingredientsStr) :[])
    const currentUserStr = localStorage.getItem(CUR_USER)
    const numberOfRecipes = getNumberOfRecipes()
    const navigate = useNavigate()
    useEffect(() => {
        checkAdminLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    useEffect(() => {
        localStorage.setItem(RECIPETOADD, JSON.stringify(recipe))
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
            <div className = "card">
                <div className = "card-body">{displayRecipe(recipeIndex,navigate)}</div>
                
                <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {
                    if (recipeIndex <= 0){
                        setRecipeIndex(0)
                    } else {
                        setRecipeIndex(recipeIndex - 1)
                    }
                }}>Previous</button>
                <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {
                    setRecipeIndex(recipeIndex + 1)
                }}>Next</button>
            </div>
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
                <AddIngredient ingredients = {ingredients} />
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
            <button type="button" className="btn btn-primary" onClick={() => saveRecipe(recipe,navigate)}>Save Recipe</button>

        </div>
    )

}

export default CreateRecipes