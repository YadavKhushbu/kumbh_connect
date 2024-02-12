const express = require("express");
const app = express();

//routes
const authRoutes = require("./routes/auth.js");

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
// app.use(cors({credentials:true, exposedHeaders: ["set-cookie"], origin: process.env.FRONT_END_URL}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Add other CORS headers as needed
    next();
  });
  
app.use(express.json());
app.use(express.static('public'));
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
app.use("/auth",authRoutes);

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
