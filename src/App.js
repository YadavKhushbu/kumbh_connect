import "./App.css";
import { Route,Routes } from "react-router-dom";
import {Home }from "./pages/HomePage"
import {RegisterPage }from "./pages/RegisterPage"
import {LoginPage }from "./pages/LoginPage"
function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/register" element = {<RegisterPage/>}/>
          <Route path="/login" element = {<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
