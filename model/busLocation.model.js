const mongooes = require("mongoose");
const Schema = mongooes.Schema

const BusLocationSchema=new Schema({
    id:{
        type: String
    },
    startingPoint:{
        type: String,
    },
    destination:{
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



const buslocation=mongooes.model('buslocation',BusLocationSchema);

module.exports=buslocation;