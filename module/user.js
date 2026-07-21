const mongoose=require("mongoose")
const { Schema } = mongoose;

const blogSchema = new Schema({
    username:{
    type:String,
    required:true,
    unique:true
},
email:{
    type:String,
    trim:true,
    unique:true
},
password:{
    type:String,
    required:true
},
userprofile:{
    type:String,
    default:'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='

}

,
role:{
    type:String,
    enum:['user','admin'],
    default: 'user',
    required:false
}
},
{ timestamps: true })

module.exports=mongoose.model("user",blogSchema)