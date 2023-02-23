const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentLikeSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }
}, {timestamps: true}, { collection: "commentlikes" })

module.exports = mongoose.model("CommentLike", commentLikeSchema)