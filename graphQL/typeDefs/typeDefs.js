const { gql } = require("apollo-server-express");

//Model Object Types
const PostTypes = require("./modelTypes/PostTypes");
const UserTypes = require("./modelTypes/UserTypes");
const CommentTypes = require("./modelTypes/CommentTypes");
const NotificationTypes = require("./modelTypes/NotificationTypes");

//Entry Point Object Types
const QueryType = gql`
  type Query {
    getAllPosts: [Post]
    getPostById(id: ID!): Post
    getPostBySlug(slug: String!): Post
    getComments(post_id: ID!): [Comment]
    getUserNotifications: [Notification]
  }
`;

const MutationType = gql`
  type Mutation {
    createPost(input: PostInput): Post
    createComment(input: CommentInput): Comment
    signUpUser(input: SignUpInput): AuthData
    loginUser(input: LoginInput): AuthData
    updateAvatar(file: Upload): User
    postLike(post_id: String): Post
    commentLike(comment_id: String): Comment
    markNotificationsAsRead: [Notification]
    deleteNotifications: [Notification]
  }
`;

//Export typeDefs to set schema on Apollo Server's instance
const typeDefs = [
  QueryType, 
  MutationType, 
  PostTypes,
  CommentTypes,
  UserTypes,
  NotificationTypes
];

module.exports = typeDefs;
