import React, { useState, useEffect } from "react";
import { RECIPETOEDIT,CUR_USER } from "../config/localStorage"
import { checkAdminLogin } from "../utils/users";
import { useNavigate } from "react-router-dom";

function EditRecipe() {
    const recipeDataStr = localStorage.getItem(RECIPETOEDIT)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : ""
    const [recipe, setRecipe] = useState({ id: recipeData.id, name: recipeData.name, instructions: recipeData.instructions, ingredients: recipeData.ingredients })

    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate()
    useEffect(() => {
        checkAdminLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])


    const handleChange = e => {
        setRecipe((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div>

        </div>
    )
}
export default EditRecipe