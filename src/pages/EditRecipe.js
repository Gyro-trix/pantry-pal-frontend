import React, { useState, useEffect } from "react";
import { RECIPETOEDIT } from "../config/localStorage"


function EditRecipe(){
const recipeDataStr = localStorage.getItem(RECIPETOEDIT)
const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : ""
const [recipe, setRecipe] = useState({id:recipeData.id,name:recipeData.name,instructions:recipeData.instructions,ingredients: recipeData.ingredients})

const handleChange = e => {
    setRecipe((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }))
}

return(
    <div>
        
    </div>
)
}
export default EditRecipe