const router = require("express").Router()
const Coin = require("../models/Coin")

//create Coin
router.post("/", async (req,res) =>{
  const newCat = new Coin(req.body);
  try {
    const savedCat = await newCat.save()
    res.status(200).json(savedCat)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get Coin
router.get("/", async (req,res) =>{
  try {
    const cats = await Coin.find()
    res.status(200).json(cats)
  } catch (error) {
    res.status(500).json(error)
  }
})

//export
module.exports = router