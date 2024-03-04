import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Quill from 'quill';
import "quill/dist/quill.core.css";



function RTRecipeTest() {
  const container = document.getElementById('editor')
  const options = {
    debug: 'info',
    placeholder: 'Compose an epic...',
    theme: 'snow'
  }
  const [quill,setQuill] = useState("")
useEffect(()=>{
setQuill(new Quill(container, options))
},[container])

  return (
    <div id="no" style={{ background: "white" }}>
      <div id='editor'></div>
      <button >Save Recipe</button>

    </div>
  )

}

export default RTRecipeTest