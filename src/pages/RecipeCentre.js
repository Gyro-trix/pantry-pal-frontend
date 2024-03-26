import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from 'jodit-react';
import { THEME } from "../config/localStorage";
import { createFetchedRecipe, saveFetchedRecipe } from "../utils/recipes";

function RecipeCentre() {
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)
    const navigate = useNavigate()
    const [fetched, setFetched] = useState(null)
    const [obj, setObj] = useState(null)
    const [recipe, setRecipe] = useState({ id: " ", title: " ", subtitle: " ", description: " ", content: "" })
    const editor = useRef(null)
    const config = useMemo(() =>
    ({
        uploader: { "insertImageAsBase64URI": true },
        theme: theme.name,
        editHTMLDocumentMode: true,
        toolbar: false,
        readonly: true,
        height: 500
    }),
        [theme.name]
    );

    useEffect(() => {
        if (!(obj === null)) {
            setRecipe(createFetchedRecipe(obj))
        }
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

    function createObj(fetch) {
        if (!(fetch === null)) {
            let temp = Object.entries(fetch)
            temp.forEach((entry, index) => {
                setObj((prev) => ({
                    ...prev,
                    [entry[0]]: entry[1]
                }))
            })
        }

    }

    return (
        <div className="container">
            <div className="card" style={{ padding: 16, marginTop: 16 }}>
                <div>
                    <h2>{recipe.title}</h2>
                    <h3>{recipe.subtitle}</h3>
                    <h4>{recipe.description}</h4>
                </div>
                <div className="card"  >
                    <JoditEditor

                        ref={editor}
                        value={recipe.content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                    />
                </div>
                <div className="col d-flex justify-content-between" style={{ padding: 16 }}>
                    <button className={theme.button} style={{ marginTop: 16 }} onClick={() => {
                        handleSearch()
                        createObj(fetched)
                    }}>Get Random Recipe</button>
                    <button className={theme.button} style={{ marginTop: 16 }} onClick={() => {
                        saveFetchedRecipe(recipe, navigate)
                    }}>Save Random Recipe</button>
                </div>
            </div>
        </div>
    )
}

export default RecipeCentre