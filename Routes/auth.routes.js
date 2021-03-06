const express=require('express');
const route=express.Router();
const auth=require("../controller/auth.controller")
const location=require("../controller/location.controller")
// register controller


route.post("/busregister",auth.Busregister);
route.post("/parentregister",auth.Parentregister);
route.post("/studentregister",auth.Studentregister);
route.post("/adminRegister",auth.AdminSignUp)
route.post("/driverSignup",auth.Driver1SignUp);
route.post("/driverLogin",auth.DriverLogin1);
route.post("/driverReset",auth.resetDriverPass);
route.post("/updateDriverPassword",auth.postNewDriverPassword);
// login controller
route.post("/buslogin",auth.Buslogin);
route.post("/parentlogin",auth.Parentlogin);
route.post("/studentlogin",auth.Studentlogin);
route.post("/studentReset",auth.resetStudentPass);
route.post("/updateStudentPassword",auth.postNewStudentPassword);
route.post("/adminLogin",auth.AdminLogin)

// get and set driver location

route.post("/setBusLocation",location.BusLocationSave)
route.post("/setStudentLocation",location.studentLocationSave)

route.get("/getbus",auth.getBus);

route.get("/getbuslocation/:id/:destination",location.getbuslocation)

route.get("/getstudentlocation/:id",location.getstudentlocation)

route.get("/getStudentByNic/:nic",auth.getStudentByNic)

route.post("/deleteStudent/:id",auth.deleteStudent)


// get students by parent nic
route.post("/update/:id",auth.updatestudent)




// export routes

module.exports = route;