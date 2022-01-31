const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:true
  },
  desc:{
    type:String,
    required:true,
  },
  photo:{
    type:String,
    required:false,
  },
  username:{
    type:String,
    required:true,
  },
  categories:{
    type:String,
    required:false
  },
  price:{
    type:String,
    required:true
  },
  coin:{
    type:String,
    required:false
  },
  available:{
    type:String,
    required:false
  },
  
},
{timestamps:true})

module.exports = mongoose.model("Post",PostSchema)