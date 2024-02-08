const express = require("express");
const app = express();

//routes


//required pacakages
const passport = require("passport");
const ExtractJwt  = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

//database connect
const database = require("./config/database");
database.connect();

//middlewares
app.use(cors({credentials:true, exposedHeaders: ["set-cookie"], origin: process.env.FRONT_END_URL}));

app.use(express.json());
app.use(cookieParser());

//for uploading files
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
//cloudinary connection
cloudinaryConnect();

//routes


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
