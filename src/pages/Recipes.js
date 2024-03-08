import React, { useState, useEffect, useRef, useMemo } from "react";
import { displayRecipe, getNumberOfRecipes } from "../utils/recipes";
import { useNavigate } from "react-router-dom";
import { checkUserLogin } from "../utils/users";
import { CUR_USER } from "../config/localStorage";
import JoditEditor from 'jodit-react';

function Recipes() {
    const [index, setIndex] = useState(0)
    const [cardClass, setCardClass] = useState("card")
    const [cardStyle, setCardStyle] = useState({ height: 500 })
    const indexLimit = getNumberOfRecipes() - 1
    console.log(indexLimit)
    const editor = useRef(null)
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


    function nextRecipe() {
        setCardClass("card nextRecipe")
        setTimeout(() => {
            if(index < indexLimit){
                setIndex(index + 1)
            } else if(index >= indexLimit){
                setIndex(0)
            }
            console.log("index",index)
        }, 500)
        
    }

    function prevRecipe() {
        setCardStyle({ height: 500, animationDirection: "reverse" })
        setCardClass("card nextRecipe")
        setTimeout(() => {
            if(index > 0){
                setIndex(index - 1)
            } else if (index <= 0){
                setIndex(indexLimit)
            }
            console.log("index",index)
        }, 500)
        
    }

    return (
        <div style = {{marginTop: 32}}>
            <div className="card w-50 mb-3" style={{ height: 588, margin: "auto", overflow: "hidden", padding:16 }} >
                <div className={cardClass} onAnimationEnd={() => { setCardClass("card"); setCardStyle({ height: 500 }) }} style={cardStyle} >
                    <JoditEditor
                        ref={editor}
                        value={displayRecipe(index)}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onChange={newContent => { }}
                    />
                </div>
                <div className="col d-flex justify-content-between" style ={{marginTop:16}}>
                    <button type="button" className="btn btn-primary" onClick={() => prevRecipe()} style = {{width:128}}>Previous</button>
                    <button type="button" className="btn btn-primary" style = {{width:128,marginLeft:8}} disabled = {true}>Edit</button>
                    <button type="button" className="btn btn-primary" onClick={() => nextRecipe()} style = {{width:128, marginLeft:8}}>Next</button>
                </div>
            </div>
        </div>
    )

}

export default Recipes