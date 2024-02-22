import { RECIPES, INGREDIENTS } from "../config/localStorage"

export function saveRecipe(recipe) {
    const recipeDataStr = localStorage.getItem(RECIPES)
    const recipeData = recipeDataStr ? JSON.parse(recipeDataStr) : []
    const ingredientsDataStr = localStorage.getItem(INGREDIENTS)
    const ingredientsData = ingredientsDataStr ? JSON.parse(ingredientsDataStr) : []
    recipe.ingredients = [...recipe.ingredients, ingredientsData]
    if (recipe.name && recipe.instructions && (recipe.ingredients.length > 0)) {
        let temparray = [...recipeData,recipe]
        localStorage.setItem(RECIPES,JSON.stringify(temparray))
        localStorage.setItem(INGREDIENTS,[])
    }

}

export function addIngredient(ingredient) {
    const ingredientsDataStr = localStorage.getItem(INGREDIENTS)
    const ingredientsData = ingredientsDataStr ? JSON.parse(ingredientsDataStr) : []
    let temparray = [...ingredientsData, ingredient]
    console.log(temparray)
    localStorage.setItem(INGREDIENTS, JSON.stringify(temparray))
}

export function displayIngredients(){
    const ingredients = JSON.parse(localStorage.getItem(INGREDIENTS))
    if ((ingredients === null) === false) {
        return ingredients.map((ingredient, index) => {
            return (
                <div key={ingredient.name+index} className="card" style={{ marginTop: 10 }}>
                    <div className="card-body">
                        <p className="card-text">Item Name: {ingredient.name} Amount:{ingredient.amount} </p>
                        <button type="button" className="btn btn-primary" >Delete Ingredient</button>
                    </div>
                </div>

            )
        })
    }
}

export function displayRecipes() {

}