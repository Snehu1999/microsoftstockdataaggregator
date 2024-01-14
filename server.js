const express = require("express")
const cors = require("cors")
require('dotenv').config()
const connectDB = require("./dbconnection/dbConnection")
const synckStock=require('./routes/stock')
connectDB();

const app = express()
// app.use(cors())
// app.use(json())

const server = app.listen(4000, ()=>{
    console.log("server is running on port 4000.");
})
app.use(express.json())
app.use("/api/stocklist",synckStock)
