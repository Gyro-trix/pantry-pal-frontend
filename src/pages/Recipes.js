import React, { useState } from "react";
import { displayRecipe } from "../utils/recipes";

function Recipes(){
    const [recipeIndex, setRecipeIndex] = useState(0)

    return(
        <div>
                {displayRecipe(recipeIndex)}
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

)

}



export default Recipes