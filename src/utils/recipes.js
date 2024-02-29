import { RECIPES, INGREDIENTS, RECIPETOADD, RECIPETOEDIT, CUR_USER } from "../config/localStorage"
import { CREATERECIPES, EDIT_RECIPE } from "../config/routes";

export function saveRecipe(recipe, navigate) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    const ingredientsDataStr = localStorage.getItem(INGREDIENTS)
    const ingredientsData = ingredientsDataStr ? JSON.parse(ingredientsDataStr) : []
    recipe.ingredients = ingredientsData
    if (recipe.name && recipe.instructions && (recipe.ingredients.length > 0)) {
        recipe.id = recipe.name + "-" + new Date().getTime()
        let temparray = [...recipeData, recipe]
        localStorage.setItem(RECIPES, JSON.stringify(temparray))
        localStorage.setItem(INGREDIENTS, [])
        localStorage.setItem(RECIPETOADD, "")
        navigate(CREATERECIPES)
    }

}

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

export function displayRecipe(index, navigate) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    const currentUser = JSON.parse(localStorage.getItem(CUR_USER))
    let editButtons
    if (index < recipeData.length) {
        const recipe = recipeData[index]
        if (currentUser.adminlevel === 3) {
            editButtons = <div>
                <button type="button" className="btn btn-primary" onClick={() => editRecipe(recipe, navigate)}>Edit Recipe</button>
                <button type="button" className="btn btn-primary" onClick={() => deleteRecipe(recipe, navigate)}>Delete Recipe</button>
            </div>
        } else {
            editButtons = ""
        }
        return (
            <div key={index}>
                <h3>{recipe.name}</h3>
                {recipe.ingredients.map((ingredient, ind) =>
                (<div key={ind}>
                    <p>{ingredient.amount} of {ingredient.name}</p>
                </div>)
                )}
                <p>{recipe.instructions}</p>
                {editButtons}

            </div>
        )
    } else {
        return (
            <div>
                <h3> No recipe at Index {index}</h3>
            </div>
        )
    }
}

export function deleteRecipe(recipeToDelete, navigate) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    let recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    recipeData = recipeData.filter(recipe => !recipe.id.match(new RegExp('^' + recipeToDelete.id + '$')))
    localStorage.setItem(RECIPES, JSON.stringify(recipeData))
    navigate(CREATERECIPES)
}
export function editRecipe(recipeToEdit, navigate) {
    localStorage.setItem(RECIPETOEDIT, JSON.stringify(recipeToEdit))
    navigate(EDIT_RECIPE)
}
export function getNumberOfRecipes(){
    const recipeDataStr = localStorage.getItem(RECIPES)
    let recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    return recipeData.length
}
