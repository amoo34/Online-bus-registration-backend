const mongooes = require("mongoose");
const Schema = mongooes.Schema

const StudentSchema=new Schema({
    regNumber:{
        type: String
    },
    nic:{
        type: String
    },
    isfee:{
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



const student=mongooes.model('student',StudentSchema);
    
module.exports=student;