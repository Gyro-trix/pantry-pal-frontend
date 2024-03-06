
import React, { useState, useEffect, useMemo, useRef } from "react";
import { saveRecipe, displayRecipe, getNumberOfRecipes } from "../utils/recipes";
import AddIngredient from "./AddIngredient";
import { useNavigate } from "react-router-dom";
import { RECIPETOADD, CUR_USER, INGREDIENTS } from "../config/localStorage";
import { checkAdminLogin } from "../utils/users";
import JoditEditor from 'jodit-react';


function CreateRecipes() {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() =>
        ({ uploader: { "insertImageAsBase64URI": true } }),
        []
    );

    const currentUserStr = localStorage.getItem(CUR_USER)
   
    const navigate = useNavigate()
    useEffect(() => {
        checkAdminLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    return (
        <div className="container" style={{ background: "lightblue", padding: 16 }}>
            <div className="card">
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => { }}
                />
            </div>
        </div>
    )
    /*
    <div className = "card-body">
                        {displayRecipe(recipeIndex,navigate)}
                        
                        </div>
                    
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
                <div className = "card" style = {{marginTop:32}}>
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
    */
}

export default CreateRecipes