import { RECIPES, RECIPETOEDIT, CUR_USER } from "../config/localStorage"
import { EDIT_RECIPE, DISPLAYRECIPES } from "../config/routes";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { demoRecipe } from "./demos";
import React from "react";
import { renderToString } from "react-dom/server"

export function saveRecipe(recipe) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    const currentUser = JSON.parse(localStorage.getItem(CUR_USER))
    recipe.id = currentUser.username + "" + new Date().getTime()
    let temparray = [...recipeData, recipe]
    localStorage.setItem(RECIPES, JSON.stringify(temparray))
    window.dispatchEvent(new Event("createrecipe"))
}

export function saveFetchedRecipe(recipe) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    const currentUser = JSON.parse(localStorage.getItem(CUR_USER))
    recipe.id = currentUser.username + "" + new Date().getTime()
    let temparray = [...recipeData, recipe]
    localStorage.setItem(RECIPES, JSON.stringify(temparray))
    window.dispatchEvent(new Event("recipecentre"))
}

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

export function createFetchedRecipe(recipeObj,imageStr) {
    let recipe = {}
    recipe.id = recipeObj.idMeal
    recipe.title = recipeObj.strMeal
    recipe.subtitle = recipeObj.strTags
    recipe.description = recipeObj.strArea + " " + recipeObj.strCategory
    recipe.content = renderToString(createFetchedIngredients(recipeObj,imageStr)) + "<br>" + recipeObj.strInstructions
    return recipe
}


export function createFetchedIngredients(recipeObj,imageStr) {

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
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img alt="" src={imageStr} />
                            <br></br>
                            <br></br>
                            <a href={recipeObj.strYoutube} target="_blank" rel="noreferrer">Youtube Link </a>
                        </td>
                        <td>
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
                        </td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <span>Source: </span>
            <a href={recipeObj.strSource} target="_blank" rel="noreferrer"> {recipeObj.strSource} </a>
        </div>
    return ingStr
}