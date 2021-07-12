const mongooes = require("mongoose");
const Schema = mongooes.Schema

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
    bussNo:{
        type:String,
        default: null
    }
});



const driver=mongooes.model('driver',DriverSchema);
    
module.exports=driver;