import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from 'jodit-react';
import { RECIPETOEDIT } from "../config/localStorage";
import { createFetchedIngredients, createFetchedRecipe } from "../utils/recipes";
import {renderToString} from "react-dom/server"

function RecipeCentre() {
    const [fetched, setFetched] = useState("")
    const [obj,setObj] = useState({})
    const [recipe,setRecipe] = useState({id:"",title:" ",subtitle:" ",description:" ",content:""})
    const editor = useRef(null)
    const config = useMemo(() =>
    ({
        uploader: { "insertImageAsBase64URI": true },
        editHTMLDocumentMode:true,
        toolbar: false,
        readonly: true,
        height: 500
    }),
        []
    );

    useEffect(() => {
        setRecipe(createFetchedRecipe(obj))
    }, [obj])

    useEffect(() => {
        createObj(fetched)
    }, [fetched])


    const handleSearch = async () => {
        let fetchedData
        const search = 'https://www.themealdb.com/api/json/v1/1/random.php'

        try {
            const response = await fetch(search, {
                method: 'GET'
            })
            if (!response.ok) {
                throw new Error('Response was not okay')
            }

            fetchedData = await response.json()
        } catch (error) {
            console.error('Error', error)
        }
        setFetched(fetchedData.meals[0])
    }

    function createObj(fetch){
        let temp = Object.entries(fetch)
        temp.forEach((entry,index)=>{
            setObj((prev)=>({
                ...prev,
                [entry[0]]:entry[1]
            }))
        })
    }
    
    return (
        <div className ="card">
            <div>
                <h4>{recipe.title}</h4>
                <h3>{recipe.subtitle}</h3>
                <h2>{recipe.description}</h2>
            </div>
            <div className="card"  >
                <JoditEditor
                    ref={editor}
                    value={recipe.content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                />
            </div>
            <form>
            <button onClick={handleSearch}>Fetch</button>
            <button onClick={() => {
                createObj()
                }}>Test</button>
            <button onClick={() => console.log(renderToString(createFetchedIngredients(obj)))}>Test</button>
        </form>
        </div>
    )
}

export default RecipeCentre