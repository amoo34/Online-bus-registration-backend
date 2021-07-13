const mongooes = require("mongoose");
const Schema = mongooes.Schema

const startPosition=new Schema({
    lat:{
        type:String
    },
    lng:{
        type:String
    }
})

const endPosition=new Schema({
    lat:{
        type:String
    },
    lng:{
        type:String
    }
})

const BusSchema=new Schema({
    busNumber:{
        type: String
    },
    driverName:{
        type: String,
    },
    startingPoint:{
        type: startPosition
    },
    endingPoint:{
        type: endPosition
    },
    startingAddress:{
        type: String
    },
    endingAddress:{
        type:String
    },
    password:{
        type: String
    },
   startingTime:{
       type: String
   },
   endingTime:{
       type: String
   },
    Date:{
        type: Date,
        default: Date.now
    }
});



const bus=mongooes.model('bus',BusSchema);

module.exports=bus;