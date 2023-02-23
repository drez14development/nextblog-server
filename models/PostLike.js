const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postLikeSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }
}, {timestamps: true}, { collection: "postlikes" })

module.exports = mongoose.model("PostLike", postLikeSchema)