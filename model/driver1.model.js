const mongooes = require("mongoose");
const Schema = mongooes.Schema

const currentLocationSchema = new mongooes.Schema({
    lat:{
        type:String
    },
    long:{
        type:String
    }
})

const DriverSchema=new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },   
    Date:{
        type: Date,
        default: Date.now
    },
    resetToken:String,
    resetTokenExpiration:Date,
    bussNo:{
        type:String,
        default: null
    },
    isLive:{
        type:Boolean
    },
    currentLocation:{
        type: currentLocationSchema
    }
});



const driver=mongooes.model('driver',DriverSchema);
    
module.exports=driver;