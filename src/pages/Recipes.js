import React, { useState, useEffect, useRef, useMemo } from "react";
import { displayRecipe } from "../utils/recipes";
import { useNavigate } from "react-router-dom";
import { checkUserLogin } from "../utils/users";
import { CUR_USER } from "../config/localStorage";
import JoditEditor from 'jodit-react';

function Recipes() {
    const editorOne = useRef(null)
    const editorTwo = useRef(null)
    const left = useRef(null)
    const right = useRef(null)
    const [index,setIndex] = useState(0)
    const config = useMemo(() =>
    ({
        uploader: { "insertImageAsBase64URI": true },
        toolbar: false,
        readonly: true,
        height: 500
    }),
        []
    );
    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate();
    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])


    function moveRight(){
        const divleft = left.current
        divleft.className = "card leftDiv"
        const divright = right.current
        divright.className = "card rightDiv"
        setIndex(index+1) 
    }

    function moveLeft(){
        
    }


    return (
        <div className = "container">
            <div className="container d-inline-flex" style={{ marginTop: 32 }}>
                <div ref = {left} onAnimationEnd = {(e)=> e.currentTarget.className = "card"} className="card" style={{ margin: "auto", width: "50%", transform: "translateX(50%)" }}>
                    <JoditEditor
                        ref={editorOne}
                        value={displayRecipe(index)}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onChange={newContent => { }}
                    />
                </div>
                <div ref ={right} onAnimationEnd = {(e)=> e.currentTarget.className = "card"} className="card" style={{ margin: "auto", width: "50%", transform: "translateX(150%)" }}>
                    <JoditEditor
                        ref={editorTwo}
                        value={displayRecipe(index+1)}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onChange={newContent => { }}
                    />
                </div>

            </div>
            <button onClick = {moveRight}>Previous Page</button>
            <button onClick = {moveRight}>Next Page</button>
        </div>
    )
    /*
    setIndex(index-1)
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