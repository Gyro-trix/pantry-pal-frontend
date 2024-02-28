import React, { useState,useEffect } from "react";
import { displayRecipe } from "../utils/recipes";
import { useNavigate } from "react-router-dom";
import { checkUserLogin } from "../utils/users";
import { CUR_USER } from "../config/localStorage";

function Recipes(){
    const [recipeIndex, setRecipeIndex] = useState(0)
    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate();
    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
      }, [currentUserStr, navigate])

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