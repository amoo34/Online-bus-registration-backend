const Bus=require("../model/bus.model")
const Student=require("../model/student.modal")
const Driver1 = require("../model/driver1.model");


const getDashticsData =async (req,res,next) =>{
    console.log("Getting dash data")
    const students = await Student.countDocuments()
    const buses = await Bus.countDocuments()
    console.log(students)
    return res.status(200).json({success:true,studentsData:students,busesData:buses})
}

const getBusesData =async (req,res,next) =>{
    console.log("Getting dash data")
    // const studentsLength = await Student.find()
    const buses = await Bus.find()
    return res.status(200).json({success:true,busesData:buses})
}

const getStudentsData =async (req,res,next) =>{
    console.log("Getting dash data")
    // const studentsLength = await Student.find()
    const students = await Student.find()
    return res.status(200).json({success:true,studentsData:students})
}

const updateBusData =async (req,res,next) =>{


    console.log("update dash data",req.body.busId,req.body.id)
    const _id = req.body.id

    // const studentsLength = await Student.find()
    try{
        const bus = await Bus.updateOne({_id},{
            $set:{
                busNumber:req.body.busId
            }
        })
        console.log(bus)
        return res.status(200).json({success:true,bus}) 
    }
    catch(error){
        return res.status(501).json({error:true,res:error?.message})
    }
}


const updateDriverData =async (req,res,next) =>{


    console.log("update dash data",req.body.busNo,req.body.id)
    const _id = req.body.id

    // const studentsLength = await Student.find()
    try{
        const bus = await Driver1.updateOne({_id},{
            $set:{
                bussNo:req.body.busNo
            }
        })
        console.log(bus)
        return res.status(200).json({success:true,bus}) 
    }
    catch(error){
        return res.status(501).json({error:true,res:error?.message})
    }
}

const updateStudentData =async (req,res,next) =>{
    console.log("update dash data",req.body.studentRegNumber,req.body.id)
    const _id = req.body.id

    // const studentsLength = await Student.find()
    try{
        const student = await Student.updateOne({_id},{
            $set:{
                regNumber:req.body.studentRegNumber
            }
        })
        console.log(student)
        return res.status(200).json({success:true,student}) 
    }
    catch(error){
        return res.status(501).json({error:true,res:error?.message})
    }
}

async function getDrivers(req,res){

    await Driver1.find()
    .then((usr)=>{
        if(usr){
            res.status(200).json(usr);
        }else{
            res.status(501).json({message:'no data found'})
        }

    })
    .catch((err)=>res.status(400).json({message:'Database connection error occured'}))

}

module.exports = {
    updateDriverData,
    getDrivers,
    getDashticsData,
    getBusesData,
    updateBusData,
    getStudentsData,
    updateStudentData
}