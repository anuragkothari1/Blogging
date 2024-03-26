const { createBlog, getAllBlogs, getYourBlogs, getBlogDetail, deleteBlog,editBlog } = require("../controller/blogController");
const { verifyToken } = require("../middleware/tokenVerification");

const router= require("express").Router();

router.post("/createblog",verifyToken,createBlog);
router.get("/getallblogs",getAllBlogs);
router.get("/yourblogs",verifyToken,getYourBlogs);
router.get("/getblogdetails",getBlogDetail);
router.delete("/deleteblog",verifyToken,deleteBlog);
router.patch("/editblog",verifyToken,editBlog)

module.exports=router