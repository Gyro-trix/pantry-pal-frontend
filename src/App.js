import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {  
  localStorage.setItem("CUR_USER"," ")
  
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path = "/" element = {<Login/>}/>
      <Route path = "/home" element = {<Home/>}/>
      <Route path = "/register" element = {<Register/>}/>
    </Routes>
    </BrowserRouter>
  );
}


export default App;
