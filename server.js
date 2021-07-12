const http = require('http')
const port = 3001;
const app = require('./app')


const server = http.createServer(app);

server.listen(port,(e)=>{
    console.log(`node server runing at port ${port}`)
})
