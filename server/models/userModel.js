const mongoose=require("mongoose")
const validator=require("validator");
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxLength:[30,"Name is too long"],
        minLength:[4,"Name Should have more than 4 characters"]
    },
    email:{
         type:String,
         require:true,
         unique:true,
         validate:[validator.isEmail,"Please enter valid email"]
    },
    password:
    {
        type:String,
        require:[true,"Please enter passwrod"],
        minLength:[8,"Password should have length of 8 characters "],
       
    }
})

module.exports= mongoose.model("User",userSchema)