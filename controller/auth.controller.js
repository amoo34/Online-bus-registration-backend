const Bus=require("../model/bus.model");
const Parent=require("../model/parent.model");
const Student=require("../model/student.modal");
const Driver1 = require("../model/driver1.model");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



async function  Busregister(req,res,next){
    try{

        const {busNumber,driverName,startMarkerPosition,endMarkerPosition,password,startingAddress,endingAddress}=req.body;

        if(!busNumber || !password ) {
            res.status(400).json({message:"bad request"});
        }

        const doesExist = await Bus.findOne({busNumber:busNumber});

        if(doesExist){res.status(409).json({message: `${busNumber} already exist`})}

        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                hashedPass=hash
                
                
                const bus= new Bus({busNumber,startingAddress:startingAddress,endingAddress:endingAddress,driverName,startingPoint:startMarkerPosition,endingPoint:endMarkerPosition,password:hash});
                bus.save().then((resp)=>
                    res.status(200).json(resp)
                )
                .catch((err)=>res.status(501).send(err));
            });
        });


        
    }
    catch(error){
        res.status(400).json(error);
    }

}


async function  Parentregister(req,res,next){
    try{

        const {nic,name,password}=req.body;

        if(!nic || !name || !password) {
            res.status(400).json({message:"bad request"});
        }

        const doesExist = await Parent.findOne({nic});

        if(doesExist){res.status(409).json({message: `${nic} already exist`})}

        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                hashedPass=hash
                
                
                const parent= new Parent({nic,name,password:hash});
                parent.save().then((resp)=>
                    res.status(200).json(resp)
                )
                .catch((err)=>res.status(501).send(err));
            });
        });


        
    }
    catch(error){
        res.status(400).json(error);
    }

}


async function  Studentregister(req,res,next){
    try{

        const {regNumber,nic,isfee,password}=req.body;

        if(!regNumber || !password || !isfee) {
            res.status(400).json({message:"bad request"});
        }

        const doesExist = await Student.findOne({regNumber});

        if(doesExist){res.status(409).json({message: `${regNumber} already exist`})}

        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                hashedPass=hash
                
                
                const student= new Student({regNumber,nic,isfee,password:hash});
                student.save().then((resp)=>
                    res.status(200).json(resp)
                )
                .catch((err)=>res.status(501).send(err));
            });
        });


        
    }
    catch(error){
        res.status(400).json(error);
    }

}



async function Buslogin(req,res,next){

    const {busNumber,password}=req.body;
    
    await Bus.findOne({busNumber})

    .then((usr)=>{
        console.log(usr)
        if(usr){

            bcrypt.compare(password, usr.password, function(err, result) {
                if(result){
                    let name=usr.busNumber;
                    const accessToken = jwt.sign({ name }, 'busToken');
                    res.status(200).json({user:{usr},token:accessToken,message:"Log in successfull"})
                }else{
                    res.status(401).json({message:'Password does not match'})
                }  
            })
        }else{
            res.status(501).json({message:'bus  not exist'})
        }

    })
    .catch((err)=>res.status(400).json({message:'Database connection error occured'}))
    
    

}


async function Parentlogin(req,res,next){

    const {nic,password}=req.body;
    
    await Parent.findOne({nic})
    .then((usr)=>{
        if(usr){

            bcrypt.compare(password, usr.password, function(err, result) {
                if(result){
                    let name=usr.nic;
                    const accessToken = jwt.sign({ name }, 'BusToken');
                    res.status(200).json({user:{usr},token:accessToken,message:"Log in successfull"})
                }else{
                    res.status(401).json({message:'Password does not match'})
                }  
            })
        }else{
            res.status(501).json({message:'user account not exist'})
        }

    })
    .catch((err)=>res.status(400).json({message:'Database connection error occured'}))
    
    

}


async function Studentlogin(req,res,next){

    const {regNumber,password}=req.body;
    
    await Student.findOne({regNumber})
    .then((usr)=>{
        if(usr){

            bcrypt.compare(password, usr.password, function(err, result) {
                if(result){
                    let name=usr.regNumber;
                    const accessToken = jwt.sign({ name }, 'energyToken');
                    if(usr.isfee=="yes"){

                        res.status(200).json({user:{usr},token:accessToken,message:"Log in successfull"})
                    }else{
                        res.status(400).json({message:"fee is not"})

                    }
                }else{
                    res.status(401).json({message:'Password does not match'})
                }  
            })
        }else{
            res.status(501).json({message:'user account not exist'})
        }

    })
    .catch((err)=>res.status(400).json({message:'Database connection error occured'}))
    
    

}


async function getStudentByNic(req,res,next){

    const {nic}=req.params;
    
    await Student.find({nic})
    .then((usr)=>{
        if(usr){
            res.status(200).json(usr);
        }else{
            res.status(501).json({message:'no student exist'})
        }

    })
    .catch((err)=>res.status(400).json({message:'Database connection error occured'}))
    
}


async function updatestudent(req,res){
    const {id}=req.params;
    const {regNumber,isfee}=req.body;
    await Student.findOneAndUpdate({_id:id},req.body)
    .then((usr)=>{
        if(usr){
            res.status(200).json(usr);
        }else{
            res.status(501).json({message:'no student exist'})
        }

    })
    .catch((err)=>res.status(400).json({message:'Database connection error occured'}))
}

async function deleteStudent(req,res){
    const {id}=req.params;
    await Student.remove({_id:id})
    .then((usr)=>{
        if(usr){
            res.status(200).json(usr);
        }else{
            res.status(501).json({message:'can not delete'})
        }

    })
    .catch((err)=>res.status(400).json({message:'Database connection error occured'}))
}

async function getBus(req,res){

    await Bus.find()
    .then((usr)=>{
        if(usr){
            res.status(200).json(usr);
        }else{
            res.status(501).json({message:'can not delete'})
        }

    })
    .catch((err)=>res.status(400).json({message:'Database connection error occured'}))

}


async function  Driver1SignUp(req,res,next){
    console.log(req.body)
    try{

        const {name,email,password}=req.body;

        if(!name || !email || !password) {
            res.status(400).json({message:"bad request"});
        }

        const doesExist = await Driver1.findOne({email});

        if(doesExist){res.status(409).json({message: `${email} already exist`})}

        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                hashedPass=hash
                
                
                const student= new Driver1({email,name,password:hash});
                student.save().then((resp)=>
                    res.status(200).json(resp)
                )
                .catch((err)=>res.status(501).send(err));
            });
        });


        
    }
    catch(error){
        res.status(400).json(error);
    }

}

async function DriverLogin1(req,res,next){

    const {email,password}=req.body;
    
    await Driver1.findOne({email})
    .then((usr)=>{
        if(usr){
            if(usr.bussNo === null)
            {
                res.status(400).json({message:"Buss is not Assigned. Please Contact admin"})
            }
else{
    
            bcrypt.compare(password, usr.password, function(err, result) {
                if(result){
                    let name=usr.regNumber;
                    const accessToken = jwt.sign({ name }, 'energyToken');
                    if(usr.isfee=="yes"){

                        res.status(200).json({user:{usr},token:accessToken,message:"Log in successfull"})
                    }else{
                        res.status(400).json({message:"fee is not"})

                    }
                }else{
                    res.status(401).json({message:'Password does not match'})
                }  
            })
        }
        }else{
            res.status(501).json({message:'user account not exist'})
        }

    })
    .catch((err)=>res.status(400).json({message:'Database connection error occured'}))
    
    

}



module.exports={getBus,deleteStudent,updatestudent,Busregister,Parentregister,Studentregister,Buslogin,Parentlogin,Studentlogin,getStudentByNic,Driver1SignUp,DriverLogin1}