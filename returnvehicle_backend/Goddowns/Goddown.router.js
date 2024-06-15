const express=require('express')
const router=express.Router()

const goddownController=require('./Goddown.controller')

router.post('/addgodown',goddownController.addGoddown)



module.exports=router