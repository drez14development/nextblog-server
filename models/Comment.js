const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    likes:[{
      type: mongoose.Types.ObjectId,
      ref: "CommentLike"
    }],
    likesCount:{
      type: Number,
      default: 0
    },
    isReplyTo:{
      type: mongoose.Types.ObjectId,
      ref: "Comment"
    },
    replies: [{
      type: mongoose.Types.ObjectId,
      ref: "Comment"
    }]
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
