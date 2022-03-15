const express= require('express')
const router = express.Router()
const foodManager = require('../Manager/food')
const uploader = require('../services/upload')

const newFood = new foodManager()

router.post('/', (req,res)=>{
    let food = req.body
    newFood.createNewFood(food).then(result=>res.send(result))
    
})

module.exports=router;