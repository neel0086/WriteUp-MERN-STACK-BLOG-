import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
    tagOptions:{
        type:String,
        required:true,
    },
    



})
const tag = mongoose.model('tag',tagSchema)
export default tag
