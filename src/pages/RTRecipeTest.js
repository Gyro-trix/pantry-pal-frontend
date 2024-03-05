import React, { useState, useEffect, useRef } from 'react'
import Quill from 'quill';
import "quill/dist/quill.snow.css"

function RTRecipeTest() {
  return(
    <div>
      
    </div>
  )
}

/*Quill JS
let quill
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];
  const editor = useRef(null)
  const options = {
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
  };

  setTimeout(() => {quill = new Quill(editor.current, options) }, 100)

function saveRecipe(){
  localStorage.setItem("EDITOR_TEST",JSON.stringify(quill.getContents()))
}
function loadRecipe(){
  const recipe =  JSON.parse(localStorage.getItem("EDITOR_TEST"))
  quill.setContents(recipe)
}

  return (
    <div style={{ background: "white" }}>
      <div ref={editor}></div>
      <button onClick = {saveRecipe}>Save Recipe</button>
      <button onClick = {loadRecipe}>Load Recipe</button>
    </div>

  )
*/

export default RTRecipeTest