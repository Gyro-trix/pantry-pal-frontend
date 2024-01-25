import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CreateStorage from "./pages/CreateStorage";
import EditStorage from "./pages/EditStorage";
import NavBar from './pages/NavBar';

function App() {
  return (
    <div>
      
     
      <BrowserRouter>
      <NavBar/>
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createStorage" element={<CreateStorage />} />
        <Route path="/editStorage" element={<EditStorage />} />
      </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}


export default App;
