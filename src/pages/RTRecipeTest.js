import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RTRecipeTest() {
  const [editorValue, setEditorValue] = useState('');
  const [recipe, setRecipe] = useState("")

  function saveRTRecipe() {
    setRecipe(editorValue)
    localStorage.setItem("RTRECIPE", JSON.stringify(editorValue))
  }
  return (
    <div style = {{background:"white"}}>
      <ReactQuill
        value={editorValue}
        onChange={(value) => setEditorValue(value)}
      />
      <button onClick={saveRTRecipe}>Save Recipe</button>
    </div>
  )
}
export default RTRecipeTest