import React, { useState, useEffect, useRef, useMemo } from "react";
import { displayRecipe } from "../utils/recipes";
import { useNavigate } from "react-router-dom";
import { checkUserLogin } from "../utils/users";
import { CUR_USER } from "../config/localStorage";
import JoditEditor from 'jodit-react';

function Recipes() {
    const [index, setIndex] = useState(0)
    const [cardClass,setCardClass] = useState("card")
    const [cardStyle, setCardStyle] =useState({height:500})
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


    function nextRecipe(){
        setCardClass("card nextRecipe")
        setTimeout(()=>setIndex(index+1),500)
    }

    function prevRecipe(){
        setCardStyle({height:500,animationDirection:"reverse" })
        setCardClass("card nextRecipe")
        setTimeout(()=>setIndex(index-1),500)
    }

    return (
        <div className="card w-50 mb-3" style={{ height: 600,margin: "auto",overflow:"hidden"}} >
            <div  className ={cardClass} onAnimationEnd = {()=>{setCardClass("card"); setCardStyle({height:500})}} style ={cardStyle} >
                        <JoditEditor
                        ref = {editor}
                            value={displayRecipe(index)}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onChange={newContent => { }}
                        />
            </div>        
            <button onClick = {()=> prevRecipe()}>Previous</button>
            <button onClick = {()=> nextRecipe()}>Next</button>
        </div>
    )

}

export default Recipes