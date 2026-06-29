require('dotenv').config()
const mongoose=require('mongoose')

console.log("hello")

const connect=async () => {
    try{
        await mongoose.connect(process.env.MONGODB);
        console.log("mongodb connected sucessfully ")
    }

    catch(error){
console.log('unable to connect ddddd',error)
    }
}
module.exports=connect