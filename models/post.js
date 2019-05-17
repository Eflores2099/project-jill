const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    summary: String,
    imgUrl: {
        type:String,
        default:""
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: String.Types.ObjectId,
        ref: "Admin",
        required:true
    }
})

module.exports = mongoose.model("Post", postSchema)