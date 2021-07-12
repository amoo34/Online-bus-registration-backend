const joi= require("@hapi/joi");

const authSchema= joi.object({
    name:joi.string(),
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(2).required()
})

module.exports={authSchema}