import { RECIPES, RECIPETOEDIT, CUR_USER } from "../config/localStorage"
import { CREATERECIPES, EDIT_RECIPE, DISPLAYRECIPES } from "../config/routes";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { demoRecipe } from "./demos";
import React from "react";
import {renderToString} from "react-dom/server"

export function saveRecipe(recipe, navigate) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    const currentUser = JSON.parse(localStorage.getItem(CUR_USER))
    recipe.id = currentUser.username + "" + new Date().getTime()
    let temparray = [...recipeData, recipe]
    localStorage.setItem(RECIPES, JSON.stringify(temparray))
    navigate(CREATERECIPES)
}
/*
export function addIngredient(ingredient) {
    const ingredientsDataStr = localStorage.getItem(INGREDIENTS)
    const ingredientsData = ingredientsDataStr ? JSON.parse(ingredientsDataStr) : []
    if (ingredient.name && ingredient.amount) {
        ingredient.id = ingredient.name + "-" + new Date().getTime()
        let temparray = [...ingredientsData, ingredient]
        localStorage.setItem(INGREDIENTS, JSON.stringify(temparray))
        window.location.reload()
    } else {
        window.alert("Missing Information")
    }
}

export function deleteIngredient(ingredient, navigate) {
    const ingredientsDataStr = localStorage.getItem(INGREDIENTS)
    const ingredientsData = ingredientsDataStr ? JSON.parse(ingredientsDataStr) : []
    const newIngredients = ingredientsData.filter(ing => !ing.id.match(new RegExp('^' + ingredient.id + '$')))
    localStorage.setItem(INGREDIENTS, JSON.stringify(newIngredients))
    navigate(CREATERECIPES)
}

export function displayIngredients(navigate) {
    const ingredientsDataStr = localStorage.getItem(INGREDIENTS)
    const ingredients = ingredientsDataStr ? JSON.parse(ingredientsDataStr) : []
    return (
        <table className="table table-info table-striped" style={{ background: "white" }}>
            <tbody>
                <tr key="header">
                    <th scope="col">Amount</th>
                    <th scope="col">Ingredient Name</th>
                    <th scope="col">Delete</th>
                </tr>
                {ingredients.map(ingredient => {
                    return (
                        <tr key={ingredient.id}>
                            <td>
                                {ingredient.amount}
                            </td>
                            <td>
                                {ingredient.name}
                            </td>
                            <td>
                                <button type="button" className="btn btn-primary" onClick={() => deleteIngredient(ingredient, navigate)}>Delete Ingredient</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
*/

export function displayRecipeHeader(index) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    const indexLimit = recipeData.length - 1

    if (indexLimit < 0) {
        return (<h3>No Recipes Stored</h3>)
    }
    if (index <= indexLimit) {
        return (<div>
            <h4>{recipeData[index].title}</h4>
            <h5 style={{ marginLeft: 16 }}>{recipeData[index].subtitle}</h5>
            <p style={{ marginLeft: 16 }}>{recipeData[index].description}</p>
        </div>
        )
    } else if (index > indexLimit) {
        return ""
    } else if (index < 0) {
        return ""
    }
}
export function displayRecipe(index) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    const indexLimit = recipeData.length - 1

    if (indexLimit < 0) {
        return "<h3>No Recipes Stored<h3>"
    }
    if (index <= indexLimit) {
        return (recipeData[index].content)
    } else if (index > indexLimit) {
        return ""
    } else if (index < 0) {
        return ""
    }

}

export function deleteRecipe(recipeIndex, navigate) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    let recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    let recipeToDelete = recipeData[recipeIndex]
    recipeData = recipeData.filter(recipe => !String(recipe.id).match(new RegExp('^' + recipeToDelete.id + '$')))
    localStorage.setItem(RECIPES, JSON.stringify(recipeData))
    navigate(DISPLAYRECIPES)

}
export function editRecipe(recipeIndex, navigate) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    if (recipeData.length === 0) {
        toast("No recipes to Edit", { position: "bottom-right" })
    } else {
        let recipeToEdit = recipeData[recipeIndex]
        localStorage.setItem(RECIPETOEDIT, JSON.stringify(recipeToEdit))
        navigate(EDIT_RECIPE)
    }
}

export function getNumberOfRecipes() {
    const recipeDataStr = localStorage.getItem(RECIPES)
    let recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    return recipeData.length
}

export function saveOverRecipe(recipeToReplace, navigate) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    let recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    let repData = String(recipeToReplace.id)
    recipeData.forEach((recipe) => {
        let rData = String(recipe.id)
        if (rData === repData) {
            recipe.title = recipeToReplace.title
            recipe.subtitle = recipeToReplace.subtitle
            recipe.description = recipeToReplace.description
            recipe.content = recipeToReplace.content
        }
    })
    localStorage.setItem(RECIPES, JSON.stringify(recipeData))
    navigate(DISPLAYRECIPES)
}

export function createDemoRecipe() {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    if (recipeData.length === 0) {
        localStorage.setItem(RECIPES, JSON.stringify([demoRecipe]))
    }
}

export function createFetchedRecipe(recipeObj) {
    let recipe = {}
    recipe.id = recipeObj.idMeal
    recipe.title = recipeObj.strMeal
    recipe.subtitle = recipeObj.strTags
    recipe.description = recipeObj.strArea + " " + recipeObj.strCategory
    recipe.content = renderToString(createFetchedIngredients(recipeObj)) + "<br>" + recipeObj.strInstructions
    return recipe
}

export function createFetchedIngredients(recipeObj) {
    let ingredients = []
    let keyAmountString = "strMeasure"
    let keyNameString = "strIngredient"
    for (let i = 1; i < 21; i++) {
        let tempMeasure = keyAmountString + i
        let tempKeyName = keyNameString + i
        if (!(recipeObj[tempKeyName] === "") && !(recipeObj[tempMeasure] === "")) {
            ingredients.push([recipeObj[tempMeasure], recipeObj[tempKeyName]])
        }
    }
    let ingStr =
        <table>
            <tbody>
                <tr key="header">
                    <th scope="col">Measure</th>
                    <th scope="col">Ingredient</th>
                </tr>
                {ingredients.map((entry, index) =>
                    <tr key={index}>
                        <td>
                            {entry[0]}
                        </td>
                        <td>
                            {entry[1]}
                        </td>
                    </tr>)}
            </tbody>
        </table>
        return ingStr
}