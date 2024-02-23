import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CreateStorage from "./pages/CreateStorage";
import EditStorage from "./pages/EditStorage";
import UserSettings from "./pages/UserSettings";
import NavBar from './pages/NavBar';
import Notifications from './pages/Notifications';
import CreateRecipes from './pages/CreateRecipes';

function App() {

  
  return (
    <div >
      
      <BrowserRouter>
      <NavBar />  
      <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createStorage" element={<CreateStorage />} />
        <Route path="/editStorage" element={<EditStorage />} />
        <Route path="/userSettings" element={<UserSettings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/createrecipes" element={<CreateRecipes />} />

      </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}


export default App;
