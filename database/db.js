require('dotenv').config()
const mongoose=require('mongoose')
console.log("this is called")


const connect =async ()=>{
try{
await mongoose.connect(process.env.MONGODB);
console.log("mongodb connected sucessfully ")
}
catch(error){
    console.log("error connecting database",error)
}
}

module.exports=connect