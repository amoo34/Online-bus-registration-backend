const express=require('express');
const route=express.Router();
const dashticsController = require('../controller/dashtics.controller')

route.get('/',dashticsController.getDashticsData)
route.get('/buses',dashticsController.getBusesData)
route.get('/students',dashticsController.getStudentsData)
route.post('/buses',dashticsController.updateBusData)
route.patch('/students',dashticsController.updateStudentData)
module.exports = route