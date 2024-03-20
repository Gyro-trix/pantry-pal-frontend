import './App.css';
import { HashRouter, Routes, Route  } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CreateStorage from "./pages/CreateStorage";
import EditStorage from "./pages/EditStorage";
import UserSettings from "./pages/UserSettings";
import NavBar from './pages/NavBar';
import Notifications from './pages/Notifications';
import CreateRecipes from './pages/CreateRecipes';
import Recipes from './pages/Recipes';
import ManageUsers from './pages/ManageUsers';
import EditUser from './pages/EditUser'
import CreateUser from './pages/CreateUser'
import EditRecipe from './pages/EditRecipe'
import UserMessages from './pages/UserMessages';
import RecipeCentre from'./pages/RecipeCentre';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <div style={{ background: "lightblue", height: "100vh", minWidth: 600 }}>

      <HashRouter basename='/'>
        <NavBar />
        <div >
          <ToastContainer />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createStorage" element={<CreateStorage />} />
            <Route path="/editStorage" element={<EditStorage />} />
            <Route path="/userSettings" element={<UserSettings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/createrecipes" element={<CreateRecipes />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/manageusers" element={<ManageUsers />} />
            <Route path="/edituser" element={<EditUser />} />
            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/editrecipe" element={<EditRecipe />} />
            <Route path="/usermessages" element ={<UserMessages/>}/>
            <Route path="/recipecentre" element ={<RecipeCentre/>}/>
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}


export default App;
