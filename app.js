const express = require('express');
const app = express();
// db connection
require("./db/db.config");

const cors = require('cors');

// import all the required routes

const auth=require("./Routes/auth.routes");
const dashboard = require("./Routes/dashtics.routes.js")


// parser the upcoming request
app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }))


// all routes

// app.get("/",(req,res)=>{
//     res.send("Welcome to energy monitring")
// })

app.use("/api",auth);
app.use("/dashtics",dashboard)



module.exports=app;