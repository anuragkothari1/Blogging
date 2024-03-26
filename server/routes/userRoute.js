const router= require("express").Router();
const { regsiterUser, loginUser}=require("../controller/userController")
router.post("/register",regsiterUser);
router.post("/login",loginUser);
module.exports=router;