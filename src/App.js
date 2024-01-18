import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";



function CheckUser() {
  const curuser = localStorage.getItem("CUR_USER")
  const allUserDataStr = localStorage.getItem("ALL_USERS")
  const allUserData = JSON.parse("[" + allUserDataStr + "]")
  const navigate = useNavigate();
  for (let i = 0; i < allUserData.length; i++) {
    if (!(allUserData[i].username === curuser.username)) {
      navigate('/login')
    }
  }
}
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<CheckUser />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
