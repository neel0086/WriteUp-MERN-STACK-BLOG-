import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    writeup:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
        required:false,
    },
    author:{
        type:String,
        required:true,
    },
    catgories:{
        type:String,
        required:false,
    },
    like:{
        type:Number,
        required:false
    },
    userLike:{
        type:[{type:String,ref:"user"}],
        postedBy:{
            type:String,
            ref:"user"
        }
    },
    createdDate:{
        type:Date
    },



})
const post = mongoose.model('blog',postSchema)
export default post
