const Comment = require("../../../models/Comment");
const CommentLike = require("../../../models/CommentLike");
const { createNotification } = require("./notifications/notificationMutations");
const { LIKE_COMMENT, LIKE_POST } = require("./notifications/notificationActionInfo");

const Post = require("../../../models/Post");
const PostLike = require("../../../models/PostLike");

const commentLikeMutation = async (args) => {
  const { comment_id, user_id } = args;
  const isLiked = await CommentLike.findOne({
    user: user_id,
    comment: comment_id,
  });
  let targetComment;

  try {
    if (!isLiked) {
      //Create Like
      const like = await CommentLike.create({
        user: user_id,
        comment: comment_id,
      });
      targetComment = await Comment.findOneAndUpdate(
        { _id: comment_id },
        { $push: { likes: like }, $inc: { likesCount: 1 } },
        { new: true }
      );
      createNotification({
        action_info: LIKE_COMMENT,
        actor_id: user_id,
        refContent: targetComment.content, 
        receiver_id: targetComment.user,
        post_id: targetComment.post,
      });
    } else {
      //Delete like
      const like = await CommentLike.findOneAndDelete({ _id: isLiked._id });
      targetComment = await Comment.findOneAndUpdate(
        { _id: comment_id },
        {
          $pullAll: {
            likes: [{ _id: isLiked._id }],
          },
          $inc: { likesCount: -1 },
        },
        { new: true }
      );
    }

    return targetComment.populate([
      { path: "user" },
      {
        path: "likes",
        populate: { path: "user" },
      },
    ]);
  } catch (error) {
    throw Error(error.message)
  }
};

const postLikeMutation = async (args) => {
  const { post_id, user_id } = args;
  const isLiked = await PostLike.findOne({ user: user_id, post: post_id });
  let targetPost;

  try {
    if (!isLiked) {
      //Create Like
      const like = await PostLike.create({ user: user_id, post: post_id });
      targetPost = await Post.findOneAndUpdate(
        { _id: post_id },
        { $push: { likes: like } },
        { new: true }
      );
      createNotification({
        action_info: LIKE_POST,
        actor_id: user_id,
        refContent: targetPost.title,
        receiver_id: targetPost.user,
        post_id: targetPost.id,
      });
    } else {
      //Delete like
      const like = await PostLike.findOneAndDelete({ _id: isLiked._id });
      targetPost = await Post.findOneAndUpdate(
        { _id: post_id },
        {
          $pullAll: {
            likes: [{ _id: isLiked._id }],
          },
        },
        { new: true }
      );
    }

    return targetPost.populate([
      { path: "user" },
      {
        path: "likes",
        populate: { path: "user" },
      },
    ]);
  } catch (error) {
    throw Error(error.message)
  }
};

module.exports = { commentLikeMutation, postLikeMutation };
