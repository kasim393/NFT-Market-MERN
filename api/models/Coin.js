const mongoose = require("mongoose")

const CoinSchema = new mongoose.Schema({
  
  name:{
    type:String,
    required:true,
  },
},
{timestamps:true})

module.exports = mongoose.model("Coin",CoinSchema)