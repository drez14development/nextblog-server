const { authMiddleware: authM } = require("../../middleware/auth");
const { dateScalar } = require("./datetime");
const { GraphQLUpload } = require("graphql-upload");

//Post
const {
  getAllPostsQuery,
  getPostByIdQuery,
  getPostBySlugQuery,
} = require("./queries/postQueries");
const { createPostMutation } = require("./mutations/postMutations");

//User
const {
  signUpUserMutation,
  loginUserMutation,
  updateAvatarMutation,
} = require("./mutations/userMutations");

//Comment
const { createCommentMutation } = require("./mutations/commentMutations");
const { getCommentsQuery } = require("./queries/commentQueries");

//Like
const {
  commentLikeMutation,
  postLikeMutation,
} = require("./mutations/likeMutations");

//Notifications
const { getUserNotificationsQuery } = require("./queries/notificationQueries");
const { markNotificationsAsReadMutation, deleteNotificationsMutation } = require("./mutations/notifications/notificationMutations");

//Resolvers
const resolvers = {
  Date: dateScalar,
  Upload: GraphQLUpload,
  Query: {
    getAllPosts: () => getAllPostsQuery(),
    getPostById: (_, args, ctx) => authM(args, ctx, getPostByIdQuery),
    getPostBySlug: (_, args) => getPostBySlugQuery(args),
    getComments: (_, args) => getCommentsQuery(args),
    getUserNotifications: (_, args, ctx) => authM(args, ctx, getUserNotificationsQuery)
  },
  Mutation: {
    createPost: (_, args, ctx) => authM(args, ctx, createPostMutation),
    createComment: (_, args, ctx) => authM(args, ctx, createCommentMutation),
    signUpUser: (_, args) => signUpUserMutation(args),
    loginUser: (_, args) => loginUserMutation(args),
    updateAvatar: (_, args, ctx) => authM(args, ctx, updateAvatarMutation),
    postLike: (_, args, ctx) => authM(args, ctx, postLikeMutation),
    commentLike: (_, args, ctx) => authM(args, ctx, commentLikeMutation),
    markNotificationsAsRead: (_, args, ctx) => authM(args, ctx, markNotificationsAsReadMutation),
    deleteNotifications: (_, args, ctx) => authM(args, ctx, deleteNotificationsMutation),
  },
};

module.exports = resolvers;
