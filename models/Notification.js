const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    actor: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String
    },
    refExcerpt: {
        type: String
    },
    postUrl: {
        type: String
    },
    wasRead: {
        type: Boolean,
        default: false
    }
}, {timestamps: true}, { collection: "notifications" })

module.exports = mongoose.model("Notification", notificationSchema)