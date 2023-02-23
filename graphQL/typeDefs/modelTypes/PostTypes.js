const { gql } = require("apollo-server-express");

const PostTypes = gql`
  scalar Date

  type Post {
    id: ID
    slug: String
    title: String
    content: String
    imgUrl: String
    createdAt: Date
    user: User
    likes: [PostLike]
  }

  input PostInput {
    title: String
    content: String
    imgFile: Upload
  }

  type PostLike{
    user: User
    post: Post
  }

`;

module.exports = PostTypes;
