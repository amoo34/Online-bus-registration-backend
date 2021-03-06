const express=require('express');
const route=express.Router();
const dashticsController = require('../controller/dashtics.controller')

route.get('/',dashticsController.getDashticsData)
route.get('/buses',dashticsController.getBusesData)
route.get('/students',dashticsController.getStudentsData)
route.post('/buses',dashticsController.updateBusData)
route.post('/buses/delete',dashticsController.deleteBus)
route.patch('/students',dashticsController.updateStudentData)
route.post('/students/delete',dashticsController.deleteStudent)
route.get('/drivers',dashticsController.getDrivers)
route.patch('/drivers',dashticsController.updateDriverData)
route.post('/drivers/delete',dashticsController.deleteDriver)


module.exports = route