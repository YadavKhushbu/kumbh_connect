const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const database = require("./config/database");

const authRoutes = require("./routes/auth.js")

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes)
/* MONGOOSE SETUP */
const PORT = 3001;

database.connect();
//def routes
app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"your server is up and running ",
    })
})

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})