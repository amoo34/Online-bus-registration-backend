const BusLoc=require("../model/busLocation.model")
const StudentLoc=require("../model/studentLocation.model")


async function  BusLocationSave(req,res,next){
    try{
        const {id,lat,long,startingPoint,destination}=req.body;

        if(!id || !lat || !long) {
            res.status(400).json({message:"bad request"});
        }

        const bus= new BusLoc({id,lat,long,startingPoint,destination});
        bus.save().then((resp)=>
            res.status(200).json(resp)
        )
        .catch((err)=>res.status(501).send(err));

    }
    catch(err){
        res.status(400).send(err)
    }
}

async function  studentLocationSave(req,res,next){
    try{
        const {id,lat,long}=req.body;

        if(!id || !lat || !long) {
            res.status(400).json({message:"bad request"});
        }

        const student= new StudentLoc({id,lat,long});
        await student.save().then((resp)=>
            res.status(200).json(resp)
        )
        .catch((err)=>res.status(501).send(err));

    }
    catch(err){
        res.status(400).send(err)
    }
}


async function  getbuslocation(req,res,next){
    try{
        const {id,destination} =req.params
        console.log(id);
        await BusLoc.find({id,destination})
        .then((result)=>res.status(200).json(result[result.length-1]))
        .catch((err)=>res.status(400).json({message:`can not get location`,err}));

    }
    catch(err){
        res.status(400).send(err)
    }
}

async function  getstudentlocation(req,res,next){
   
    try{
            const {id}=req.params;
            await StudentLoc.find({id})
            .then((result)=>res.status(200).json(result[result.length-1]))
            .catch((err)=>res.status(400).json({message:`can not get location`,err}));
    
    
        }
        catch(err){
            res.status(400).send(err)
        }

}


module.exports={BusLocationSave,studentLocationSave,getbuslocation,getstudentlocation}