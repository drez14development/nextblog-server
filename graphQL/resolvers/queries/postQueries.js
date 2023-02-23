const Post = require("../../../models/Post");

const getAllPostsQuery = async () => {
  return await Post.find().populate([
    { path: "user" },
    {
      path: "likes",
      populate: { path: "user" },
    },
  ]).sort({createdAt: -1});
};

const getPostByIdQuery = async ({id}) => {
  return await Post.findById(id);
};

const getPostBySlugQuery = async ({slug}) => {
  return await Post.findOne({slug: slug}).populate([
    { path: "user" },
    {
      path: "likes",
      populate: { path: "user" },
    },
  ]);
}

module.exports = { getAllPostsQuery, getPostByIdQuery, getPostBySlugQuery };
