const { gql } = require("apollo-server-express");

const CommentTypes = gql`
  scalar Date

  type Comment {
    id: ID
    content: String
    createdAt: Date
    user: User
    post: Post
    likes: [CommentLike]
    isReplyTo: Comment
    replies: [Comment]
  }

  input CommentInput {
    content: String
    post: String
    isReplyTo: String
  }

  type CommentLike{
    user: User
    post: Post
  }

`;

module.exports = CommentTypes;
