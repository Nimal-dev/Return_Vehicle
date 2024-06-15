const express=require('express')
const router=express.Router()

const truckController=require('./truck.controller')

router.post('/addtruckowner',truckController.addTruckowner)
router.post('/login',truckController.login)
router.post('/addtruck',truckController.addTruck)
router.get('/viewtruck',truckController.viewTruck)
router.post('/gettruck',truckController.getTruck)
router.post('/edittruck',truckController.updateTruck)
router.post('/deltruck',truckController.deleteTruck)
router.post('/schedule',truckController.addSchedule)
router.get('/viewschedule',truckController.viewScheduledTrucks)
router.post('/getschedule',truckController.getSchedule)
router.post('/updateschedule',truckController.updateSchedule)
router.post('/deleteschedule',truckController.deleteSchedule)
router.post('/approve',truckController.approve)
router.post('/reject',truckController.reject)
router.post('/addDriver',truckController.addDriver)
router.get('/viewDrivers',truckController.viewDrivers)
router.post('/EditDriver',truckController.EditDriver)
router.post('/getDrivers',truckController.getDrivers)
router.post('/deleteDriver',truckController.deleteDriver)



module.exports=router