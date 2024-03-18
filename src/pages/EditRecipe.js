import React, { useState, useEffect, useRef, useMemo } from "react";
import { saveOverRecipe } from "../utils/recipes";
import { CUR_USER, RECIPETOEDIT } from "../config/localStorage"
import { checkAdminLogin } from "../utils/users";
import { useNavigate } from "react-router-dom";
import JoditEditor from 'jodit-react';

function EditRecipe() {
    const recipeStr = localStorage.getItem(RECIPETOEDIT)
    const [recipe,setRecipe] = useState(JSON.parse(recipeStr))
    const editor = useRef(null);
    const [content, setContent] = useState(recipe.content);
    
    const config = useMemo(() =>
        ({ uploader: { "insertImageAsBase64URI": true } }),
        []
    );

    const currentUserStr = localStorage.getItem(CUR_USER)
    const navigate = useNavigate()
    useEffect(() => {
        checkAdminLogin(currentUserStr, navigate)
    }, [currentUserStr, navigate])

    useEffect(() => {
        setRecipe((prev) => ({
            ...prev,
            content: content,
        })) 
    }, [content])

    const handleChange = e => {
        setRecipe((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="container" style={{ background: "lightblue", padding: 16 }}>
            
            <input
                    className="form-control"
                    style ={{marginBottom: 16}}
                    value = {recipe.title}
                    type="text"
                    name="title"
                    onChange={handleChange} />
            
            
                <input
                    className="form-control"
                    style ={{marginBottom: 16}}
                    value = {recipe.subtitle}
                    type="text"
                    name="subtitle"
                    onChange={handleChange} />
            
            
                <input
                    className="form-control"
                    style ={{marginBottom: 16}}
                    value = {recipe.description}
                    type="text"
                    name="description"
                    onChange={handleChange} />
            
            <div className="card">
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => setContent(newContent)}
                />
            </div>
            <button type="button" className="btn btn-primary" onClick = {()=>{saveOverRecipe(recipe,navigate)}}>Save Recipe</button>
        </div>
    )
}
export default EditRecipe