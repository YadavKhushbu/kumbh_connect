import "./App.css";
import { Route,Routes } from "react-router-dom";
import {HomePage }from "./pages/HomePage"
import {RegisterPage }from "./pages/RegisterPage"
import {LoginPage }from "./pages/LoginPage"
import { CreateListing } from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element = {<HomePage/>}/>
          <Route path="/register" element = {<RegisterPage/>}/>
          <Route path="/login" element = {<LoginPage/>}/>
          <Route path="/create-listing" element = {<CreateListing/>}/>
          <Route path="/properties/:listingId" element={<ListingDetails />} />
      </Routes>
    </div>
  );
}

export default App;
