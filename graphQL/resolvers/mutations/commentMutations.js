const Comment = require("../../../models/Comment");
const Post = require("../../../models/Post");
const { REPLY_TO_COMMENT, COMMENT_POST } = require("./notifications/notificationActionInfo");
const { createNotification } = require("./notifications/notificationMutations");

//Create Comment
const createCommentMutation = async (args, ctx) => {
  const { content, post, isReplyTo } = args.input;
  const user_id = args.user_id;
  const postObj = await Post.findById(post);

  const newComment = await Comment.create({
    content,
    user: user_id,
    post: post,
    isReplyTo: isReplyTo,
  });

  const refComment = await Comment.findById(isReplyTo);
  if (refComment) {
    await Comment.updateOne(
      { _id: isReplyTo },
      { $push: { replies: newComment } }
    );

    createNotification({
      action_info: REPLY_TO_COMMENT,
      actor_id: user_id,
      refContent: newComment.content, 
      receiver_id: refComment.user,
      post_id: newComment.post,
    });
  }else{
    createNotification({
      action_info: COMMENT_POST,
      actor_id: user_id,
      refContent: newComment.content, 
      receiver_id: postObj.user,
      post_id: newComment.post,
    });
  }



  return newComment;
};

module.exports = { createCommentMutation };
