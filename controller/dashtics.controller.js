const Bus=require("../model/bus.model")
const Student=require("../model/student.modal")
const Driver1 = require("../model/driver1.model");


const getDashticsData =async (req,res,next) =>{
    console.log("Getting dash data")
    const students = await Student.countDocuments()
    const buses = await Bus.countDocuments()
    const drivers = await Driver1.countDocuments()
    // console.log(students)
    return res.status(200).json({success:true,studentsData:students,busesData:buses,driversData:drivers})
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

const deleteBus =async (req,res,next) =>{
    // const studentsLength = await Student.find()
    console.log(req.body.id)
    const buss = await Bus.deleteOne({_id:req.body.id})
    return res.status(200).json({success:true})
}

const deleteStudent =async (req,res,next) =>{
    // const studentsLength = await Student.find()
    console.log(req.body.id)
    const buss = await Student.deleteOne({_id:req.body.id})
    return res.status(200).json({success:true})
}

const deleteDriver =async (req,res,next) =>{
    // const studentsLength = await Student.find()
    console.log(req.body.id)
    const buss = await Driver1.deleteOne({_id:req.body.id})
    return res.status(200).json({success:true})
}

const updateBusData =async (req,res,next) =>{

    console.log("update dash data",req.body.busStartTime,req.body.busEndTime)
    const _id = req.body.id
    const {busNumber,startingAddress,endingAddress,startTime,endTime} = req.body;
console.log(req.body)
    // const studentsLength = await Student.find()
    try{
        const bus = await Bus.updateOne({_id},{
            $set:{
                busNumber:busNumber,
                startingAddress:startingAddress,
                endingAddress:endingAddress,
                startingTime: startTime,
                endingTime:endTime
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
    const {id,bussNo,email,name} = req.body;

    // const studentsLength = await Student.find()
    try{
        const bus = await Driver1.updateOne({_id:id},{
            $set:{
                bussNo:bussNo,
                email:email,
                name:name
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
    const {id,isfee,nic} = req.body
    console.log(req.body)

    // const studentsLength = await Student.find()
    try{
        const student = await Student.updateOne({_id : id},{
            $set:{
                isfee:isfee,
                nic:nic
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
    updateStudentData,
    deleteBus,
    deleteStudent,
    deleteDriver
}