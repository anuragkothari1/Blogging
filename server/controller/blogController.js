const Blog = require("../models/blogModel");

module.exports.createBlog= async(req,res,next)=>{
    try{

        console.log("in create blog")
        const{heading,content}=req.body;
        const user_id=req.user.id;
        const blog= await Blog.create({heading,content,user:user_id})
        res.status(200).json({
            success:true
        })

    }
    catch(e){
        console.log(e);
res.status(500).json({
    success:false,
    message:"Server2 Error"
})
    }
}

module.exports.getAllBlogs= async(req,res,next)=>{
    try{const resultPerPage=4;
        
         const currentPage = req.query.page ? parseInt(req.query.page) : 1;
        const skip= resultPerPage*(currentPage-1);
        const blogs= await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(resultPerPage);
        console.log(blogs)
        res.status(200).json({
            success:true,
            blogs
        })

    }
    catch(e){
res.status(500).json({
    success:false,
    message:"server error"
})
    }
}
module.exports.getYourBlogs= async(req,res,next)=>{
    try {const resultPerPage=4;
        
        const currentPage = req.query.page ? parseInt(req.query.page) : 1;
       const skip= resultPerPage*(currentPage-1);
     
        const userId = req.user.id;
        const Blogs = await Blog.find({ user: userId }).skip(skip).limit(resultPerPage);
        return res.status(200).json({
          status: true, Blogs
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({
          status: "server error",
        });
      }}

module.exports.getBlogDetail=async(req,res,next)=>{
    try{
        const id=req.query.blogId
    
        const blog = await Blog.findById(id).lean();
        if(!blog){
            return res.status(400).json({
                success:false,
                message:"no such blog"
            })

        }
        res.status(200).json({
            success:true,
            blog
        })
    }
    catch(e){
        console.error("Error fetching tasks:", e);
        return res.status(500).json({
          status: "server error",
          success:false
        });
    }
}
module.exports.deleteBlog=async(req,res,next)=>{
try{
const id=req.query.blogId;
const blog=await Blog.findById(id);
if(!blog){
    return res.status(400).json({
        success:false,
        message:"no such blog"
    })
    
}
await Blog.findByIdAndDelete(id); 
res.status(200).json({
    success:true,
    message:"blog deleted"
})

}
catch(e){
    console.error("Error fetching tasks:", e);
    return res.status(500).json({
      status: "server error",
      success:false
    });
}

}

module.exports.editBlog=async(req,res,next)=>{
try{
    const id=req.query.blogId;
    const blog=await Blog.findById(id);
    if(!blog){
        return res.status(400).json({
            success:false,
            message:"no such blog"
        })
        
    }
    blog.heading=req.body.heading
    blog.content=req.body.content
    await blog.save();
    return res.status(200).json({
        success:true,
        message:"Blog Updated"
    })

}
catch(e){
    console.error("Error fetching tasks:", e);
    return res.status(500).json({
      status: "server error",
      success:false
    });
}
}