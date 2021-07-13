const mongooes = require("mongoose");
const Schema = mongooes.Schema


const AdminSchema=new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
});



const admin=mongooes.model('admin',AdminSchema);
    
module.exports=admin;