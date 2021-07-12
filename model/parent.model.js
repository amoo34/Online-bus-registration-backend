const mongooes = require("mongoose");
const Schema = mongooes.Schema

const ParentSchema=new Schema({
    nic:{
        type: String
    },
    name:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password:{
        type: String
    },
   
    Date:{
        type: Date,
        default: Date.now
    }
});



const parent=mongooes.model('parent',ParentSchema);

module.exports=parent;