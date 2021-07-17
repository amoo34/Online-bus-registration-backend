const Bus=require("../model/bus.model");
const Parent=require("../model/parent.model");
const Student=require("../model/student.modal");
const Driver1 = require("../model/driver1.model");
const Admin = require("../model/admin.model");
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const sendgridTransport = require('nodemailer-sendgrid-transport')

var transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}))

async function resetDriverPass(req,res,next){
    console.log("reset pass",req.body.userEmail)

    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString('hex')
        Driver1.find({email:req.body.userEmail})
        .then(user=>{
            if(!user){
                res.status(404).send("No User Found")
            }
            console.log(user)
            // user.resetToken = token;
            // user.resetTokenExpiration = Date.now() + 3600000
            return Driver1.updateOne({email:req.body.userEmail},{$set:{
                resetToken: token,
                resetTokenExpiration: Date.now() + 3600000
            }})
             
        })
        .then(result=>{
            const mailOptions = {
                from: 'moizfiverr123@gmail.com', // sender address
                to: req.body.userEmail, // list of receivers
                subject: 'Password Reset', // Subject line
                html: `<p>You request a password reset</p>
                        <p>Click this link</p>
                        <a href="http://localhost:3000/reset/driver/${token}">Link</a>
                `
                // plain text body
              };
           //    console.log(transporter)
              transporter.sendMail(mailOptions, function (err, info) {
                 if(err){
                   console.log(err)
                   res.status(400).send(err)
               }
                 else{
                   console.log(info);
                   res.status(200).send(info)
                 }
              });
        })
    })
}

const postNewDriverPassword =async (req, res, next) => {
    const newPassword = req.body.password;
    // const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    console.log(passwordToken)
    Driver1.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
    //   _id: userId
    })
      .then(user => {
        resetUser = user;
        
        // return bcrypt.hash(newPassword, 12);
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(newPassword, salt, async function(err, hash) {
                hashedPass=hash
                console.log(newPassword)
                console.log(hash)
                const data = await Driver1.updateOne({ 
                    resetToken: passwordToken
                 },{$set:{
                    password: hashedPass,
                    resetToken :undefined,
                    resetTokenExpiration : undefined
                }})
                console.log(data)
                
                // .catch((err)=>res.status(501).send(err));
            });
        });
        return res.status(200).send("Password updated")
      })
      .catch(err=>{
          console.log(err)
      })
  };

  async function resetStudentPass(req,res,next){
    console.log("reset pass",req.body.userEmail)

    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString('hex')
        Student.find({email:req.body.userEmail})
        .then(user=>{
            if(!user){
                res.status(404).send("No User Found")
            }
            console.log(user)
            // user.resetToken = token;
            // user.resetTokenExpiration = Date.now() + 3600000
            return Student.updateOne({email:req.body.userEmail},{$set:{
                resetToken: token,
                resetTokenExpiration: Date.now() + 3600000
            }})
             
        })
        .then(result=>{
            const mailOptions = {
                from: 'moizfiverr123@gmail.com', // sender address
                to: req.body.userEmail, // list of receivers
                subject: 'Password Reset', // Subject line
                html: `<p>You request a password reset</p>
                        <p>Click this link</p>
                        <a href="http://localhost:3000/reset/driver/${token}">Link</a>
                `
                // plain text body
              };
           //    console.log(transporter)
              transporter.sendMail(mailOptions, function (err, info) {
                 if(err){
                   console.log(err)
                   res.status(400).send(err)
               }
                 else{
                   console.log(info);
                   res.status(200).send(info)
                 }
              });
        })
    })
}

const postNewStudentPassword =async (req, res, next) => {
    const newPassword = req.body.password;
    // const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    console.log(passwordToken)
    Student.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
    //   _id: userId
    })
      .then(user => {
        resetUser = user;
        
        // return bcrypt.hash(newPassword, 12);
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(newPassword, salt, async function(err, hash) {
                hashedPass=hash
                console.log(newPassword)
                console.log(hash)
                const data = await Student.updateOne({ 
                    resetToken: passwordToken
                 },{$set:{
                    password: hashedPass,
                    resetToken :undefined,
                    resetTokenExpiration : undefined
                }})
                console.log(data)
                
                // .catch((err)=>res.status(501).send(err));
            });
        });
        return res.status(200).send("Password updated")
      })
      .catch(err=>{
          console.log(err)
      })
  };

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
                        res.status(400).json({message:"Fee is not paid.Contact Admin"})

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
                    // if(usr.isfee=="yes"){

                        res.status(200).json({user:usr,idtoken:accessToken,message:"Log in successfull"})
                    // }else{
                    //     res.status(400).json({message:"fee is not"})

                    }
                else{
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


async function  AdminSignUp(req,res,next){
    console.log(req.body)
    try{

        const {name,email,password}=req.body;

        if(!name || !email || !password) {
            res.status(400).json({message:"bad request"});
        }

        const doesExist = await Admin.findOne({email});

        if(doesExist){res.status(409).json({message: `${email} already exist`})}

        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                hashedPass=hash
                const admin= new Admin({email,name,password:hash});
                admin.save().then((resp)=>
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

async function AdminLogin(req,res,next){

    const {email,password}=req.body;
    
    await Admin.findOne({email})
    .then((usr)=>{
        if(usr){
            bcrypt.compare(password, usr.password, function(err, result) {
                if(result){
                    let name=usr.email;
                    const accessToken = jwt.sign({ name }, 'energyToken');
                    // if(usr.isfee=="yes"){

                        res.status(200).json({user:usr,idtoken:accessToken,message:"Log in successfull"})
                    // }else{
                    //     res.status(400).json({message:"fee is not"})

                    }
                else{
                    res.status(401).json({message:'Password does not match'})
                }  
            })
        }else{
            res.status(501).json({message:'user account not exist'})
        }

    })
    .catch((err)=>res.status(400).json({message:'Database connection error occured'}))
    
    

}

module.exports={getBus,postNewStudentPassword,resetStudentPass,postNewDriverPassword,resetDriverPass,AdminLogin,deleteStudent,AdminSignUp,updatestudent,Busregister,Parentregister,Studentregister,Buslogin,Parentlogin,Studentlogin,getStudentByNic,Driver1SignUp,DriverLogin1}