import React, { useState, useEffect, useRef, useMemo } from "react";
import { deleteRecipe, displayRecipe, displayRecipeHeader, editRecipe, getNumberOfRecipes } from "../utils/recipes";
import { useNavigate } from "react-router-dom";
import { checkUserLogin } from "../utils/users";
import { CUR_USER,THEME } from "../config/localStorage";
import JoditEditor from 'jodit-react';

function Recipes() {
    const themeStr = localStorage.getItem(THEME)
  const theme = JSON.parse(themeStr)
    const [index, setIndex] = useState(0)
    const [cardClass, setCardClass] = useState("card")
    const [headerClass,setHeaderClass] = useState("")
    const [cardStyle, setCardStyle] = useState({ height: 500 })
    const indexLimit = getNumberOfRecipes() - 1
    const editButton = useRef(null)
    const deleteButton = useRef(null)
    const editor = useRef(null)
    const config = useMemo(() =>
    ({
        uploader: { "insertImageAsBase64URI": true },
        theme:theme.name,
        toolbar: false,
        readonly: true,
        height: 500
    }),
        [theme.name]
    );
    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate();
    useEffect(() => {
        checkUserLogin(currentUserStr, navigate)
        const currentUser = JSON.parse(currentUserStr)
        if (currentUser.adminlevel === 3) {
            editButton.current.hidden = false
            deleteButton.current.hidden = false
        }
    }, [currentUserStr, navigate])


    function nextRecipe() {
        setCardClass("card nextRecipe")
        setHeaderClass("changeHeader")
        setTimeout(() => {
            if (index < indexLimit) {
                setIndex(index + 1)
            } else if (index >= indexLimit) {
                setIndex(0)
            }
        }, 500)

    }

    function prevRecipe() {
        setCardStyle({ height: 500, animationDirection: "reverse" })
        setCardClass("card nextRecipe")
        setHeaderClass("changeHeader")
        setTimeout(() => {
            if (index > 0) {
                setIndex(index - 1)
            } else if (index <= 0) {
                setIndex(indexLimit)
            }
        }, 500)

    }

    return (
        <div className="container" style={{ minWidth: "100%",marginTop: 16 }}>
            <div className="card w-75 mb-3" style={{ margin: "auto", overflow: "hidden", padding: 16 }} >
                <div className={headerClass} onAnimationEnd={()=> setHeaderClass("")} >{displayRecipeHeader(index)}</div>
                <div className={cardClass} onAnimationEnd={() => { setCardClass("card"); setCardStyle({ height: 500 }) }} style={cardStyle} >
                    <JoditEditor
                        ref={editor}
                        value={displayRecipe(index)}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                    />
                </div>
                <div className="col d-flex justify-content-between" style={{ marginTop: 16 }}>
                    <button type="button" className={theme.button} onClick={() => prevRecipe()} style={{ width: 112 }}>Previous</button>
                    <button ref={editButton} type="button" className={theme.button} onClick = {()=>editRecipe(index,navigate)}style={{ width: 112, marginLeft: 8 }} hidden = {true}>Edit</button>
                    <button ref={deleteButton} type="button" className={theme.button}  onClick = {()=> deleteRecipe(index,navigate)}style={{ width: 112, marginLeft: 8 }} hidden={true} >Delete</button>
                    <button type="button" className={theme.button} onClick={() => nextRecipe()} style={{ width: 112, marginLeft: 8 }}>Next</button>
                </div>
            </div>
        </div>
    )
//deleteRecipe(index,navigate)
}

export default Recipes