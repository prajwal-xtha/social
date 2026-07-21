const express=require('express')
const routes=express.Router()
const middleware1=require('../midleware/middleware')

const {home,register,feed,login,test,createpost}=require('../controller/controller')

//register and login
routes.get('/',middleware1,home)

//register
routes.post('/register',register)
//login
routes.post('/login',login)



//view all user
routes.put("/feed/:postclick", feed);
routes.get('/test',middleware1,test)
//post 
routes.post('/post',middleware1,createpost)


module.exports=routes
