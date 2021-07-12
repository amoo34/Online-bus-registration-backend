const mongooes = require("mongoose");


// mongodb connectivity
// mongodb://10.122.0.4:27017/thinkiotadm:fpS3tGCZYxD2pm6v
mongooes.connect("mongodb+srv://user:user@cluster0.exumz.mongodb.net/drivers?retryWrites=true&w=majority",{
    // mongooes.connect("mongodb://10.122.0.4:27017/thinkiotadm:fpS3tGCZYxD2pm6v",{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex: true,
    autoIndex: true,
    // reconnectTries: 500, // Never stop trying to reconnect
    // reconnectInterval: 500, // Reconnect every 500ms
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000,
    writeConcern: {
        j: true
    }
})
.then((resp)=>console.log("database has been connected"))
.catch((err)=>console.log("Error while connecting with db",err))