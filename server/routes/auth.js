const router= require("express").Router()
const bcrypt= require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")

const User = require("../models/User")

//multer configuration
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/uploads/") // store uploaded files in the uploads folder
    },
    filename:function(req,file,cb){
        cb(null,file.originalname) //use the original file name
    }
})

const upload = multer({storage})
//user register 
router.post("/register",upload.single('profileImage'),async (req,res)=>{
    try{
       //take all data information from form
       const {firstname,lastname,email,password} = req.body
       //uploaded image
       const profileImage = req.file;

       if(!profileImage){
        return res.status(400).send("No file uploaded")
       }
     //path of uploaded profile photo
       const profileImagePath = profileImage.path
    
       //check if user already exists
       const existingUser = await User.findOne({email:email});
      if(existingUser){
        return res.status(400).json({
            message:"User already exists",
        })
      }

      //hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password,salt);
      //create a new user
      const newUser= new User.create({
        firstname,
        lastname,
        email,
        password:hashedPassword,
        profileImagePath,
      });
      await newUser.save();
      //return res
      return res.status(200).json({
        message:"user register successfully",
        user:newUser,
      })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"error while registering the user",
            error:error.message,
        })
    }
})

module.exports = router