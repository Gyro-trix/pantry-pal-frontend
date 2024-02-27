import { RECIPES, INGREDIENTS } from "../config/localStorage"
import { CREATERECIPES } from "../config/routes";

export function saveRecipe(recipe,navigate) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    const ingredientsDataStr = localStorage.getItem(INGREDIENTS)
    const ingredientsData = ingredientsDataStr ? JSON.parse(ingredientsDataStr) : []
    recipe.ingredients = ingredientsData
    if (recipe.name && recipe.instructions && (recipe.ingredients.length > 0)) {
        let temparray = [...recipeData, recipe]
        localStorage.setItem(RECIPES, JSON.stringify(temparray))
        localStorage.setItem(INGREDIENTS, [])
        navigate(CREATERECIPES)
    }

}

export function addIngredient(ingredient) {
    const ingredientsDataStr = localStorage.getItem(INGREDIENTS)
    const ingredientsData = ingredientsDataStr ? JSON.parse(ingredientsDataStr) : []
    if(ingredient.name && ingredient.amount){
        let temparray = [...ingredientsData, ingredient]
    localStorage.setItem(INGREDIENTS, JSON.stringify(temparray))
    window.location.reload()
    } else {
        window.alert("Missing Information")
    }
}

export function displayIngredients() {
    const ingredientsDataStr = localStorage.getItem(INGREDIENTS)
    const ingredients = ingredientsDataStr ? JSON.parse(ingredientsDataStr) : []
    if ((ingredients === null) === false) {
        return ingredients.map((ingredient, index) => {
            return (
                <div key={ingredient.name + index} className="card" style={{ marginTop: 10 }}>
                    <div className="card-body">
                        <p className="card-text">Item Name: {ingredient.name} Amount:{ingredient.amount} </p>
                        <button type="button" className="btn btn-primary" >Delete Ingredient</button>
                    </div>
                </div>

            )
        })
    }
}

export function displayRecipe(index) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    if (index < recipeData.length) {
        const recipe = recipeData[index]
        return (
            <div key={index}>
                <h3>{recipe.name}</h3>
                {recipe.ingredients.map((ingredient, ind) =>
                    (<div key={ind}>
                        <p>{ingredient.amount} of {ingredient.name}</p>
                    </div>)
                )}
                <p>{recipe.instructions}</p>
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