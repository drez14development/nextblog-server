const Comment = require("../../../models/Comment");

const getCommentsQuery = async ({ post_id }) => {
  return await Comment.find({ post: post_id, isReplyTo: null })
    .populate([
      { path: "user" },
      { path: "post" },
      { path: "isReplyTo" },
      {
        path: "likes",
        populate: { path: "user" },
      },
      {
        path: "replies",
        options: { sort: { 'createdAt': -1 } },
        populate: [
          { path: "user" },
          { path: "likes", populate: "user" },
          { path: "isReplyTo" },
        ],
      },
    ])
    .sort({ createdAt: -1 });
};

module.exports = { getCommentsQuery };
