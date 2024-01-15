import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
const nm = "Pantry Pal";
const count = 1;
const mcolor = 'powderblue';
const title = "Pantry Pal";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Home/>}>
        <Route index element={<Home/>}/>
        <Route path = "Login" element={<Login/>}/>
        <Route path = "Register" element={<Register/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}


export default App;
