const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "PostLike"
    }]
}, {timestamps: true})

module.exports = model('Post', PostSchema);