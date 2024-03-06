import React, { useState, useEffect,useRef,useMemo } from "react";
import { displayRecipe } from "../utils/recipes";
import { useNavigate } from "react-router-dom";
import { checkUserLogin } from "../utils/users";
import { CUR_USER } from "../config/localStorage";
import JoditEditor from 'jodit-react';

function Recipes() {
    const editor = useRef(null);
    const config = useMemo(() =>
        ({ 
        uploader: { "insertImageAsBase64URI": true },
        toolbar:false,
        readonly:true
     }),
        []
    );
    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate();
    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])
console.log(displayRecipe(0))
    return (
        <div>
<div className="card">
                <JoditEditor
                    ref={editor}
                    value={displayRecipe(0)}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    
                    onChange={newContent => { }}
                />
            </div>
        </div>

    )
    /*
    {displayRecipe(recipeIndex)}
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
    */
}



export default Recipes