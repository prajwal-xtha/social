const express=require('express')
const routes=express.Router()
const middleware1=require('../midleware/middleware')
const upload = require("../midleware/uplode");

const {home,register,feed,login,test,createpost,sug,profile}=require('../controller/controller')

//register and login
routes.get('/',middleware1,home)

//register
routes.post('/register',register)
//login
routes.post('/login',login)



//view all user
routes.put("/feed/:postclick",middleware1, feed);
routes.get('/test',middleware1,test)
//post 
routes.post('/post',middleware1,upload.single("image"),createpost)
//frend sugestion
routes.get("/sug",middleware1,sug)
routes.get("/profile",middleware1,profile)



module.exports=routes
