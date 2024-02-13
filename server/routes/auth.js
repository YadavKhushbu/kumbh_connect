const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    /* Take all information from the form */
    const { firstName, lastName, email, password } = req.body;

    /* The uploaded file is available as req.file */
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    /* path to the uploaded profile photo */
    const profileImagePath = profileImage.path;

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    /* Hass the password */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Create a new User */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    /* Save the new User */
    await newUser.save();

    /* Send a successful message */
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
});

//user Login
router.post("/login",async(req,res)=>{
  try{
    //fetch information from form
    const {email,password} = req.body;
    console.log(req.body)
    if(!email || !password){
      return res.status(400).json({
        success:false,
        message:"All the fields are required"
      });
    }
    
      //check if user exisits
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({
          success:false,
          message:"user is not registered ,please register first"
        });
      }
      //compare the password with the hashed password
      const ismatch = await bcrypt.compare(password,user.password);
      if(!ismatch){
        return res.status(400).json({
          success:false,
          message:"password not matches ,please fill correct password"
        });
      }

      //generate jwt token
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
      delete user.password

      //return res
      return res.status(200).json({
        token,user,
        message:"User Login successfully"
      })

  }catch(err){
    console.log(err);
    return res.status(500).json({
      error:err.message,
      message:"error while login"
    })
  }
})
module.exports = router