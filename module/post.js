const mongoose=require("mongoose")
const { Schema } = mongoose;

const postSchema = new Schema({
    postuser:{
type:String,
require:true,
    },
posturl:{
    type:String,

},
postcaption:{
    type:String,

},postlike:{
    type:Number,
    default:0,
},
likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}]
},
{ timestamps: true })

module.exports=mongoose.model("post",postSchema)
