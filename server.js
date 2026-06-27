require('dotenv').config()
const express=require('express')
const cors = require("cors");
// const welcome=require('./routes/welcome')
const app=express()
const PORT = process.env.PORT || 3000
const connectdb=require('./database/db')
const routes=require('./routes/routes')

app.use(cors());
app.use(express.json())
app.use('/api',routes);
connectdb();
app.listen(PORT,()=>{
    console.log(`server is live at ${PORT}`)
})