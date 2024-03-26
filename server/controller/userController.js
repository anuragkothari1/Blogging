const User= require("../models/userModel");
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv");
dotenv.config();
const validator = require("validator");

module.exports.regsiterUser=async (req,res,next)=>{
try{
const{name,email,password}=req.body;
if (!validator.isEmail(email)) {
    return res.status(400).json({
        success: false,
        message: "Please enter a valid email"
    });
}
if (password.length < 8) {
    return res.status(400).json({
        success: false,
        message: "Password should have a minimum length of 8 characters"
    });
}

if (name.length < 4) {
    return res.status(400).json({
        success: false,
        message: "Name should have a minimum length of 8 characters"
    });
}
const useremail=await User.findOne({email});
if(useremail){
   return res.status(400).json({
        success:false,
        message:"User already exist"
    })
}
const user=await User.create({
    name,email,password
})
const token=jwt.sign({id:user._id},process.env.JWTSECRET,{ expiresIn: '1h' })
return res.status(200).json({
    success:true,
    message:"user created Successfully",
    token
})
}
catch(e){
    console.log(e)
    return res.status(500).json({
        success:false,
        message:"Server1 Error"
    })

}
 
}

module.exports.loginUser= async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        console.log("hello")
        console.log("Email:", email);
        console.log("Password:", password);
        const user= await User.findOne({email})
        console.log("User:", user);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        if(user.password!==password){
            return res.status(400).json({
                success:false,
                message:"Invalid Email or password"
            })
        }
        const token=jwt.sign({id:user._id},process.env.JWTSECRET,{ expiresIn: '1h' })
       
        return res.status(200).json(
            {
                success:true,
                token
            }
        )


    }
    catch(e){
          res.status(500).json({
            success:false,
            message:"server Error"
          })
    }
}