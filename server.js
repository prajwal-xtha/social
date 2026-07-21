require('dotenv').config()

const express = require('express')
const app = express()
const cors = require("cors");
const connect=require('./database/db')
const routes=require('./routes/router')

connect();

const PORT = process.env.PORT 

app.use(cors());
app.use(express.json())

app.use('/api',routes)

app.listen(PORT,()=>{
    console.log(`server is  ${PORT}`)
})
console.log("server after run")