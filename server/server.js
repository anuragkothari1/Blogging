const express= require("express")
const app= express();
const dotenv=require("dotenv");
dotenv.config();
const userRoute= require("./routes/userRoute")
const blogRoute=require("./routes/blogRoutes")
const mongoose=require("mongoose")
// const cors=require("cors")

mongoose.connect(process.env.URL).then(()=>console.log("MOngo Connected")).catch((e)=> console.log(e))
app.use(express.json());
// app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use("/api",userRoute);
app.use("/api",blogRoute)
app.listen(process.env.PORT,()=>{console.log("Server is running")})