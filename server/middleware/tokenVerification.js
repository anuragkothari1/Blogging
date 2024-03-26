const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

module.exports.verifyToken=async(req,res,next)=>{
    try{
       const token=req.header('X-Token');
       console.log(token)
       if(!token){
        res.status(400).json({
            success:false,
            message:"access denied"
        })
        
       }
       const decoded=jwt.verify(token,process.env.JWTSECRET);
       req.user=decoded;
       next();

    }
    catch(e){
        res.status(500).json({
            success:false,
            message:"server token Error"
        })
    }
}