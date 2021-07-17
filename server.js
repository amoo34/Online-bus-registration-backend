const http = require('http')
const port = 3001;
const app = require('./app')
const server = http.createServer(app);
const Driver = require('./model/driver1.model')
// const { Server } = require("socket.io");
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
// const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected',socket.id,socket.userId);
    io.use(async (socket, next) => {
        try {
          //we get user mongodb id on socket handshake
          const id = socket.handshake.query.id;
          console.log("connected user === ", id)
         
  
          next();
        } catch (err) { }
      });

      socket.on("updatedLocation",async(data)=>{
          console.log(data)
          const d = await Driver.updateOne({ id : data?._id },{ $set: { currentLocation : {lat:data?.lat,long:data?.long} } })
          console.log(d)
        })

    // socket.emit('connection', null);
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

  var cors = require('cors')

server.use(cors())

server.listen(port,(e)=>{
    console.log(`node server runing at port ${port}`)
})
