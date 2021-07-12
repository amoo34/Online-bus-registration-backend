const mongooes = require("mongoose");
const Schema = mongooes.Schema

const StudentLocationSchema=new Schema({
    id:{
        type: String
    },
    lat:{
        type: String,
    },
    long:{
        type: String
    },
   
    Date:{
        type: Date,
        default: Date.now
    }
});



const studentlocation=mongooes.model('studentlocation',StudentLocationSchema);

module.exports=studentlocation;