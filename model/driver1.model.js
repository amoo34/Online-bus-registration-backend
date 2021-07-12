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
    }
});



const driver=mongooes.model('driver',DriverSchema);
    
module.exports=driver;