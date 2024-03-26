const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    heading: {
        type: String,
        require: [true, "Please Enter heading"]

    },
    content: {
        type: String,
        require: [true, "Please Enter Content"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})


module.exports= mongoose.model("Blog",blogSchema)